<script setup lang="ts">
import { useQuotaStore } from "../stores/quota.store";
import { useSegmentStore } from "../stores/segment.store";
import { appCache } from "../utils/cache";

const segmentStore = useSegmentStore();
const quotaStore = useQuotaStore();

const reset = async () => {
  await appCache.clearCache();
  window.location.reload();
};
</script>

<template>
  <div class="config">
    <label>
      <span>Capturing segment</span>
      <input type="checkbox" v-model="segmentStore.isCapturing" />
    </label>
    <div class="quota" :class="{ exceeded: quotaStore.isExeeded }">
      <span>{{
        quotaStore.isExeeded ? "Quota Exceeded... 😫" : "Quota fine 😊"
      }}</span>
    </div>
    <div class="button">
      <button @click="reset">Clear Cache and Refresh</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.config {
  display: flex;
  flex-flow: column;

  label {
    cursor: pointer;
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5em;

    input[type="checkbox"] {
      transform: scale(2) translateX(-0.2em);
    }
  }

  div.quota {
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5em;
    background: hsl(120, 100%, 97%);

    &.exceeded {
      background: hsl(0, 100%, 97%);
    }
  }

  div.button {
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
