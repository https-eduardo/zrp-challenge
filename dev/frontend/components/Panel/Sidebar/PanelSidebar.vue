<template>
  <div class="flex flex-col h-full p-12 bg-black justify-between">
    <div class="flex flex-col items-center">
      <img
        class="mt-4 mb-16"
        src="@/assets/img/logo-onu.svg"
        width="100px"
        height="85px"
      />
      <div class="flex flex-col gap-3 items-center">
        <panel-sidebar-link to="/">Ameaças rastreadas</panel-sidebar-link>
        <panel-sidebar-link to="/heroes">Gerenciar heróis</panel-sidebar-link>
        <panel-sidebar-link to="/history"
          >Histórico de alocações</panel-sidebar-link
        >
      </div>
    </div>
    <base-button
      class="!border-0 text-gray-500 hover:!border-l-4"
      label="$ desconectar"
      icon="i-ion-md-redo"
      trailing
      block
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
