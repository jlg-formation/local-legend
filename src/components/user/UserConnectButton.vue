<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useApiStore } from "../../stores/api.store";

const link = ref("");

onMounted(async () => {
  console.log("window.location.origin: ", window.location.origin);
  const redirectUri = `${window.location.origin}/#/exchange_token`;
  const stravaUri = "http://www.strava.com/oauth/authorize";

  const apiStore = useApiStore();
  const clientId = await apiStore.getClientId();

  link.value =
    `${stravaUri}?client_id=${clientId}&approval_prompt=force&scope=read&response_type=code` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;
  console.log("link: ", link);
});
</script>

<template>
  <a class="button primary" :href="link">Connect with Strava</a>
</template>
