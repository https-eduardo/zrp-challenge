// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "iHeros",
    },
  },
  colorMode: {
    preference: "dark",
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  css: ["@/assets/css/main.css"],
  modules: ["@nuxt/ui", "@pinia/nuxt", "nuxt3-leaflet"],
  ui: {
    icons: ["ion"],
  },
});
