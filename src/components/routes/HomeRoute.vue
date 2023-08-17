<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user.store";
import FooterLayout from "../layout/FooterLayout.vue";
import HeaderLayout from "../layout/HeaderLayout.vue";

const router = useRouter();
const userStore = useUserStore();
console.log("userStore.isAuthenticated: ", userStore.isAuthenticated);
if (!userStore.isAuthenticated) {
  router.replace({ name: "Signin" });
}
</script>

<template>
  <HeaderLayout />
  <main>
    <h1>Home Route</h1>
  </main>
  <FooterLayout />
</template>
