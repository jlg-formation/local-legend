<script setup lang="ts">
import FooterLayout from "../layout/FooterLayout.vue";
import HeaderLayout from "../layout/HeaderLayout.vue";
import UserConnectButton from "../user/UserConnectButton.vue";
</script>

<template>
  <HeaderLayout />
  <main>
    <UserConnectButton />
  </main>
  <FooterLayout />
</template>
