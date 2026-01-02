<template>
    <section id="contact" class="relative">
        <div
            class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18"
        >
            <div class="grid gap-10 lg:grid-cols-12 lg:items-start">
                <div class="lg:col-span-6">
                    <p
                        class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs sm:text-sm text-[color:var(--muted)]"
                    >
                        <span
                            class="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                            aria-hidden="true"
                        />
                        Контакты
                    </p>

                    <h2
                        class="mt-5 text-balance text-2xl font-semibold tracking-tight text-[color:var(--text)] sm:text-3xl"
                    >
                        Давай обсудим задачу
                    </h2>

                    <p
                        class="mt-4 max-w-xl text-pretty text-base text-[color:var(--muted)] sm:text-lg"
                    >
                        Напиши пару строк о проекте — я отвечу и предложу
                        следующий шаг. Можно без деталей: достаточно цели и
                        сроков.
                    </p>

                    <div class="mt-7 grid gap-3">
                        <a
                            :href="links.telegram.href"
                            target="_blank"
                            rel="noreferrer"
                            class="group flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
                        >
                            <div class="flex items-center gap-3">
                                <span
                                    class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] text-sm font-semibold text-[color:var(--text)]"
                                    aria-hidden="true"
                                >
                                    TG
                                </span>
                                <div>
                                    <p
                                        class="text-sm font-medium text-[color:var(--text)]"
                                    >
                                        {{ links.telegram.label }}
                                    </p>
                                    <p
                                        class="mt-0.5 text-sm text-[color:var(--muted)]"
                                    >
                                        {{ links.telegram.value }}
                                    </p>
                                </div>
                            </div>
                            <span
                                class="text-sm text-[color:var(--muted)] transition group-hover:text-[color:var(--text)]"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </a>

                        <a
                            :href="links.email.href"
                            class="group flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
                        >
                            <div class="flex items-center gap-3">
                                <span
                                    class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] text-sm font-semibold text-[color:var(--text)]"
                                    aria-hidden="true"
                                >
                                    @
                                </span>
                                <div>
                                    <p
                                        class="text-sm font-medium text-[color:var(--text)]"
                                    >
                                        {{ links.email.label }}
                                    </p>
                                    <p
                                        class="mt-0.5 text-sm text-[color:var(--muted)]"
                                    >
                                        {{ links.email.value }}
                                    </p>
                                </div>
                            </div>
                            <span
                                class="text-sm text-[color:var(--muted)] transition group-hover:text-[color:var(--text)]"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </a>

                        <a
                            :href="links.github.href"
                            target="_blank"
                            rel="noreferrer"
                            class="group flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
                        >
                            <div class="flex items-center gap-3">
                                <span
                                    class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] text-sm font-semibold text-[color:var(--text)]"
                                    aria-hidden="true"
                                >
                                    GH
                                </span>
                                <div>
                                    <p
                                        class="text-sm font-medium text-[color:var(--text)]"
                                    >
                                        {{ links.github.label }}
                                    </p>
                                    <p
                                        class="mt-0.5 text-sm text-[color:var(--muted)]"
                                    >
                                        {{ links.github.value }}
                                    </p>
                                </div>
                            </div>
                            <span
                                class="text-sm text-[color:var(--muted)] transition group-hover:text-[color:var(--text)]"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </a>
                    </div>
                </div>

                <div class="lg:col-span-6">
                    <div
                        class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-7"
                    >
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <p
                                    class="text-sm font-medium text-[color:var(--text)]"
                                >
                                    Форма
                                </p>
                                <p
                                    class="mt-1 text-sm text-[color:var(--muted)]"
                                >
                                    Быстрый черновик — отправится как email.
                                </p>
                            </div>
                            <span
                                class="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-1 text-xs text-[color:var(--muted)]"
                            >
                                1–2 минуты
                            </span>
                        </div>

                        <form
                            class="mt-6 grid gap-4"
                            @submit.prevent="onSubmit"
                        >
                            <label class="grid gap-2">
                                <span class="text-sm text-[color:var(--muted)]"
                                    >Имя</span
                                >
                                <input
                                    v-model.trim="form.name"
                                    type="text"
                                    autocomplete="name"
                                    class="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/30"
                                    placeholder="Как к вам обращаться"
                                />
                            </label>

                            <label class="grid gap-2">
                                <span class="text-sm text-[color:var(--muted)]"
                                    >Контакт</span
                                >
                                <input
                                    v-model.trim="form.contact"
                                    type="text"
                                    autocomplete="email"
                                    class="h-11 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/30"
                                    placeholder="Email / Telegram / любой способ"
                                />
                            </label>

                            <label class="grid gap-2">
                                <span class="text-sm text-[color:var(--muted)]"
                                    >Сообщение</span
                                >
                                <textarea
                                    v-model.trim="form.message"
                                    rows="5"
                                    class="min-h-28 resize-y rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/30"
                                    placeholder="Пара строк о задаче, сроках и формате"
                                />
                            </label>

                            <div
                                class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <p class="text-xs text-[color:var(--muted)]">
                                    Нажимая «Отправить», вы откроете письмо в
                                    почтовом клиенте.
                                </p>

                                <div class="flex items-center gap-2">
                                    <button
                                        type="button"
                                        class="inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-2.5 text-sm font-medium text-[color:var(--text)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[color:var(--surface)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
                                        @click="reset"
                                    >
                                        Очистить
                                    </button>

                                    <button
                                        type="submit"
                                        class="inline-flex items-center justify-center rounded-xl bg-[color:var(--accent)] px-4 py-2.5 text-sm font-medium text-[color:var(--accent-foreground)] shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
                                    >
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div
                        class="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-5"
                    >
                        <p
                            class="text-xs uppercase tracking-wide text-[color:var(--muted)]"
                        >
                            Что написать
                        </p>
                        <ul
                            class="mt-3 grid gap-2 text-sm text-[color:var(--muted)]"
                        >
                            <li
                                class="grid grid-cols-[10px_1fr] items-start gap-3"
                            >
                                <span
                                    class="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                                />
                                <span
                                    >что вы хотите получить в итоге (цель)</span
                                >
                            </li>
                            <li
                                class="grid grid-cols-[10px_1fr] items-start gap-3"
                            >
                                <span
                                    class="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                                />
                                <span
                                    >когда нужно (дедлайн или «без
                                    спешки»)</span
                                >
                            </li>
                            <li
                                class="grid grid-cols-[10px_1fr] items-start gap-3"
                            >
                                <span
                                    class="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                                />
                                <span
                                    >что уже есть: дизайн, API, репозиторий,
                                    ТЗ</span
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
type ContactLink = { label: string; value: string; href: string };

const links = {
    telegram: {
        label: "Telegram",
        value: "@kuzgoga",
        href: "https://t.me/kuzgoga",
    },
    email: {
        label: "Email",
        value: "derbenev_gi@gkl-kemerovo.ru",
        href: "mailto:georgiy@example.com",
    },
    github: {
        label: "GitHub",
        value: "github.com/kuzgoga",
        href: "https://github.com/kuzgoga",
    },
} satisfies Record<string, ContactLink>;

const form = reactive({
    name: "",
    contact: "",
    message: "",
});

function reset() {
    form.name = "";
    form.contact = "";
    form.message = "";
}

function onSubmit() {
    const subjectParts = ["Сообщение с сайта"];
    if (form.name) subjectParts.push(`от ${form.name}`);

    const subject = subjectParts.join(" ");
    const bodyLines = [
        form.message || "",
        "",
        form.name ? `Имя: ${form.name}` : "",
        form.contact ? `Контакт: ${form.contact}` : "",
    ].filter(Boolean);

    const url = `mailto:${encodeURIComponent("georgiy@example.com")}?subject=${encodeURIComponent(
        subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = url;
}
</script>
