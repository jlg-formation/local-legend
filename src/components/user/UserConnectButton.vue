<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useApiStore } from "../../stores/api.store";

const link = ref("");

onMounted(async () => {
  console.log("window.location.origin: ", window.location.origin);
  console.log("BASE_URL:", import.meta.env.BASE_URL);
  const url = window.location.origin + import.meta.env.BASE_URL;
  const redirectUri = `${url}#/exchange_token`;
  const stravaUri = "http://www.strava.com/oauth/authorize";

  const apiStore = useApiStore();
  const clientId = apiStore.getClientId();

  link.value =
    `${stravaUri}?client_id=${clientId}&approval_prompt=force&scope=read&response_type=code` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;
  console.log("link: ", link);
});
</script>

<template>
  <a :href="link" title="Connect with Strava">
    <img src="/btn_strava_connectwith_orange.svg" alt="Connect with Strava" />
  </a>
</template>
