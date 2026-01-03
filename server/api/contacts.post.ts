import { createHash, randomUUID } from "node:crypto";
import { mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import sqlite3 from "sqlite3";

type ContactPayload = {
  name?: unknown;
  contact?: unknown;
  message?: unknown;
  pageUrl?: unknown;
  userAgent?: unknown;
};

type ContactRow = {
  id: string;
  name: string | null;
  contact: string | null;
  message: string;
  page_url: string | null;
  user_agent: string | null;
  ip_hash: string | null;
  created_at: string;
};

function asString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const s = value.trim();
  return s.length ? s : null;
}

function clampString(value: string | null, max: number): string | null {
  if (!value) return null;
  return value.length > max ? value.slice(0, max) : value;
}

function nowIso(): string {
  return new Date().toISOString();
}

function getIp(event: any): string | null {
  const xff = event?.node?.req?.headers?.["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim().length) {
    const first = xff.split(",")[0]?.trim();
    return first || null;
  }

  const realIp = event?.node?.req?.headers?.["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim().length) return realIp.trim();

  const addr = event?.node?.req?.socket?.remoteAddress;
  return typeof addr === "string" && addr.trim().length ? addr.trim() : null;
}

function ipHash(ip: string | null): string | null {
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex");
}

async function ensureDir(path: string) {
  try {
    const s = await stat(path);
    if (!s.isDirectory()) throw new Error("Not a directory");
  } catch {
    await mkdir(path, { recursive: true });
  }
}

function getDbPath(): string {
  const base = process.cwd();
  return join(base, ".data", "vibeland.sqlite");
}

function dbErrorMessage(e: unknown): string {
  if (e && typeof e === "object") {
    const anyE = e as any;
    if (typeof anyE?.message === "string" && anyE.message.length)
      return anyE.message;
    if (typeof anyE?.code === "string" && anyE.code.length) return anyE.code;
  }
  try {
    return String(e);
  } catch {
    return "Unknown error";
  }
}

function openDb(file: string): sqlite3.Database {
  sqlite3.verbose();
  return new sqlite3.Database(file);
}

let dbSingleton: sqlite3.Database | null = null;
let dbReady: Promise<void> | null = null;

function run(db: sqlite3.Database, sql: string, params?: any): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(sql, params ?? [], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}

function exec(db: sqlite3.Database, sql: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function ensureDb(): Promise<sqlite3.Database> {
  if (dbSingleton && dbReady) {
    await dbReady;
    return dbSingleton;
  }

  const dbPath = getDbPath();
  await ensureDir(dirname(dbPath));

  const db = openDb(dbPath);
  dbSingleton = db;

  dbReady = (async () => {
    await run(db, "PRAGMA journal_mode = WAL;");
    await run(db, "PRAGMA foreign_keys = ON;");

    await exec(
      db,
      `
      CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY,
        name TEXT NULL,
        contact TEXT NULL,
        message TEXT NOT NULL,
        page_url TEXT NULL,
        user_agent TEXT NULL,
        ip_hash TEXT NULL,
        created_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_contacts_created_at
      ON contacts(created_at);

      CREATE INDEX IF NOT EXISTS idx_contacts_ip_hash
      ON contacts(ip_hash);
    `.trim(),
    );
  })();

  await dbReady;
  return db;
}

function validate(payload: ContactPayload) {
  const name = clampString(asString(payload.name), 120);
  const contact = clampString(asString(payload.contact), 180);
  const message = clampString(asString(payload.message), 4000);
  const pageUrl = clampString(asString(payload.pageUrl), 500);
  const userAgent = clampString(asString(payload.userAgent), 300);

  if (!message || message.length < 5) {
    return {
      ok: false as const,
      error: "Пожалуйста, напишите сообщение длиной не менее 5 символов.",
    };
  }

  if (name && name.length < 2) {
    return {
      ok: false as const,
      error:
        "Пожалуйста, укажите имя длиной не менее 2 символов или оставьте поле пустым.",
    };
  }

  if (contact && contact.length < 3) {
    return {
      ok: false as const,
      error:
        "Пожалуйста, укажите контакт длиной не менее 3 символов или оставьте поле пустым.",
    };
  }

  return {
    ok: true as const,
    value: { name, contact, message, pageUrl, userAgent },
  };
}

export default defineEventHandler(async (event) => {
  let payload: ContactPayload;

  try {
    payload = (await readBody(event)) as ContactPayload;
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid JSON" });
  }

  const result = validate(payload);
  if (!result.ok) {
    throw createError({ statusCode: 400, statusMessage: result.error });
  }

  const { name, contact, message, pageUrl, userAgent } = result.value;

  const ip = getIp(event);
  const row: ContactRow = {
    id:
      typeof randomUUID === "function"
        ? randomUUID()
        : `${Date.now()}-${Math.random()}`,
    name,
    contact,
    message,
    page_url: pageUrl,
    user_agent: userAgent,
    ip_hash: ipHash(ip),
    created_at: nowIso(),
  };

  const db = await ensureDb();

  const sql = `
    INSERT INTO contacts (
      id, name, contact, message, page_url, user_agent, ip_hash, created_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?
    )
  `.trim();

  try {
    await run(db, sql, [
      row.id,
      row.name,
      row.contact,
      row.message,
      row.page_url,
      row.user_agent,
      row.ip_hash,
      row.created_at,
    ]);
  } catch (e) {
    console.error("[contacts] sqlite insert failed", {
      message: dbErrorMessage(e),
      hasName: Boolean(row.name),
      hasContact: Boolean(row.contact),
      messageLen: row.message.length,
      createdAt: row.created_at,
    });

    throw createError({
      statusCode: 500,
      statusMessage: `Server Error: ${dbErrorMessage(e)}`,
    });
  }

  setResponseStatus(event, 201);
  return { ok: true, id: row.id, createdAt: row.created_at };
});
