<template>
  <base-table :columns="columns" :rows="rows" :loading="pending" :slots="slots">
    <template #combat-data="{ row }">
      <panel-table-status-badge
        :status="!row.combat"
        label-active="Neutralizada"
        label-deactivated="Em combate"
      />
    </template>
  </base-table>
  <div class="flex justify-end my-1">
    <base-pagination
      v-model="page"
      :page-count="perPage"
      :total="history?.total"
    />
  </div>
</template>

<script lang="ts" setup>
import type { HistoryFetchResponse } from "~/types/history";
import { DateUtils } from "~/utils/date";
const config = useRuntimeConfig();
const page = ref(1);
const slots = ["combat-data"];
const perPage = 10;
const allocations = useAllocationsStore();

const { pending, data: history } = await useLazyAsyncData<HistoryFetchResponse>(
  "heroes",
  () =>
    $fetch(
      `${config.public.apiUrl}/history?limit=${perPage}&page=${page.value}`,
      {
        credentials: "include",
        headers: useRequestHeaders(),
      }
    ),
  { watch: [page, allocations] }
);

const rows = computed(() => {
  return history.value?.data.map((record) => {
    if (record.heroes) {
      const heroesNames = record.heroes.map(({ name }) => name).join(" e ");

      const combat =
        new Date(record.finishDate).getTime() >
        new Date(new Date().toISOString()).getTime();

      const createdAt = DateUtils.formatDate(new Date(record.createdAt));
      const finishDate = DateUtils.formatDate(new Date(record.finishDate));
      return { ...record, heroesNames, combat, createdAt, finishDate };
    }
  });
});

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "threatName",
    label: "Nome ameaça",
  },
  {
    key: "threatRank",
    label: "Rank ameaça",
  },
  {
    key: "combat",
    label: "Status",
  },
  {
    key: "heroesNames",
    label: "Heróis alocados",
  },
  { key: "finishDate", label: "Neutralizada em" },
  {
    key: "createdAt",
    label: "Alocado em",
  },
];
</script>
