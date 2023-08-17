<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
  console.log("mounted");

  const location = window.location;
  console.log("location: ", JSON.stringify(location));
  const hash = window.location.hash;
  console.log("hash: ", hash);
  const queryString = hash.replace(/^.*\?/, "");
  console.log("queryString: ", queryString);

  const params = new URLSearchParams(queryString);
  console.log("params: ", params.get("code"));

  const router = useRouter();
  router.replace({ name: "Map" });
});
</script>

<template>
  <main>Yes you did it.</main>
</template>
