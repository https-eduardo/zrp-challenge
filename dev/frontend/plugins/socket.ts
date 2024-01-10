import io from "socket.io-client";

export default defineNuxtPlugin(({ $config }) => {
  const socket = io($config.public.apiUrl, { autoConnect: false });

  return {
    provide: {
      socket,
    },
  };
});
