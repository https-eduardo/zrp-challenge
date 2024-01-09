<template>
  <u-form
    ref="form"
    :schema="schema"
    :state="state"
    class="flex flex-col gap-4"
    @submit="handleSubmit"
  >
    <base-form-group name="name" label="Nome de usuário">
      <base-input
        v-model="state.name"
        size="xl"
        icon="i-ion-person"
        placeholder="ONUadmin1177"
        autocomplete="off"
      />
    </base-form-group>
    <base-form-group name="email" label="E-mail">
      <base-input
        v-model="state.email"
        size="xl"
        icon="i-ion-at"
        placeholder="usuario@onu.org"
        autocomplete="off"
      />
    </base-form-group>
    <base-form-group name="password" label="Senha">
      <base-input
        label="Senha"
        v-model="state.password"
        size="xl"
        icon="i-ion-lock-closed"
        placeholder="senha_segura"
        type="password"
      />
    </base-form-group>
    <span class="text-sm text-gray-300 text-right"
      >Já tem uma conta?
      <NuxtLink class="text-primary-500" to="/login"
        >Faça login aqui.</NuxtLink
      ></span
    >
    <base-button label="Cadastrar-se" type="submit" size="xl" block />
  </u-form>
</template>

<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const userStore = useUserStore();

const state = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
});

const required_error = "Este campo é obrigatório.";
const schema = z.object({
  name: z.string({ required_error }),
  email: z.string({ required_error }).email("Email inválido."),
  password: z.string({ required_error }),
});
const form = ref();

type Schema = z.output<typeof schema>;

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await userStore.register(event.data);
    navigateTo("/login");
  } catch {
    form.value.setErrors([
      { path: "name", message: "Não foi possível realizar o cadastro." },
    ]);
  }
}
</script>
