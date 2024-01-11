<template>
  <div
    class="bg-black flex flex-col justify-between py-2 px-4 border-2 border-gray-300 border-b-4 border-r-4 flex-1 basis-1/2"
  >
    <div>
      <h2 class="font-bold text-xl text-gray-300">Logs</h2>
      <div class="flex flex-col gap-1 h-48 overflow-auto mt-2" ref="content">
        <p
          class="text-gray-400 text-sm break-all"
          v-for="(log, index) in logs"
          :key="index"
        >
          {{ log }}
        </p>
      </div>
    </div>
    <p class="text-gray-400 text-sm">$</p>
  </div>
</template>

<script lang="ts" setup>
const logs = useLogsStore().logs;
const content = ref();

watch(logs, () => {
  content.value.scroll({ top: content.value.scrollHeight, behavior: "smooth" });
});
</script>
