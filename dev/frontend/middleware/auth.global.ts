export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();
  const isAuthRoute = to.meta.layout === "auth";

  await userStore.fetchUserData();

  if (!isAuthRoute && !userStore.isAuthenticated) {
    return navigateTo("/login");
  } else if (isAuthRoute && userStore.isAuthenticated) {
    return navigateTo("/");
  }
});
