<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user.store";
import FooterLayout from "../layout/FooterLayout.vue";
import HeaderLayout from "../layout/HeaderLayout.vue";
import { SIGNIN_NAMEROUTE } from "./config";

const router = useRouter();
const userStore = useUserStore();
console.log("userStore.isAuthenticated: ", userStore.isAuthenticated);
if (!userStore.isAuthenticated) {
  router.replace({ name: SIGNIN_NAMEROUTE });
}

const signout = () => {
  userStore.signout();
  router.replace({ name: SIGNIN_NAMEROUTE });
};
</script>

<template>
  <HeaderLayout />
  <main>
    <h1>Welcome {{ userStore.tokenObject?.athlete.firstname }}</h1>
    <button class="primary" @click="signout">Sign out</button>
  </main>
  <FooterLayout />
</template>
