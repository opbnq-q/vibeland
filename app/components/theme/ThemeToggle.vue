<template>
  <button
    type="button"
    class="inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[color:var(--bg)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <span class="sr-only">{{ label }}</span>

    <span class="inline-flex items-center gap-2" aria-hidden="true">
      <span
        class="inline-flex h-5 w-5 items-center justify-center rounded-lg border border-[color:var(--border)] bg-[color:var(--bg)] text-xs"
      >
        {{ icon }}
      </span>
      <span class="hidden sm:inline">{{ text }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

const theme = ref<Theme>("light");

const icon = computed(() => (theme.value === "dark" ? "☾" : "☀"));
const text = computed(() => (theme.value === "dark" ? "Тёмная" : "Светлая"));
const label = computed(() =>
  theme.value === "dark"
    ? "Переключить на светлую тему"
    : "Переключить на тёмную тему",
);

function applyTheme(next: Theme) {
  theme.value = next;

  if (!import.meta.client) return;

  document.documentElement.setAttribute("data-theme", next);

  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch (error) {
    console.warn(
      "[ThemeToggle] Failed to persist theme in localStorage:",
      error,
    );
  }
}

function toggle() {
  applyTheme(theme.value === "dark" ? "light" : "dark");
}

onMounted(() => {
  if (!import.meta.client) return;

  let stored: Theme | null = null;
  try {
    stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? null;
  } catch (error) {
    console.warn(
      "[ThemeToggle] Failed to read theme from localStorage:",
      error,
    );
  }

  if (stored === "light" || stored === "dark") {
    applyTheme(stored);
    return;
  }

  const prefersDark =
    window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;

  applyTheme(prefersDark ? "dark" : "light");
});
</script>
