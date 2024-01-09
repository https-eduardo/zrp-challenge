// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    preference: "dark",
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  modules: ["@nuxt/ui", "@pinia/nuxt", "nuxt3-leaflet"],
  ui: {
    icons: ["ion"],
  },
});
