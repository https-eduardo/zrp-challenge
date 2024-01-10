<template>
  <LMap
    ref="map"
    :center="[47.21322, -1.559482]"
    :zoom="3"
    :min-zoom="2"
    :options="{ attributionControl: false }"
  >
    <LTileLayer
      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      layer-type="base"
      name="Stadia.StamenToner"
      :max-zoom="8"
    />
    <panel-threat-marker
      v-for="(allocation, index) in allocations"
      :allocation="allocation"
      :key="index"
    />
  </LMap>
</template>

<script lang="ts" setup>
import PanelThreatMarker from "./PanelThreatMarker.vue";

const map = ref();
const allocations = useAllocationsStore().allocations;
</script>
