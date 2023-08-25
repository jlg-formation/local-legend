<script setup lang="ts">
import { useApiStore } from "../../stores/api.store";

console.log("window.location.origin: ", window.location.origin);
const redirectUri = `${window.location.origin}/#/exchange_token`;
const stravaUri = "http://www.strava.com/oauth/authorize";

const apiStore = useApiStore();

const link =
  `${stravaUri}?client_id=${apiStore.getClientId()}&approval_prompt=force&scope=read&response_type=code` +
  `&redirect_uri=${encodeURIComponent(redirectUri)}`;
console.log("link: ", link);
</script>

<template>
  <a class="button primary" :href="link">Connect with Strava</a>
</template>
