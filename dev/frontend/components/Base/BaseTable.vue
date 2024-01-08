<template>
  <UTable
    :ui="ui"
    :loading-state="states.loading"
    :empty-state="states.empty"
  />
</template>

<script lang="ts" setup>
const states = {
  loading: {
    icon: "i-ion-sync",
    label: "Carregando...",
  },
  empty: {
    icon: "i-ion-pulse",
    label: "Sem registros.",
  },
};

const ui = {
  base: "min-w-full table-fixed bg-black border-l-2 border-t-2 border-r-4 border-b-4 border-gray-300",
  divide: "divide-y divide-gray-300",
  tbody: "divide-y divide-gray-300 dark:divide-gray-300",
  th: {
    color: "text-primary-500",
  },
  td: {
    base: "whitespace-nowrap hover:bg-gray-300 cursor-default",
    color: "hover:text-black",
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
