<template>
  <USelectMenu :ui="ui" :ui-menu="uiMenu" variant="none"> </USelectMenu>
</template>

<script lang="ts" setup>
const ui = {
  rounded: "rounded-none",
  variant: {
    none: "bg-black ring-1 ring-gray-300",
  },
};
const uiMenu = {
  background: "bg-black",
  rounded: "rounded-none",
  ring: "ring-1 ring-gray-300",
  option: {
    rounded: "rounded-none",
    active: "bg-gray-300 !text-black",
    color: "text-gray-300",
  },
};
</script>
