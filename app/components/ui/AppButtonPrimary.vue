<template>
    <component
        :is="componentTag"
        v-bind="componentAttrs"
        :class="[
            'inline-flex items-center justify-center rounded-xl bg-[color:var(--accent)] px-3 py-2 text-sm font-medium text-[color:var(--accent-foreground)] shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]',
            props.class,
        ]"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
type Variant = "link" | "anchor" | "button";
type ButtonType = "button" | "submit" | "reset";

const props = withDefaults(
    defineProps<{
        to?: string;
        href?: string;
        type?: ButtonType;
        disabled?: boolean;
        class?: string;
    }>(),
    {
        type: "button",
        disabled: false,
        class: "",
    },
);

const variant = computed<Variant>(() => {
    if (props.to) return "link";
    if (props.href) return "anchor";
    return "button";
});

const componentTag = computed(() => {
    if (variant.value === "link") return "NuxtLink";
    if (variant.value === "anchor") return "a";
    return "button";
});

const componentAttrs = computed(() => {
    if (variant.value === "link") {
        return {
            to: props.to,
        };
    }

    if (variant.value === "anchor") {
        return {
            href: props.href,
        };
    }

    return {
        type: props.type,
        disabled: props.disabled,
    };
});
</script>
