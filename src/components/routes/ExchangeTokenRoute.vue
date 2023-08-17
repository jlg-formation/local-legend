<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user.store";

onMounted(() => {
  console.log("mounted");

  const hash = window.location.hash;
  const queryString = hash.replace(/^.*\?/, "");
  const params = new URLSearchParams(queryString);
  const code = params.get("code");
  if (code === null) {
    throw new Error("code is null");
  }
  console.log("code: ", code);

  const userStore = useUserStore();
  userStore.signin(code);

  const router = useRouter();
  router.replace({ name: "Map" });
});
</script>

<template>
  <main>Yes you did it.</main>
</template>
