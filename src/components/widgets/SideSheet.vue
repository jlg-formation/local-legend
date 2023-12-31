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
      <div class="side-sheet-header">
        <button @click="toggle">
          <font-awesome-icon :icon="isOpen ? 'xmark' : 'angle-right'" />
        </button>
        <div class="side-sheet-title">
          <slot name="title"></slot>
        </div>
      </div>
      <slot></slot>
      <div class="side-sheet-footer">
        <RouterLink to="/legal">Legal info - Powered by Strava</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media only screen and (max-width: 600px) {
  .sidesheet {
    position: fixed;
    top: 3em;
    left: 0;
    width: 100vw;
    height: calc(100vh - 3em);
    overflow: hidden;
    z-index: 1;
    pointer-events: none;
  }

  .sidesheet-button {
    position: absolute;
    top: 0.25em;
    left: 0.25em;
    pointer-events: auto;

    button {
      border-radius: 100%;
      border: 0;
      width: 2.5em;
      height: 2.5em;
      background: white;
    }
  }

  .sidesheet-panel {
    position: absolute;
    top: 0em;
    left: 0em;
    width: 0;
    height: 100%;
    padding: 0;
    pointer-events: auto;
    background: white;
    overflow: hidden;
    transition: width 100ms;

    border-radius: 0 0.5em 0.5em 0;

    display: flex;
    flex-flow: column;

    &.open {
      width: 20em;
      max-width: calc(100% - 4em);
    }

    .side-sheet-header {
      height: 3em;
      width: 100%;
      display: flex;
      align-items: start;

      button {
        position: relative;
        top: 0.25em;
        left: 0.25em;
        border-radius: 100%;
        border: 0;
        width: 2.5em;
        height: 2.5em;
        background: white;
      }

      .side-sheet-title {
        flex: 1;
        height: 3em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }

    .side-sheet-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5em;
    }
  }
}

@media only screen and (min-width: 600px) {
  .sidesheet {
    width: 20em;
    height: calc(100vh - 3em);
    overflow: hidden;
    display: flex;
  }

  .sidesheet-button {
    display: none;
  }

  .sidesheet-panel {
    height: 100%;
    width: 100%;
    padding: 0;
    pointer-events: auto;
    background: white;
    overflow: hidden;
    transition: width 100ms;

    display: flex;
    flex-flow: column;

    .side-sheet-header {
      height: 3em;
      width: 100%;
      display: flex;
      align-items: start;

      button {
        display: none;
      }

      .side-sheet-title {
        flex: 1;
        height: 3em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
    }

    .side-sheet-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5em;
    }
  }
}
</style>
