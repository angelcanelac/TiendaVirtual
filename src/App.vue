<script setup lang="ts">
import { onMounted, watch } from "vue";
import { RouterView, useRouter } from "vue-router";
import { AuthStore } from "./stores/user";
//
const store = AuthStore();
const router = useRouter();
onMounted(() => {
  if (store.isAuthenticated) {
    router.push({ path: "/shop", replace: true });
  }
});
// watch
watch(
  () => store.isAuthenticated,
  (newVal) => {
    if (!newVal) {
      router.push({ path: "/", replace: true });
    }
  }
);
</script>
<template><RouterView /></template>

<style>
.v-messages__message {
  color: white;
}
</style>
