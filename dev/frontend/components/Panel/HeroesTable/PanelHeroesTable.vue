<template>
  <base-table
    :loading="pending"
    :rows="heroes?.data"
    :columns="columns"
    :slots="slots"
  >
    <template #status-data="{ row }">
      <panel-table-status-badge
        :status="row.status === 'AVAILABLE'"
        label-active="Disponível"
        label-deactivated="Indisponível"
      />
    </template>
    <template #actions-data="{ row }">
      <div class="flex gap-2 justify-end">
        <base-button
          class="!text-primary-500"
          icon="i-ion-create-outline"
          size="xs"
          @click="() => toggleEditModal(row.id)"
        />
        <base-button
          class="!text-red-700"
          icon="i-ion-trash-outline"
          size="xs"
          @click="() => toggleDeleteModal(row.id)"
        />
      </div>
    </template>
  </base-table>
  <div class="flex justify-end my-1">
    <base-pagination
      v-model="page"
      :page-count="perPage"
      :total="heroes?.total"
    />
  </div>
  <panel-hero-edit-modal
    @cancel="toggleEditModal"
    @submit="editHero"
    v-model="state.editModalOpen"
    :heroId="state.heroId"
  />
  <panel-hero-delete-modal
    @cancel="toggleDeleteModal"
    @confirm="deleteHero"
    v-model="state.deleteModalOpen"
    :heroId="state.heroId"
  />
</template>

<script lang="ts" setup>
import type { HeroesFetchResponse, HeroesForm } from "~/types/heroes";
import PanelHeroDeleteModal from "../HeroesModals/PanelHeroDeleteModal.vue";
import PanelHeroEditModal from "../HeroesModals/PanelHeroEditModal.vue";
import type { FormSubmitEvent } from "#ui/types";

interface HeroesTableState {
  deleteModalOpen: boolean;
  editModalOpen: boolean;
  heroId?: number;
}

const config = useRuntimeConfig();
const toast = useToast();
const page = ref(1);

const state = reactive<HeroesTableState>({
  deleteModalOpen: false,
  editModalOpen: false,
  heroId: undefined,
});
const perPage = 10;
const slots = ["status-data", "actions-data"];
const { allocations } = useAllocationsStore();

function toggleEditModal(heroId?: number) {
  state.heroId = heroId;
  if (heroId) state.editModalOpen = true;
  else state.editModalOpen = false;
}

function toggleDeleteModal(heroId?: number) {
  if (heroId) state.deleteModalOpen = true;
  else state.deleteModalOpen = false;
}

async function deleteHero() {
  try {
    await $fetch(`${config.public.apiUrl}/heroes/${state.heroId}`, {
      method: "DELETE",
      credentials: "include",
      headers: useRequestHeaders(),
    });
  } catch {}
  refresh();
  toggleDeleteModal();
}

async function editHero(event: FormSubmitEvent<HeroesForm>) {
  try {
    const { name, imageUrl, rank, position } = event.data;
    await $fetch(`${config.public.apiUrl}/heroes/${state.heroId}`, {
      body: {
        name,
        imageUrl,
        rank,
        latitude: position.lat,
        longitude: position.lng,
      },
      method: "PATCH",
      credentials: "include",
      headers: useRequestHeaders(),
    });
  } catch {
    toast.add({
      title: "Houve um erro ao editar o herói",
      icon: "i-ion-close-circle-outline",
    });
  }
  refresh();
  toggleEditModal();
}

const {
  pending,
  data: heroes,
  refresh,
} = await useLazyAsyncData<HeroesFetchResponse>(
  "heroes",
  () =>
    $fetch(
      `${config.public.apiUrl}/heroes?limit=${perPage}&page=${page.value}`,
      {
        credentials: "include",
        headers: useRequestHeaders(),
      }
    ),
  { watch: [page, allocations] }
);

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Nome",
  },
  {
    key: "rank",
    label: "Rank",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
  },
];
</script>
