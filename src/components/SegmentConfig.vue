<script setup lang="ts">
import { useSegmentStore } from "../stores/segment.store";

const segmentStore = useSegmentStore();
</script>

<template>
  <label>
    <span>Capturing segment</span>
    <input type="checkbox" v-model="segmentStore.isCapturing" />
  </label>
</template>

<style scoped lang="scss">
label {
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;

  input[type="checkbox"] {
    transform: scale(2) translateX(-0.5em);
  }
}
</style>
