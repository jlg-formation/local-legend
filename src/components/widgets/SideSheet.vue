<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="sidesheet">
    <div class="sidesheet-button">
      <button @click="toggle">
        <font-awesome-icon :icon="isOpen ? 'xmark' : 'angle-right'" />
      </button>
    </div>
    <div class="sidesheet-panel" :class="{ open: isOpen }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidesheet {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.sidesheet-button {
  position: fixed;
  top: 4em;
  right: 0.5em;
  pointer-events: auto;

  button {
    border-radius: 100%;
    width: 3em;
    height: 3em;
    background: #ccc;
  }
}

.sidesheet-panel {
  position: fixed;
  top: 0em;
  left: 0em;
  width: 0;
  height: 100%;
  pointer-events: auto;
  background: white;
  overflow: hidden;
  transition: width 100ms;

  display: flex;

  &.open {
    width: 20em;
    max-width: calc(100% - 4em);
  }
}
</style>
