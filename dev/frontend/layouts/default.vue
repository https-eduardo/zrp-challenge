<template>
  <div class="flex h-full">
    <panel-sidebar />
    <nuxt-page class="my-6 mx-8" />
    <u-notifications
      :ui="{ position: 'top-0 bottom-auto right-0 z-[999]' }"
    ></u-notifications>
  </div>
</template>

<script lang="ts" setup>
import type { Allocation, FailedAllocation } from "~/types/allocation";
const { $socket } = useNuxtApp();
const allocationsStore = useAllocationsStore();
const logsStore = useLogsStore();
const toast = useToast();

onMounted(() => {
  $socket.on("allocation", (alloc: Allocation) => {
    allocationsStore.add(alloc);
    const notification = allocationsStore.getAllocationNotification(alloc);
    toast.add({ ...notification, icon: "i-ion-shield-checkmark" });
    logsStore.add(
      `Nova ameaça de rank ${alloc.threatRank} detectada. ${alloc.heroes.length} heróis alocados`
    );
  });

  $socket.on("allocationFailed", (alloc: FailedAllocation) => {
    const notification =
      allocationsStore.getFailedAllocationNotification(alloc);
    toast.add({ ...notification, icon: "i-ion-alert-circled" });
    logsStore.add(`Ameaça de rank ${alloc.threatRank} não neutralizada`);
  });
});
</script>
