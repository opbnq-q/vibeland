<template>
    <div class="min-h-dvh bg-[color:var(--bg)]">
        <SiteNav />

        <main>
            <HeroSection />
            <AboutSection />
            <ContactSection />
        </main>
    </div>
</template>

<script setup lang="ts">
import AboutSection from "../components/about/AboutSection.vue";
import ContactSection from "../components/contact/ContactSection.vue";
import HeroSection from "../components/HeroSection.vue";
import SiteNav from "../components/navigation/SiteNav.vue";
</script>
