<template>
    <div class="min-h-dvh bg-[color:var(--bg)]">
        <SiteNav />

        <main>
            <HeroSection />
            <AboutSection />
        </main>
    </div>
</template>

<script setup lang="ts">
import AboutSection from "../components/about/AboutSection.vue";
import HeroSection from "../components/HeroSection.vue";
import SiteNav from "../components/navigation/SiteNav.vue";
</script>
