<template>
    <section id="about" class="relative">
        <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
            <div class="grid gap-10 lg:grid-cols-12 lg:items-start">
                <div class="lg:col-span-7">
                    <p
                        class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs sm:text-sm text-[color:var(--muted)]"
                    >
                        <span
                            class="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                            aria-hidden="true"
                        />
                        Обо мне
                    </p>

                    <h2
                        class="mt-5 text-balance text-2xl font-semibold tracking-tight text-[color:var(--text)] sm:text-3xl"
                    >
                        Делаю продукты, которые приятно поддерживать
                    </h2>

                    <p class="mt-4 max-w-2xl text-pretty text-base text-[color:var(--muted)] sm:text-lg">
                        Я fullstack‑разработчик из Кемерово. Люблю, когда интерфейс аккуратный,
                        код понятный, а API предсказуемое. Собираю проекты от идеи до продакшена:
                        продумываю структуру, режу на компоненты, автоматизирую рутину и оставляю
                        после себя чистую базу для развития.
                    </p>

                    <div class="mt-6 grid gap-3 sm:grid-cols-2">
                        <div
                            class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm"
                        >
                            <p class="text-sm font-medium text-[color:var(--text)]">Frontend</p>
                            <p class="mt-2 text-sm text-[color:var(--muted)]">
                                Nuxt, Tailwind, компоненты, доступность, микро‑интеракции.
                            </p>
                        </div>

                        <div
                            class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm"
                        >
                            <p class="text-sm font-medium text-[color:var(--text)]">Backend</p>
                            <p class="mt-2 text-sm text-[color:var(--muted)]">
                                NestJS, архитектура модулей, валидация, авторизация, интеграции.
                            </p>
                        </div>
                    </div>

                    <div class="mt-8">
                        <p class="text-xs uppercase tracking-wide text-[color:var(--muted)]">
                            Принципы
                        </p>
                        <ul class="mt-3 flex flex-wrap gap-2">
                            <li
                                v-for="item in principles"
                                :key="item"
                                class="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-1 text-xs sm:text-sm text-[color:var(--muted)]"
                            >
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="lg:col-span-5">
                    <div
                        class="relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
                    >
                        <div
                            class="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[color:var(--accent)]/15 blur-3xl"
                            aria-hidden="true"
                        />
                        <div
                            class="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[color:var(--accent)]/10 blur-3xl"
                            aria-hidden="true"
                        />

                        <div class="relative">
                            <div class="flex items-start justify-between gap-4">
                                <div>
                                    <p class="text-sm font-medium text-[color:var(--text)]">
                                        Георгий
                                    </p>
                                    <p class="mt-1 text-sm text-[color:var(--muted)]">
                                        Fullstack developer · TypeScript
                                    </p>
                                </div>

                                <div
                                    class="shrink-0 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-2"
                                >
                                    <p class="text-xs text-[color:var(--muted)]">Локация</p>
                                    <p class="text-sm font-medium text-[color:var(--text)]">
                                        Кемерово
                                    </p>
                                </div>
                            </div>

                            <div class="mt-6 grid gap-3">
                                <div
                                    class="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4"
                                >
                                    <p class="text-xs uppercase tracking-wide text-[color:var(--muted)]">
                                        Сейчас в фокусе
                                    </p>
                                    <p class="mt-2 text-sm text-[color:var(--text)]">
                                        One‑page портфолио, проекты на Nuxt, удобные админки и REST API.
                                    </p>
                                </div>

                                <div
                                    class="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4"
                                >
                                    <p class="text-xs uppercase tracking-wide text-[color:var(--muted)]">
                                        Люблю
                                    </p>
                                    <p class="mt-2 text-sm text-[color:var(--text)]">
                                        типизацию, понятные интерфейсы, аккуратную типографику и скорость.
                                    </p>
                                </div>
                            </div>

                            <div class="mt-6">
                                <p class="text-xs uppercase tracking-wide text-[color:var(--muted)]">
                                    Стек
                                </p>
                                <div class="mt-3 flex flex-wrap gap-2">
                                    <span
                                        v-for="tech in stack"
                                        :key="tech"
                                        class="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-1 text-xs sm:text-sm text-[color:var(--muted)]"
                                    >
                                        {{ tech }}
                                    </span>
                                </div>
                            </div>

                            <div class="mt-7 flex items-center gap-3">
                                <a
                                    href="#projects"
                                    class="inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-2.5 text-sm font-medium text-[color:var(--text)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[color:var(--surface)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
                                >
                                    Смотреть проекты
                                </a>

                                <a
                                    href="#contact"
                                    class="inline-flex items-center justify-center rounded-xl bg-[color:var(--accent)] px-4 py-2.5 text-sm font-medium text-[color:var(--accent-foreground)] shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
                                >
                                    Написать
                                </a>
                            </div>
                        </div>
                    </div>

                    <p class="mt-3 text-xs text-[color:var(--muted)]">
                        Фото можно добавить позже — сейчас блок сделан как карточка профиля.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const principles = ["KISS", "SOLID", "типизация", "предсказуемый DX", "прагматичность"] as const

const stack = ["TypeScript", "Nuxt", "Vue", "NestJS", "Tailwind", "PostgreSQL", "Docker"] as const
</script>
