<template>
  <div class="flex flex-col gap-4 flex-1">
    <div class="flex justify-between items-center">
      <h1 class="font-bold text-gray-300 text-2xl">Gerenciar heróis</h1>
      <base-button label="Novo herói" @click="toggleCreateHeroModal" />
    </div>
    <panel-heroes-table />
    <panel-hero-create-modal
      @cancel="toggleCreateHeroModal"
      v-model="isCreateHeroModalOpen"
      @submit="handleCreateHero"
    />
  </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import type { HeroesForm } from "~/types/heroes";
import PanelHeroCreateModal from "~/components/Panel/HeroesModals/PanelHeroCreateModal.vue";
const isCreateHeroModalOpen = ref(false);
const config = useRuntimeConfig();
const toast = useToast();

function toggleCreateHeroModal() {
  isCreateHeroModalOpen.value = !isCreateHeroModalOpen.value;
}

async function handleCreateHero(event: FormSubmitEvent<HeroesForm>) {
  try {
    const { name, imageUrl, rank, position } = event.data;
    await $fetch(`${config.public.apiUrl}/heroes`, {
      body: {
        name,
        imageUrl,
        rank,
        latitude: position.lat,
        longitude: position.lng,
      },
      method: "POST",
      credentials: "include",
      headers: useRequestHeaders(),
    });
    toast.add({
      title: "Herói adicionado",
      avatar: { src: imageUrl, alt: name },
      description: "Atualize a lista para visualizá-lo",
    });
  } catch {
    toast.add({
      title: "Houve um erro ao adicionar o herói",
      icon: "i-ion-close-circle-outline",
    });
  }
  toggleCreateHeroModal();
}
</script>
