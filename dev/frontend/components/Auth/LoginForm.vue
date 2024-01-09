<template>
  <u-form
    ref="form"
    :schema="schema"
    :state="state"
    class="flex flex-col gap-4"
    @submit="handleSubmit"
  >
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
      >Ainda não tem conta?
      <NuxtLink class="text-primary-500" to="/register"
        >Se cadastre aqui.</NuxtLink
      ></span
    >
    <base-button label="Entrar" type="submit" size="xl" block />
  </u-form>
</template>

<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const userStore = useUserStore();

const state = reactive({
  email: undefined,
  password: undefined,
});

const schema = z.object({
  email: z
    .string({ required_error: "Este campo é obrigatório." })
    .email("Email inválido."),
  password: z.string({
    required_error: "Este campo é obrigatório.",
  }),
});
const form = ref();

type Schema = z.output<typeof schema>;

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await userStore.login(event.data);
    navigateTo("/");
  } catch {
    form.value.setErrors([
      { path: "email", message: "E-mail ou senha inválidos" },
    ]);
  }
}
</script>
