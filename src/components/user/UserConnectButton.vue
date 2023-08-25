<script setup lang="ts">
console.log("window.location.origin: ", window.location.origin);
const redirectUri = `${window.location.origin}/#/exchange_token`;
const stravaUri = "http://www.strava.com/oauth/authorize";

const link =
  `${stravaUri}?client_id=97719&approval_prompt=force&scope=read&response_type=code` +
  `&redirect_uri=${encodeURIComponent(redirectUri)}`;
console.log("link: ", link);
</script>

<template>
  <a class="button primary" :href="link">Connect with Strava</a>
</template>
