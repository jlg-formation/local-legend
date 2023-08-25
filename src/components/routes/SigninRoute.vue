<script setup lang="ts">
import FooterLayout from "../layout/FooterLayout.vue";
import HeaderLayout from "../layout/HeaderLayout.vue";
import UserConnectButton from "../user/UserConnectButton.vue";
</script>

<template>
  <HeaderLayout />
  <main>
    <UserConnectButton />
    <RouterLink to="/api-key">Set your own Strava API key</RouterLink>
  </main>
  <FooterLayout />
</template>

<style scoped lang="scss">
main {
  gap: 2em;
}
</style>
