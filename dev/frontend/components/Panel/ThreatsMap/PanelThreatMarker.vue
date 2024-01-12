<template>
  <LMarker :lat-lng="[allocation.position.lat, allocation.position.lng]">
    <LIcon :icon-url="heroUrl ?? DEFAULT_ICON" :icon-size="[32, 32]" />
    <panel-threat-popup :allocation="allocation" />
  </LMarker>
</template>

<script lang="ts" setup>
import PanelThreatPopup from "./PanelThreatPopup.vue";
import type { Allocation } from "~/types/allocation";
const DEFAULT_ICON = "https://i.imgur.com/VBSV02e.png";

const { allocation } = defineProps<{ allocation: Allocation }>();

const heroUrl = computed(() => {
  const hero = allocation.heroes.find((hero) => !!hero.imageUrl);

  return hero?.imageUrl ?? undefined;
});
</script>
~/types/heroes
