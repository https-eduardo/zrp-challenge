<template>
  <UBadge
    :ui="{ rounded: 'rounded-none' }"
    variant="soft"
    :label="status === 'AVAILABLE' ? 'Disponível' : 'Indisponível'"
    :class="
      status === 'AVAILABLE'
        ? '!bg-primary-500 !text-black'
        : '!bg-red-700 !text-gray-300'
    "
  />
</template>

<script lang="ts" setup>
const { status } = defineProps(["status"]);
</script>
