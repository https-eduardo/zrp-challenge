<template>
  <UInput :ui="ui" color="primary" />
</template>

<script lang="ts" setup>
const ui = {
  rounded: "rounded-none",
  color: {
    primary: "text-gray-300",
  },
  icon: {
    color: "!text-gray-300",
  },
  variant: {
    outline:
      "bg-black ease-in-out duration-100 border-2 border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 focus:border-b-4 focus:border-r-4",
  },
  default: {
    variant: "outline",
    color: "primary",
  },
};
</script>
