<template>
  <div
    class="flex flex-col h-full p-12 bg-black justify-between max-md:flex-row max-md:items-center max-md:p-4 max-md:h-auto"
  >
    <div class="flex flex-col items-center">
      <img
        class="mt-4 mb-16 max-md:hidden"
        src="@/assets/img/logo-onu.svg"
        width="100px"
        height="85px"
      />
      <div class="flex flex-col gap-3 items-center max-md:flex-row">
        <panel-sidebar-link to="/">Ameaças rastreadas</panel-sidebar-link>
        <panel-sidebar-link to="/heroes">Gerenciar heróis</panel-sidebar-link>
        <panel-sidebar-link to="/history"
          >Histórico de alocações</panel-sidebar-link
        >
      </div>
    </div>
    <base-button
      class="!border-0 text-gray-500 hover:!border-l-4 flex justify-center items-center max-md:p-1"
      label="$ desconectar"
      icon="i-ion-md-redo"
      trailing
      @click="handleLogout"
    />
  </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore();

async function handleLogout() {
  await userStore.logout();
  navigateTo("/login");
}
</script>
