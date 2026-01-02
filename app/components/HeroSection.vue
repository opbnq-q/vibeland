<template>
  <section id="home" class="relative">
    <div
      class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
    >
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-7">
          <p
            class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs sm:text-sm text-[color:var(--muted)]"
          >
            <span
              class="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
              aria-hidden="true"
            />
            Fullstack Developer · TypeScript · Nest · Nuxt
          </p>

          <h1
            class="mt-5 text-balance text-4xl font-semibold tracking-tight text-[color:var(--text)] sm:text-5xl lg:text-6xl"
          >
            Георгий — fullstack‑разработчик
          </h1>

          <p class="mt-5 max-w-2xl text-pretty text-base sm:text-lg text-[color:var(--muted)]">
            Кемерово, 18 лет. Пишу на TypeScript, делаю аккуратные интерфейсы и надежный
            backend. Люблю прагматичные решения, чистую архитектуру и скорость разработки.
          </p>

          <div class="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              class="inline-flex items-center justify-center rounded-xl bg-[color:var(--accent)] px-4 py-2.5 text-sm font-medium text-[color:var(--accent-foreground)] shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
            >
              Связаться
            </a>

            <a
              href="#projects"
              class="inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-2.5 text-sm font-medium text-[color:var(--text)] transition hover:bg-[color:var(--surface)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
            >
              Проекты
            </a>
          </div>

          <div class="mt-8 flex flex-wrap gap-2">
            <span
              v-for="tag in tags"
              :key="tag"
              class="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs sm:text-sm text-[color:var(--muted)]"
            >
              {{ tag }}
            </span>
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

            <div class="relative grid gap-4">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-[color:var(--text)]">Коротко</p>
                <p class="text-xs text-[color:var(--muted)]">Доступен для задач</p>
              </div>

              <ul class="grid gap-3">
                <li class="flex items-start gap-3">
                  <span
                    class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] text-sm text-[color:var(--text)]"
                    aria-hidden="true"
                    >TS</span
                  >
                  <div>
                    <p class="text-sm font-medium text-[color:var(--text)]">TypeScript</p>
                    <p class="text-sm text-[color:var(--muted)]">
                      строгая типизация · DX · быстрые итерации
                    </p>
                  </div>
                </li>

                <li class="flex items-start gap-3">
                  <span
                    class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] text-sm text-[color:var(--text)]"
                    aria-hidden="true"
                    >N</span
                  >
                  <div>
                    <p class="text-sm font-medium text-[color:var(--text)]">NestJS</p>
                    <p class="text-sm text-[color:var(--muted)]">
                      REST · DTO/validation · архитектура модулей
                    </p>
                  </div>
                </li>

                <li class="flex items-start gap-3">
                  <span
                    class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] text-sm text-[color:var(--text)]"
                    aria-hidden="true"
                    >Nu</span
                  >
                  <div>
                    <p class="text-sm font-medium text-[color:var(--text)]">Nuxt</p>
                    <p class="text-sm text-[color:var(--muted)]">
                      SSR/SPA · @nuxt/content · UI на Tailwind
                    </p>
                  </div>
                </li>
              </ul>

              <div class="mt-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4">
                <p class="text-xs uppercase tracking-wide text-[color:var(--muted)]">Фокус</p>
                <p class="mt-1 text-sm text-[color:var(--text)]">
                  Быстрый MVP, понятный код, устойчивые компоненты и аккуратная типографика.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const tags = [
  "NestJS",
  "Nuxt",
  "Tailwind",
  "PostgreSQL",
  "REST API",
  "Auth/JWT",
  "Docker",
  "CI/CD",
] as const
</script>
