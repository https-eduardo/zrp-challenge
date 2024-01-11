<template>
  <LMap
    @click="(e: Record<string, any>) => $emit('update:model-value', e.latlng)"
    class="border-1 border-gray-300"
    :center="[0, 0]"
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
    <LMarker :lat-lng="modelValue">
      <LIcon :icon-url="MARKER_URL" :icon-size="[64, 64]" />
    </LMarker>
  </LMap>
</template>

<script lang="ts" setup>
const { modelValue } = defineProps(["modelValue"]);
const MARKER_URL = "https://i.imgur.com/VBSV02e.png";

defineEmits(["update:model-value"]);
</script>
