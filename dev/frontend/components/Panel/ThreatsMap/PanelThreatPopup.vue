<template>
  <LPopup>
    <h1 class="font-bold text-sm">{{ allocation.threatName }}</h1>
    <span class="text-primary-500">{{ allocation.threatRank }}</span>
    <p>Heróis alocados: {{ allocatedHeroes }}</p>
  </LPopup>
</template>

<script lang="ts" setup>
import type { Allocation } from "~/types/allocation";

const { allocation } = defineProps<{ allocation: Allocation }>();

const allocatedHeroes = computed(() => {
  return allocation.heroes.map((hero) => hero.name).join(" e ");
});
</script>

<style>
.leaflet-popup-content-wrapper {
  @apply bg-black rounded-none border-2 border-gray-300 border-b-4 border-r-4 text-gray-300 p-1;
}
.leaflet-popup-close-button span {
  @apply text-gray-300;
}
.leaflet-popup-tip {
  @apply !bg-gray-300;
}
</style>
