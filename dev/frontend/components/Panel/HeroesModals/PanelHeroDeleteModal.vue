<template>
  <base-modal title="Deletar herói" :subtitle="`ID: ${props.heroId ?? 0}`">
    <template #actions>
      <base-button
        @click="() => $emit('cancel')"
        label="Cancelar"
        class="border-0 bg-gray-300 text-black hover:!border-0"
      />
      <base-button
        @click="() => $emit('confirm')"
        label="Deletar"
        class="bg-red-700 border-0 hover:!text-gray-300 hover:!border-0 focus:!text-black"
      />
    </template>
  </base-modal>
</template>

<script lang="ts" setup>
defineEmits(["cancel", "confirm"]);
const props = defineProps(["heroId"]);
</script>
