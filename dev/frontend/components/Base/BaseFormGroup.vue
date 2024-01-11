<template>
  <UFormGroup :ui="ui">
    <slot></slot>
  </UFormGroup>
</template>

<script lang="ts" setup>
const ui = {
  label: {
    base: "block font-medium text-md text-gray-300",
    required: "after:content-['*'] after:ms-0.5 after:text-red-600",
  },
  error: "mt-2 text-red-600",
};
</script>
