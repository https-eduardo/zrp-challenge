export default defineAppConfig({
  ui: {
    strategy: "override",
    notification: {
      background: "bg-black",
      rounded: "rounded-none",
      container:
        "relative overflow-hidden border-2 border-gray-300 hover:border-r-4 hover:border-b-4 ease-in-out duration-100",
      title: "text-sm font-medium text-gray-300",
      default: {
        closeButton: {
          icon: "i-ion-close-sharp",
          color: "gray",
        },
      },
    },
  },
});
