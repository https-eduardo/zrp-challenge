<template>
  <UButton label="Entrar" :ui="ui" />
</template>

<script lang="ts" setup>
const ui = {
  rounded: "rounded-none",
  base: "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-50 flex-shrink-0 border-2 border-gray-300 ease-in-out duration-100",
  color: {
    primary: "text-gray-300 bg-black",
  },
  variant: {
    solid:
      "bg-black enabled:hover:text-primary-400 enabled:hover:border-r-4 enabled:hover:border-b-4 enabled:active:bg-gray-300 enabled:active:text-black enabled:active:border-2",
  },
};
</script>
