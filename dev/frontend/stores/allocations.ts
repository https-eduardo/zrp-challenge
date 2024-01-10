import type { Allocation, FailedAllocation } from "~/types/allocation";

interface AllocationsStore {
  allocations: Allocation[];
}

export const useAllocationsStore = defineStore("allocations", {
  state: () =>
    ({
      allocations: [],
    } as AllocationsStore),
  actions: {
    add(allocation: Allocation) {
      this.allocations.push(allocation);
      setTimeout(() => {
        this.remove(allocation);
      }, allocation.duration * 1000);
    },
    remove(allocation: Allocation) {
      const idx = this.allocations.findIndex((v) => v === allocation);

      this.allocations.splice(idx, 1);
    },
    getAllocationNotification(allocation: Allocation) {
      const heroesName = allocation.heroes.map((hero) => hero.name).join(" e ");
      const minutes = Math.floor(allocation.duration / 60);
      const seconds = allocation.duration % 60;

      return {
        title: `Nova ameaça sendo combatida por ${heroesName}.`,
        description: `Duração estimada: ${minutes}m ${
          seconds < 10 ? "0" + seconds : seconds
        }s`,
      } as Partial<Notification>;
    },
    getFailedAllocationNotification({
      threatName,
      threatRank,
    }: FailedAllocation) {
      return {
        title: `Não foi possível neutralizar ameaça.`,
        description: `Nenhum herói disponível para combater ${threatName} de Rank ${threatRank}.`,
      } as Partial<Notification>;
    },
  },
});
