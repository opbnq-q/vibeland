<template>
    <main class="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <header class="mb-10 space-y-3">
            <h1
                class="text-3xl font-semibold tracking-tight text-[color:var(--text)] sm:text-4xl"
            >
                Проекты / Блог
            </h1>
            <p
                class="max-w-2xl text-base leading-relaxed text-[color:var(--muted)]"
            >
                Заметки о проектах, решениях и экспериментах. Всё хранится в
                Markdown в <code>content/</code>.
            </p>
        </header>

        <section aria-label="Список записей" class="space-y-4">
            <ContentList path="/projects" :query="query" v-slot="{ list }">
                <div
                    v-if="!list || list.length === 0"
                    class="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6"
                >
                    <p class="text-[color:var(--muted)]">
                        Пока нет записей. Добавь файлы в
                        <code>content/projects</code>.
                    </p>
                </div>

                <ul v-else class="grid gap-4 sm:grid-cols-2">
                    <li
                        v-for="item in list"
                        :key="item._path"
                        class="group rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[color:color-mix(in oklab, var(--border), var(--text) 10%)] focus-within:border-[color:color-mix(in oklab, var(--border), var(--text) 15%)]"
                    >
                        <NuxtLink
                            :to="item._path"
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
                                v-if="
                                    Array.isArray(item.tags) && item.tags.length
                                "
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
            </ContentList>
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

const query = {
    where: [{ draft: { $ne: true } }],
    sort: [{ date: -1 as const }],
};

function formatDate(input: string) {
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return input;
    return d.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
}
</script>
