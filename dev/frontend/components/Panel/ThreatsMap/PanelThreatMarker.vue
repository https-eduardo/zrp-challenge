<template>
  <LMarker :lat-lng="[allocation.position.lat, allocation.position.lng]">
    <LIcon
      :icon-url="getHeroUrl(allocation.heroes[0]) ?? DEFAULT_ICON"
      :shadow-url="getHeroUrl(allocation.heroes[1])"
      :shadow-size="[24, 24]"
      :shadow-anchor="[24, 12]"
      :icon-size="[24, 24]"
    />
    <panel-threat-popup :allocation="allocation" />
  </LMarker>
</template>

<script lang="ts" setup>
import PanelThreatPopup from "./PanelThreatPopup.vue";
import type { Allocation } from "~/types/allocation";
import type { Hero } from "~/types/hero";
const DEFAULT_ICON = "https://i.imgur.com/NCtrK9c.png";

const { allocation } = defineProps<{ allocation: Allocation }>();

const getHeroUrl = (hero?: Hero) => {
  if (!hero || !hero.imageUrl) return undefined;

  return hero.imageUrl;
};
</script>
