<script setup lang="ts"></script>

<template>
  <div class="layout">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
div.layout {
  height: 100svh;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
</style>
