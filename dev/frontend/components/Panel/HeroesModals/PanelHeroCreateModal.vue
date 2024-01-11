<template>
  <base-modal
    title="Cadastrar herói"
    subtitle="Cadastre um herói para combater as ameaças"
  >
    <panel-hero-form
      @cancel="() => $emit('cancel')"
      type="CREATE"
      :submit="(e) => $emit('submit', e)"
    />
  </base-modal>
</template>

<script lang="ts" setup>
import PanelHeroForm from "./PanelHeroForm.vue";
</script>
