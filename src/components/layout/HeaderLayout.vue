<script setup lang="ts">
import UserButton from "../UserButton.vue";
</script>

<template>
  <header>
    <router-link to="/">
      <img src="/logo.svg" alt="Local Legend" />
      <span>Local Legend</span>
    </router-link>
    <UserButton />
  </header>
</template>

<style lang="scss" scoped>
header {
  background: #eee;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;

  a {
    text-decoration: inherit;
    color: inherit;

    img {
      height: 2.5em;
    }

    span {
      font-weight: bold;
      font-size: 1.3em;
    }
  }
}
</style>
