<script setup lang="ts">
import { useUserStore } from "../stores/user.store";

const userStore = useUserStore();
</script>

<template>
  <div class="round-button" v-if="userStore.isAuthenticated">
    {{ userStore.athlete?.lastname }}
  </div>
  <div class="round-button" v-else>
    <font-awesome-icon icon="right-to-bracket" />
  </div>
</template>

<style lang="scss" scoped>
.round-button {
  border-radius: 100%;
  background: #ddd;
  height: 2.5em;
  width: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #ccc;
  }
  &:active {
    background: #bbb;
  }
}
</style>
