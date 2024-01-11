<template>
  <base-modal
    @close="() => $emit('cancel')"
    title="Editar herói"
    :subtitle="`ID: ${props.heroId}`"
  >
    <panel-hero-form
      @cancel="() => $emit('cancel')"
      type="EDIT"
      :submit="(e) => $emit('submit', e)"
      :hero="hero"
    />
  </base-modal>
</template>

<script lang="ts" setup>
import type { Hero } from "~/types/heroes";
import PanelHeroForm from "./PanelHeroForm.vue";
const config = useRuntimeConfig();
const props = defineProps(["heroId"]);
const hero = ref<Hero | null>(null);

watch(
  () => props.heroId,
  async () => {
    if (!props.heroId) {
      hero.value = null;
      return;
    }
    hero.value = await $fetch(
      `${config.public.apiUrl}/heroes/${props.heroId}`,
      {
        credentials: "include",
        headers: useRequestHeaders(),
      }
    );
  }
);
</script>
