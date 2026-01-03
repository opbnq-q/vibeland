<template>
  <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
    <section class="py-10 sm:py-14">
      <header class="space-y-3">
        <h1
          class="text-2xl font-semibold tracking-tight text-[color:var(--text)] sm:text-3xl"
        >
          Галерея
        </h1>
      </header>

      <div class="mt-8">
        <Gallery :media-items="mediaItems" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Gallery, { type Media } from "../components/gallery/Gallery.vue";

useHead({
  title: "Галерея",
  meta: [
    {
      name: "description",
      content:
        "Галерея медиа: скриншоты и короткие видео с проектов. Полноэкранный просмотр, навигация и управление с клавиатуры.",
    },
  ],
});

const mediaItems: Media[] = [
  {
    source:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2JFyVMUGB2hCmAhFXOdCydqzgsCHd2BAzEA&s",
    type: "image",
  },
  {
    type: "image",
    source:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykzoZeCE0p7LeuyHnLYCdPP2jju9d5PaMeA&s",
  },
  {
    type: "video",
    source:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKj2T4DnTvO6BbaQbU9Jahwv8pfXKBldO32w&s",
  },
];
</script>
