// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    preference: "dark",
  },
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  modules: ["@nuxt/ui"],
  ui: {
    icons: ["ion"],
  },
});
