<template>
  <base-modal title="Deletar herói" :subtitle="`ID: ${props.heroId ?? 0}`">
    <template #actions>
      <base-button
        @click="() => $emit('cancel')"
        label="Cancelar"
        class="border-0 border-transparent bg-gray-300 text-black hover:!text-black"
      />
      <base-button
        @click="() => $emit('confirm')"
        label="Deletar"
        class="bg-red-700 border-0 hover:!text-gray-300 border-transparent focus:!text-black"
      />
    </template>
  </base-modal>
</template>

<script lang="ts" setup>
defineEmits(["cancel", "confirm"]);
const props = defineProps(["heroId"]);
</script>
