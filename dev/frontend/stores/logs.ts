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
      const log = `${DateUtils.formatDate(new Date())}  [LOG] ${msg}.`;
      this.logs.push(log);
    },
  },
});
