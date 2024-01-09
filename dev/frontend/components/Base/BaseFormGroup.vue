<template>
  <UFormGroup :ui="ui">
    <slot></slot>
  </UFormGroup>
</template>

<script lang="ts" setup>
const ui = {
  label: {
    base: "block font-medium text-md text-gray-300",
  },
  error: "mt-2 text-red-600",
};
</script>
