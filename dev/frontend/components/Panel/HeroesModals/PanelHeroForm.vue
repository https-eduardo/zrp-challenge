<template>
  <u-form
    :state="state"
    :schema="schema"
    class="flex flex-col gap-4 mt-4"
    @submit="submit"
  >
    <base-form-group name="name" label="Nome" required>
      <base-input
        v-model="state.name"
        placeholder="Kuririn"
        autocomplete="off"
      />
    </base-form-group>
    <base-form-group name="position" label="Posição" required>
      <panel-hero-position-select v-model="state.position" class="min-h-48" />
    </base-form-group>
    <base-form-group name="imageUrl" label="Imagem">
      <base-input
        v-model="state.imageUrl"
        placeholder="http://imgur.com/image.png"
      />
    </base-form-group>
    <base-form-group name="rank" label="Rank" required>
      <base-select v-model="state.rank" :options="rankOptions" />
    </base-form-group>
    <div class="flex justify-between mt-2">
      <base-button
        label="Cancelar"
        type="button"
        class="border-0 border-transparent bg-gray-300 text-black hover:!text-black"
        @click="() => $emit('cancel')"
      />
      <base-button
        class="bg-primary-500 border-transparent text-black hover:!text-black"
        icon="i-ion-arrow-right-a"
        trailing
        :label="submitButtonLabel"
        type="submit"
      />
    </div>
  </u-form>
</template>

<script lang="ts" setup>
import { z } from "zod";
import {
  HeroRank,
  type Hero,
  type HeroesForm,
  type HeroPosition,
} from "~/types/heroes";
import PanelHeroPositionSelect from "./PanelHeroPositionSelect.vue";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

interface HeroState {
  name?: string;
  imageUrl?: string;
  rank: string;
  position: HeroPosition;
}

const props = defineProps<{
  type: "EDIT" | "CREATE";
  submit: (e: FormSubmitEvent<HeroesForm>) => any;
  hero?: Hero | null;
}>();

const submitButtonLabel = computed(() =>
  props.type === "CREATE" ? "Criar" : "Salvar"
);

const state: HeroState = reactive({
  name: undefined,
  imageUrl: undefined,
  rank: "S",
  position: { lat: 0, lng: 0 },
});
const rankOptions = Object.values(HeroRank);

const required_error = "Este campo é obrigatório.";
const schema = z.object({
  name: z.string({ required_error }),
  imageUrl: z.string().url({ message: "URL inválida" }).optional(),
  rank: z.nativeEnum(HeroRank, { required_error }),
  position: z.object({ lat: z.number(), lng: z.number() }, { required_error }),
});

watch(
  () => props.hero,
  () => {
    const { hero, type } = props;
    if (type === "EDIT" && hero) {
      state.name = hero.name;
      state.imageUrl = hero.imageUrl ?? undefined;
      state.position = { lat: hero.latitude, lng: hero.longitude };
      state.rank = hero.rank;
    }
  }
);
</script>
