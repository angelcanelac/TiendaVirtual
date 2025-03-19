<script setup lang="ts">
import { ref } from "vue";
import SignIn from "@/components/auth/SignIn.vue";
import SignUp from "@/components/auth/SignUp.vue";
let auth = ref<boolean>(true);

function handleAuth(value: boolean) {
  auth.value = value;
}
</script>

<template>
  <main>
    <SignIn v-if="auth" @auth="handleAuth" />
    <SignUp v-else @auth="handleAuth" />
  </main>
</template>

<style scoped>
main {
  background: url("../assets/auth/background.jpg");
  background-position: center center;
  background-size: cover;
  height: 100vh;
}
</style>
