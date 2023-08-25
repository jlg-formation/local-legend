<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user.store";
import HeaderLayout from "../layout/HeaderLayout.vue";
import SegmentMap from "../SegmentMap.vue";
import { SIGNIN_NAMEROUTE } from "./config";

const router = useRouter();
const userStore = useUserStore();
console.log("userStore.isAuthenticated: ", userStore.isAuthenticated);
if (!userStore.isAuthenticated) {
  router.replace({ name: SIGNIN_NAMEROUTE });
}
</script>

<template>
  <HeaderLayout />
  <main>
    <SegmentMap />
  </main>
</template>

<style scoped lang="scss">
main {
  padding: 0;
}
</style>
