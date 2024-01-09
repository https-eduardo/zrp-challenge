interface LogsStore {
  logs: string[];
}

export const useLogsStore = defineStore("logs", {
  state: () =>
    ({
      logs: [],
    } as LogsStore),
  actions: {
    add(msg: string) {
      const dateStr = new Date().toLocaleString("pt-BR", {
        month: "2-digit",
        year: "numeric",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const log = `${dateStr}  [LOG] ${msg}.`;
      this.logs.push(log);
    },
  },
});
