<template>
  <UTable :ui="ui" :loading-state="states.loading" :empty-state="states.empty">
    <template v-for="slotName in props.slots" v-slot:[slotName]="{ row }">
      <slot :name="slotName" :row="row"></slot>
    </template>
  </UTable>
</template>

<script lang="ts" setup>
const props = defineProps(["slots"]);
const states = {
  loading: {
    icon: "i-ion-sync",
    label: "Carregando...",
  },
  empty: {
    icon: "i-ion-pulse",
    label: "Lista vazia",
  },
};

const ui = {
  base: "min-w-full table-fixed bg-black border-l-2 border-t-2 border-r-4 border-b-4 border-gray-300",
  divide: "divide-y divide-gray-300",
  tbody: "divide-y divide-gray-300 dark:divide-gray-300",
  th: {
    color: "text-primary-500",
  },
  loadingState: {
    label: "text-sm text-center text-gray-300",
    icon: "w-6 h-6 mx-auto text-gray-300 mb-4 animate-spin",
  },
  emptyState: {
    label: "text-sm text-center text-gray-300",
    icon: "w-6 h-6 mx-auto text-gray-300 mb-4",
  },
};
</script>
