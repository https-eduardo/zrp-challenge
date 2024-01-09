<template>
  <div
    class="flex flex-col gap-2 p-12 border-2 border-b-4 border-r-4 border-gray-200 bg-black"
  >
    <img
      class="place-self-center mb-4"
      src="@/assets/img/logo-onu.svg"
      width="100px"
      height="80px"
    />
    <h1 class="font-bold text-xl text-primary-500">{{ props.title }}</h1>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    required: true,
    type: String,
  },
});
</script>
