<template>
  <div class="flex flex-col gap-6 flex-1">
    <panel-threats-map
      class="w-100 border-2 border-gray-300 border-b-4 border-r-4"
    />
    <div class="flex gap-6 flex-wrap">
      <panel-log-terminal />
      <panel-connections-terminal />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
