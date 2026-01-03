<template>
  <main class="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
    <div
      v-if="pending"
      class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6"
    >
      <p class="text-sm text-[color:var(--muted)]">Загрузка…</p>
    </div>

    <div
      v-else-if="error"
      class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 text-[color:var(--muted)]"
    >
      <h1 class="mb-2 text-xl font-semibold text-[color:var(--text)]">
        Ошибка
      </h1>
      <p class="mb-4 text-sm leading-relaxed">Не удалось загрузить запись.</p>
      <p class="text-xs opacity-80">{{ String(error) }}</p>

      <div class="mt-4">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm text-[color:var(--text)] transition hover:border-[color:color-mix(in oklab, var(--border), var(--text) 10%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
        >
          Открыть список записей
        </NuxtLink>
      </div>
    </div>

    <article v-else-if="doc" class="space-y-8">
      <header class="space-y-3">
        <h1
          class="text-3xl font-semibold tracking-tight text-[color:var(--text)] sm:text-4xl"
        >
          {{ doc.title || "Запись" }}
        </h1>

        <p
          v-if="doc.description"
          class="text-base leading-relaxed text-[color:var(--muted)]"
        >
          {{ doc.description }}
        </p>

        <div class="flex flex-wrap gap-2 pt-1">
          <span
            v-if="doc.date"
            class="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs text-[color:var(--muted)]"
          >
            {{ formatDate(doc.date) }}
          </span>

          <span
            v-for="tag in normalizeTags(doc.tags)"
            :key="tag"
            class="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs text-[color:var(--muted)]"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <div
        class="prose prose-neutral max-w-none prose-headings:scroll-mt-24 prose-a:text-[color:var(--accent)] prose-a:no-underline hover:prose-a:underline dark:prose-invert"
      >
        <ContentRenderer :value="doc" />
      </div>

      <footer class="pt-6">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm text-[color:var(--text)] transition hover:-translate-y-0.5 hover:border-[color:color-mix(in oklab, var(--border), var(--text) 10%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
        >
          Вернуться к списку
        </NuxtLink>
      </footer>
    </article>

    <div
      v-else
      class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 text-[color:var(--muted)]"
    >
      <h1 class="mb-2 text-xl font-semibold text-[color:var(--text)]">
        Запись не найдена
      </h1>
      <p class="mb-4 text-sm leading-relaxed">
        Возможно, страница была удалена или путь указан неверно.
      </p>
      <NuxtLink
        to="/projects"
        class="inline-flex items-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm text-[color:var(--text)] transition hover:border-[color:color-mix(in oklab, var(--border), var(--text) 10%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
      >
        Открыть список записей
      </NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();

function getSlugPath(): string {
  const parts = route.params.slug;
  const slug = Array.isArray(parts) ? parts.join("/") : String(parts || "");
  // Content paths are absolute and start with `/projects/...`
  return slug ? `/projects/${slug}` : "/projects";
}

const path = computed(() => getSlugPath());

useHead(() => ({
  title: path.value.startsWith("/projects/")
    ? `Проект: ${path.value.replace("/projects/", "")}`
    : "Проект",
  meta: [
    {
      name: "description",
      content: "Детальная страница записи из Nuxt Content.",
    },
  ],
}));

type ProjectDoc = {
  path: string;
  title?: string;
  description?: string;
  date?: string | Date;
  tags?: unknown;
  body?: unknown;
};

const {
  data: doc,
  pending,
  error,
} = await useAsyncData<ProjectDoc | null>(
  () => `projects:doc:${path.value}`,
  async () => {
    // Fetch from Nuxt Content v3 `projects` collection (configured in `content.config.ts`)
    const items = await queryCollection("projects")
      .where("path", "=", path.value)
      .limit(1)
      .all();

    const first = (items as unknown as ProjectDoc[])[0];
    return first ?? null;
  },
  { watch: [path] },
);

function formatDate(input: unknown) {
  if (input instanceof Date) {
    return input.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }
  if (typeof input !== "string") return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function normalizeTags(input: unknown): string[] {
  if (Array.isArray(input)) return input.map(String).filter(Boolean);
  return [];
}
</script>
