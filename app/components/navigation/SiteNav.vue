<template>
  <header
    class="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--bg)] shadow-sm"
  >
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex min-h-16 items-center justify-between gap-3 py-2">
        <a
          href="#home"
          class="inline-flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-semibold tracking-tight text-[color:var(--text)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[color:var(--surface)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
        >
          <span
            class="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--accent)] text-xs font-semibold text-[color:var(--accent-foreground)]"
            aria-hidden="true"
          >
            G
          </span>
          <span>Георгий</span>
        </a>

        <nav
          class="hidden items-center gap-1 md:flex"
          aria-label="Основная навигация"
        >
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="rounded-xl px-3 py-2 text-sm text-[color:var(--muted)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[color:var(--surface)] hover:text-[color:var(--text)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <NuxtLink
            to="#contact"
            class="hidden rounded-xl bg-[color:var(--accent)] px-3 py-2 text-sm font-medium text-[color:var(--accent-foreground)] shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)] sm:inline-flex"
          >
            Связаться
          </NuxtLink>

          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[color:var(--bg)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)] md:hidden"
            :aria-expanded="isOpen"
            aria-controls="mobile-menu"
            @click="toggle"
          >
            <span class="sr-only">Открыть меню</span>
            <span aria-hidden="true">{{ isOpen ? "Закрыть" : "Меню" }}</span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="md:hidden" :hidden="!isOpen">
        <nav class="pb-3 pt-2" aria-label="Мобильная навигация">
          <div class="grid gap-1">
            <NuxtLink
              v-for="link in links"
              :key="`m-${link.href}`"
              :to="link.href"
              class="rounded-xl px-3 py-2 text-sm text-[color:var(--muted)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[color:var(--surface)] hover:text-[color:var(--text)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
              @click="close"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
type NavLink = { label: string; href: string };

const links: NavLink[] = [
  { label: "Главная", href: "#home" },
  { label: "Обо мне", href: "#about" },
  { label: "Контакты", href: "#contact" },
];

const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}

function close() {
  isOpen.value = false;
}
</script>
