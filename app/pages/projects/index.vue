<template>
  <main class="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
    <header class="mb-10 space-y-3">
      <h1
        class="text-3xl font-semibold tracking-tight text-[color:var(--text)] sm:text-4xl"
      >
        Проекты / Блог
      </h1>
      <p class="max-w-2xl text-base leading-relaxed text-[color:var(--muted)]">
        Заметки о проектах, решениях и экспериментах.
      </p>
    </header>

    <section aria-label="Список записей" class="space-y-4">
      <div
        v-if="pending"
        class="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6"
      >
        <p class="text-[color:var(--muted)]">Загрузка…</p>
      </div>

      <div
        v-else-if="error"
        class="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6"
      >
        <p class="text-[color:var(--muted)]">
          Не удалось загрузить список записей.
        </p>
        <p class="mt-2 text-xs text-[color:var(--muted)]">
          {{ String(error) }}
        </p>
      </div>

      <div
        v-else-if="!list || list.length === 0"
        class="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6"
      >
        <p class="text-[color:var(--muted)]">Пока нет записей.</p>
      </div>

      <ul v-else class="grid gap-4 sm:grid-cols-2">
        <li
          v-for="item in list"
          :key="item.path"
          class="group rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[color:color-mix(in oklab, var(--border), var(--text) 10%)] focus-within:border-[color:color-mix(in oklab, var(--border), var(--text) 15%)]"
        >
          <NuxtLink
            :to="item.path"
            class="block outline-none"
            :aria-label="`Открыть: ${item.title || 'Запись'}`"
          >
            <div class="flex items-start justify-between gap-4">
              <h2
                class="text-lg font-semibold leading-snug text-[color:var(--text)] transition-colors group-hover:text-[color:var(--accent)]"
              >
                {{ item.title || "Без названия" }}
              </h2>

              <span
                v-if="item.date"
                class="shrink-0 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs text-[color:var(--muted)]"
              >
                {{ formatDate(item.date) }}
              </span>
            </div>

            <p
              v-if="item.description"
              class="mt-3 text-sm leading-relaxed text-[color:var(--muted)]"
            >
              {{ item.description }}
            </p>

            <div
              v-if="Array.isArray(item.tags) && item.tags.length"
              class="mt-4 flex flex-wrap gap-2"
            >
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs text-[color:var(--muted)]"
              >
                {{ tag }}
              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: "Проекты / Блог",
  meta: [
    {
      name: "description",
      content:
        "Список записей о проектах и заметок в формате Markdown (Nuxt Content).",
    },
  ],
});

type ProjectListItem = {
  path: string;
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  draft?: boolean;
};

function toDateValue(input: unknown): string | undefined {
  if (typeof input === "string" && input.trim()) return input;
  if (input instanceof Date) return input.toISOString();
  return undefined;
}

function toTagsValue(input: unknown): string[] | undefined {
  if (!Array.isArray(input)) return undefined;
  const tags = input.map((t) => String(t).trim()).filter(Boolean);
  return tags.length ? tags : undefined;
}

function isDraftValue(input: unknown): boolean {
  return input === true;
}

function formatDate(input: string) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

const {
  data: list,
  pending,
  error,
} = await useAsyncData<ProjectListItem[]>("projects:list", async () => {
  const items = await queryCollection("projects")
    .select("path", "title", "description", "date", "tags", "draft")
    .all();

  const normalized = (items as unknown as Array<Record<string, unknown>>)
    .map((item) => {
      const path = String(item.path ?? "").trim();

      return {
        path,
        title: typeof item.title === "string" ? item.title : undefined,
        description:
          typeof item.description === "string" ? item.description : undefined,
        date: toDateValue(item.date),
        tags: toTagsValue(item.tags),
        draft: typeof item.draft === "boolean" ? item.draft : undefined,
      } satisfies ProjectListItem;
    })
    .filter((item) => item.path && !isDraftValue(item.draft));

  normalized.sort((a, b) => {
    const ad = a.date ?? "";
    const bd = b.date ?? "";
    return bd.localeCompare(ad);
  });

  return normalized;
});
</script>
