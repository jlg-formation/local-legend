<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user.store";
import HeaderLayout from "../layout/HeaderLayout.vue";
import SegmentMap from "../SegmentMap.vue";

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
    <SegmentMap />
  </main>
</template>
