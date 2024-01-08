<template>
  <UPagination
    :model-value="props.modelValue"
    @update:model-value="(value) => $emit('update:model-value', value)"
    :page-count="props.pageCount"
    :total="props.total"
    :ui="ui"
    :active-button="{
      color: 'primary',
      variant: 'solid',
      inactiveClass: '!bg-gray-300 !text-black !ring-primary-500',
    }"
  />
</template>

<script lang="ts" setup>
const props = defineProps(["pageCount", "total", "modelValue"]);

const ui = {
  wrapper: "flex items-center -space-x-px",
  rounded: "rounded-none",
  base: "!bg-black text-gray-300 !ring-gray-200 hover:!text-primary-500",
};

defineEmits(["update:model-value"]);
</script>
