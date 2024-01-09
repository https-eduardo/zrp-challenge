import type { User } from "../types/user";

interface UserStore {
  user: User | null;
}

interface LoginData {
  email: string;
  password: string;
}

export const useUserStore = defineStore("user", {
  state: () =>
    ({
      user: null,
    } as UserStore),
  actions: {
    async login(loginData: LoginData) {
      const config = useRuntimeConfig();

      return await $fetch(`${config.public.apiUrl}/auth`, {
        method: "POST",
        body: loginData,
        credentials: "include",
      });
    },
    async fetchUserData() {
      const config = useRuntimeConfig();

      try {
        const data = await $fetch<User>(`${config.public.apiUrl}/users/me`, {
          credentials: "include",
          headers: useRequestHeaders(),
        });

        this.user = data;
      } catch {
        this.user = null;
      }

      return this.user;
    },
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.user;
    },
  },
});
