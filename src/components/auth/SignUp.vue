<script setup lang="ts">
import { ref, computed } from "vue";
import Auth from "@/api/Auth";
import type { User } from "@/types/User";
const emit = defineEmits(["auth"]);

const user = ref<User>({
  name: "",
  email: "",
  password: "",
  c_password: "",
});
let visible = ref<boolean>(false);
let isEmpty = ref<boolean>(false);
let isPassword = ref<boolean>(false);
let loading = ref<boolean>(false);

const rules = {
  required: (value: string) => !!value || "Campo Obligatorio",
  email: (value: string) => /.+@.+\..+/.test(value) || "E-mail debe ser válido",
};

// fuctions
async function onSubmit(): Promise<void> {
  try {
    loading.value = true;
    if (
      !user.value.email ||
      !user.value.name ||
      !user.value.password ||
      !user.value.c_password
    ) {
      isEmpty.value = true;
    } else {
      if (user.value.password === user.value.c_password) {
        await Auth.signUp(user.value);
        emit("auth", true);
        clearInputs();
      } else {
        isPassword.value = true;
      }
    }
  } catch (err: any) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

function clearInputs(): void {
  user.value.email = "";
  user.value.name = "";
  user.value.password = "";
  user.value.c_password = "";
}

function handleEmit(): void {
  emit("auth", true);
}

// computed
const showDialog = computed({
  get: () => isEmpty.value || isPassword.value,
  set: (value: boolean) => {
    isEmpty.value = value;
    isPassword.value = value;
  },
});
</script>

<template>
  <v-sheet
    class="d-flex flex-column align-center justify-center h-100 bg-transparent"
  >
    <v-container max-width="400">
      <span @click="handleEmit" class="v-icon--clickable">
        <v-icon icon="mdi-keyboard-backspace" color="indigo" size="45" />
      </span>

      <v-row justify="center">
        <v-col cols="12" md="6" lg="12">
          <v-form @submit.prevent="onSubmit">
            <v-text-field
              v-model="user.name"
              :rules="[rules.required]"
              class="mb-2"
              label="Nombre"
              placeholder="Tu nombre completo"
              clearable
              prepend-inner-icon="mdi-account-circle"
              base-color="white"
              variant="solo-filled"
            />
            <v-text-field
              v-model="user.email"
              :rules="[rules.required, rules.email]"
              class="mb-2"
              label="E-mail"
              placeholder="Ej: correo@correo.com"
              clearable
              prepend-inner-icon="mdi-email"
              base-color="white"
              variant="solo-filled"
            />

            <v-text-field
              v-model="user.password"
              :rules="[rules.required]"
              label="Contraseña"
              class="mb-2"
              prepend-inner-icon="mdi-lock"
              placeholder="Ingresa tu Contraseña"
              variant="solo-filled"
              base-color="white"
              :type="visible ? 'text' : 'password'"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="visible = !visible"
            />

            <v-text-field
              v-model="user.c_password"
              :rules="[rules.required]"
              label="Confirma tu contraseña"
              prepend-inner-icon="mdi-lock"
              placeholder="Confirma tu contraseña"
              variant="solo-filled"
              base-color="white"
              :type="visible ? 'text' : 'password'"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="visible = !visible"
            />

            <br />
            <v-btn
              color="white"
              size="large"
              type="submit"
              variant="elevated"
              :loading="loading"
              block
              text-color="#2148C0"
            >
              Registrarse
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>

  <v-dialog width="auto" v-model="showDialog">
    <v-card title="Advertencia">
      <v-card-text>
        {{
          isPassword && !isEmpty
            ? "Contraseñas distintas, verifica los campos."
            : isEmpty && !isPassword
            ? "Todos los campos son obligatorios"
            : ""
        }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text="Cerrar" @click="showDialog = false" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
