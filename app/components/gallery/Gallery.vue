<template>
  <div class="grid gap-3 sm:gap-4">
    <div
      v-if="mediaItems.length === 0"
      class="rounded-2xl bg-[color:var(--surface)] p-6 text-sm text-[color:var(--muted)]"
    >
      В галерее пока нет медиа. Добавь элементы в массив и они появятся здесь.
    </div>

    <div
      v-else
      class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
    >
      <button
        v-for="(item, index) in mediaItems"
        :key="index"
        type="button"
        class="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[color:var(--surface)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
        :aria-label="`Открыть медиа ${index + 1} из ${mediaItems.length}`"
        @click="open(index)"
      >
        <img
          v-if="item.type === 'image'"
          :src="item.source"
          alt=""
          class="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />

        <div v-else-if="item.type === 'video'" class="relative h-full w-full">
          <img
            v-if="videoPosterByIndex[index]"
            :src="videoPosterByIndex[index]"
            alt=""
            class="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
          <video
            v-else
            :src="item.source"
            class="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.03]"
            muted
            playsinline
            preload="metadata"
          />

          <div class="pointer-events-none absolute inset-0 bg-black/10"></div>

          <div
            class="pointer-events-none absolute inset-0 grid place-items-center"
          >
            <div
              class="grid h-12 w-12 place-items-center rounded-full bg-black/55 backdrop-blur-sm transition duration-200 group-hover:scale-105"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" class="h-6 w-6 text-white">
                <path d="M10 8.5V15.5L16 12L10 8.5Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition group-hover:opacity-100"
          aria-hidden="true"
        ></div>
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Полноэкранный просмотр медиа"
        @click.self="close"
      >
        <div class="fixed inset-0 p-3 sm:p-6">
          <div class="flex h-full w-full flex-col gap-3">
            <div class="flex items-center justify-between gap-3">
              <div class="text-sm text-white/80">
                {{ activeIndex + 1 }} / {{ mediaItems.length }}
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="rounded-xl bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                  @click="prev"
                >
                  Назад
                </button>
                <button
                  type="button"
                  class="rounded-xl bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                  @click="next"
                >
                  Вперёд
                </button>
                <button
                  type="button"
                  class="rounded-xl bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                  @click="close"
                >
                  Закрыть
                </button>
              </div>
            </div>

            <div class="flex min-h-0 flex-1 items-center justify-center">
              <img
                v-if="active?.type === 'image'"
                :src="active.source"
                alt=""
                class="max-h-full max-w-full rounded-2xl bg-black/30 object-contain shadow-2xl"
              />

              <video
                v-else-if="active?.type === 'video'"
                :src="active.source"
                controls
                autoplay
                playsinline
                class="max-h-full max-w-full rounded-2xl bg-black shadow-2xl"
              />
            </div>

            <div class="text-center text-xs text-white/70">
              Esc — закрыть, ←/→ — переключать
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

export type Media = {
  source: string;
  type: "image" | "video";
};

const props = defineProps<{
  mediaItems: Media[];
}>();

const isOpen = ref(false);
const activeIndex = ref(0);
const lastActiveElement = ref<HTMLElement | null>(null);

const active = computed(() => props.mediaItems[activeIndex.value]);

const videoPosterByIndex = ref<Record<number, string>>({});

function clampIndex(index: number) {
  const len = props.mediaItems.length;
  if (len <= 0) return 0;
  return ((index % len) + len) % len;
}

async function open(index: number) {
  if (props.mediaItems.length === 0) return;
  lastActiveElement.value =
    (document.activeElement as HTMLElement | null) ?? null;
  activeIndex.value = clampIndex(index);
  isOpen.value = true;
  await nextTick();
}

function close() {
  isOpen.value = false;
}

function next() {
  activeIndex.value = clampIndex(activeIndex.value + 1);
}

function prev() {
  activeIndex.value = clampIndex(activeIndex.value - 1);
}

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return;

  if (e.key === "Escape") {
    e.preventDefault();
    close();
    return;
  }

  if (e.key === "ArrowRight") {
    e.preventDefault();
    next();
    return;
  }

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    prev();
    return;
  }
}

async function generateVideoPoster(src: string): Promise<string | null> {
  try {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.src = src;

    await new Promise<void>((resolve, reject) => {
      const cleanup = () => {
        video.removeEventListener("loadeddata", onLoadedData);
        video.removeEventListener("error", onError);
      };

      const onLoadedData = () => {
        cleanup();
        resolve();
      };

      const onError = () => {
        cleanup();
        reject(new Error("Video poster generation failed"));
      };

      video.addEventListener("loadeddata", onLoadedData, { once: true });
      video.addEventListener("error", onError, { once: true });
    });

    const targetTime =
      Number.isFinite(video.duration) && video.duration > 0
        ? Math.min(0.5, Math.max(0.1, video.duration * 0.1))
        : 0.1;

    await new Promise<void>((resolve, reject) => {
      const cleanup = () => {
        video.removeEventListener("seeked", onSeeked);
        video.removeEventListener("error", onError);
      };

      const onSeeked = () => {
        cleanup();
        resolve();
      };

      const onError = () => {
        cleanup();
        reject(new Error("Video seek failed"));
      };

      video.addEventListener("seeked", onSeeked, { once: true });
      video.addEventListener("error", onError, { once: true });
      video.currentTime = targetTime;
    });

    const canvas = document.createElement("canvas");
    const w = video.videoWidth || 0;
    const h = video.videoHeight || 0;
    if (w <= 0 || h <= 0) return null;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", 0.82);
  } catch {
    return null;
  }
}

async function generatePosters() {
  const entries = props.mediaItems
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.type === "video");

  for (const { item, index } of entries) {
    if (videoPosterByIndex.value[index]) continue;
    const poster = await generateVideoPoster(item.source);
    if (poster) videoPosterByIndex.value[index] = poster;
  }
}

watch(
  () => props.mediaItems,
  () => {
    videoPosterByIndex.value = {};
    void generatePosters();
  },
  { deep: true, immediate: true },
);

watch(isOpen, async (value) => {
  if (value) {
    document.addEventListener("keydown", onKeydown);
  } else {
    document.removeEventListener("keydown", onKeydown);
    await nextTick();
    lastActiveElement.value?.focus?.();
  }
});

onMounted(() => {
  void generatePosters();
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
});
</script>
