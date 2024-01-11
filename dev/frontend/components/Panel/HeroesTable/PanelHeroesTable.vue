<template>
  <base-table
    :loading="pending"
    :rows="heroes?.data"
    :columns="columns"
    :slots="slots"
  >
    <template #status-data="{ row }">
      <panel-hero-status :status="row.status" />
    </template>
    <template #actions-data="{ row }">
      <div class="flex gap-2 justify-end">
        <base-button
          class="!text-primary-500"
          icon="i-ion-create-outline"
          size="xs"
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
  <panel-hero-delete-modal
    @cancel="toggleDeleteModal"
    @confirm="deleteHero"
    v-model="state.deleteModalOpen"
    :heroId="state.heroId"
  />
</template>

<script lang="ts" setup>
import type { HeroesFetchResponse } from "~/types/heroes";
import PanelHeroStatus from "./PanelHeroStatus.vue";
import PanelHeroDeleteModal from "../HeroesModals/PanelHeroDeleteModal.vue";

const config = useRuntimeConfig();
const page = ref(1);
const state = reactive<{ deleteModalOpen: boolean; heroId?: number }>({
  deleteModalOpen: false,
  heroId: undefined,
});
const perPage = 10;
const slots = ["status-data", "actions-data"];
const { allocations } = useAllocationsStore();

function toggleDeleteModal(heroId?: number) {
  state.deleteModalOpen = !state.deleteModalOpen;
  state.heroId = heroId;
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
