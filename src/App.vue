<script setup lang="ts">
import HeaderLayout from "./components/layout/HeaderLayout.vue";
import FooterLayout from "./components/layout/FooterLayout.vue";
</script>

<template>
  <div class="layout">
    <HeaderLayout />
    <main>
      <button>Connect with Strava</button>
    </main>
    <FooterLayout />
  </div>
</template>

<style scoped>
div.layout {
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
</style>
