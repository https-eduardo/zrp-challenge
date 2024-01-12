<template>
  <UBadge
    :ui="{ rounded: 'rounded-none' }"
    variant="soft"
    :label="status ? labelActive : labelDeactivated"
    :class="
      status ? '!bg-primary-500 !text-black' : '!bg-red-700 !text-gray-300'
    "
  />
</template>

<script lang="ts" setup>
const { status, labelActive, labelDeactivated } = defineProps([
  "status",
  "labelActive",
  "labelDeactivated",
]);
</script>
