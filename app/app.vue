<template>
  <div class="min-h-dvh bg-[color:var(--bg)]">
    <div class="pointer-events-none fixed right-4 top-20 z-[60]">
      <ThemeToggle class="pointer-events-auto" />
    </div>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from "./components/theme/ThemeToggle.vue";

useHead({
  title: "Сайт Дербенева Георгия",
});
</script>
