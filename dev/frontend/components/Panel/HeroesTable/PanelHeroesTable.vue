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
</template>

<script lang="ts" setup>
import type { HeroesFetchResponse } from "~/types/heroes";
import PanelHeroStatus from "./PanelHeroStatus.vue";

const config = useRuntimeConfig();
const page = ref(1);
const perPage = 10;
const slots = ["status-data", "actions-data"];
const { allocations } = useAllocationsStore();

const { pending, data: heroes } = await useLazyAsyncData<HeroesFetchResponse>(
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
