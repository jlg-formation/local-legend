<script setup lang="ts">
import FooterLayout from "../layout/FooterLayout.vue";
import HeaderLayout from "../layout/HeaderLayout.vue";
</script>

<template>
  <HeaderLayout />
  <main>
    <h1>Strava API</h1>
    <form>
      <label>
        <span>Strava API Client ID</span>
        <input type="text" />
      </label>
      <label>
        <span>Strava API Client Secret</span>
        <input type="text" />
      </label>
      <button class="primary">Update</button>
    </form>
  </main>
  <FooterLayout />
</template>
