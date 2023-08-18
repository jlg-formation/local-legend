<script setup lang="ts">
import { useSegmentStore } from "../stores/segment.store";

const segmentStore = useSegmentStore();
</script>

<template>
  <label>
    <span>Capturing segment</span>
    <input type="checkbox" v-model="segmentStore.isCapturing" />
  </label>
  <div class="info">
    <span>Limit (15 min)</span>
    <span>2 / 100</span>
  </div>
  <div class="info">
    <span>Limit (1 day)</span>
    <span>2 / 1000</span>
  </div>
</template>

<style scoped lang="scss">
label {
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;

  input[type="checkbox"] {
    transform: scale(2) translateX(-0.2em);
  }
}

div.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;
}
</style>
