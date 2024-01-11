<template>
  <UModal :ui="ui">
    <h1 class="font-bold text-lg text-gray-300">{{ props.title }}</h1>
    <h2 class="font-medium text-sm text-gray-400">{{ props.subtitle }}</h2>
    <slot></slot>
    <div class="flex gap-2 justify-between my-4">
      <slot name="actions"></slot>
    </div>
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps(["title", "subtitle"]);

const ui = {
  base: "relative text-left rtl:text-right overflow-hidden flex flex-col border-2 border-b-4 border-r-4 rounded-none border-gray-300 p-4",
  background: "bg-black",
  overlay: {
    background: "bg-black/75",
  },
};
</script>
