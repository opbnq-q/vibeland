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
    source: "/gallery/DSC_5889.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5890.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5891.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5892.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5893.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5895.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5896.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5898.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5899.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5900.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5901.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5902.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5903.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5904.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5905.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5907.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5908.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5909.JPG",
    type: "image",
  },

  {
    source: "/gallery/DSC_5910.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5911.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5912.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5915.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5917.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5918.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5919.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5921.JPG",
    type: "image",
  },
  {
    source: "/gallery/DSC_5922.JPG",
    type: "image",
  },
];
</script>
