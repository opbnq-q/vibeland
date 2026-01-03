<template>
    <main class="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <ContentDoc v-slot="{ doc }">
            <article v-if="doc" class="space-y-8">
                <header class="space-y-3">
                    <nav class="text-sm text-[color:var(--muted)]">
                        <NuxtLink
                            to="/projects"
                            class="rounded-md outline-none transition-colors hover:text-[color:var(--text)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                        >
                            ← Назад к списку
                        </NuxtLink>
                    </nav>

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
        </ContentDoc>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();

const pageTitle = computed(() => {
    const slug = Array.isArray(route.params.slug)
        ? route.params.slug.join("/")
        : String(route.params.slug || "");
    return slug ? `Проект: ${slug}` : "Проект";
});

useHead(() => ({
    title: pageTitle.value,
    meta: [
        {
            name: "description",
            content: "Детальная страница записи из Nuxt Content.",
        },
    ],
}));

function formatDate(input: unknown) {
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
