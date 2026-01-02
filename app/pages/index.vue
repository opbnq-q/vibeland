<template>
    <div class="min-h-dvh bg-[color:var(--bg)]">
        <SiteNav />

        <main>
            <HeroSection />
        </main>
    </div>
</template>

<script setup lang="ts">
import HeroSection from "../components/HeroSection.vue";
import SiteNav from "../components/navigation/SiteNav.vue";
</script>
