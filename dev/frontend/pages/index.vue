<template>
  <div class="m-4">
    <base-table />
    <base-button />
    <base-input
      v-model="input"
      label="Nome de usuário"
      placeholder="onuuser"
      icon="i-ion-person-sharp"
    />
    <base-pagination v-model="currentPage" :total="10" :pageCount="1" />
    <u-notifications />
  </div>
</template>

<script setup lang="ts">
const currentPage = ref(1);
const input = ref("");

const toast = useToast();

onMounted(() => {
  toast.add({
    title: "Nova ameaça sendo combatida por Jorginho Gamespreis!",
    description: "Duração estimada de 2 minutos.",
    icon: "i-ion-alert-circled",
    timeout: 8000,
  });
});
</script>
