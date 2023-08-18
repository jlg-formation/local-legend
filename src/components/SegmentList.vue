<script lang="ts" setup>
import { DetailedSegment } from "../interfaces/DetailedSegment";
import { useSegmentStore } from "../stores/segment.store";
import { remainingEffort } from "../utils/efforts";
import { capitalizeFirstLetter } from "../utils/strings";

const segmentStore = useSegmentStore();

const selectSegment = (s: DetailedSegment) => {
  console.log("s: ", s);
  segmentStore.select(s);
};
</script>

<template>
  <div class="list">
    <div
      class="segment"
      v-for="s in segmentStore.segments"
      :key="s.id"
      @click="selectSegment(s)"
      :class="{ selected: s.id === segmentStore.selectedSegmentId }"
      :id="'segment-' + s.id"
    >
      <div class="first">
        <div class="name">{{ capitalizeFirstLetter(s.name) }}</div>
        <div class="legend" v-if="s.local_legend">
          Légende : {{ s.local_legend?.title }} ({{
            (+s.local_legend?.effort_count).toLocaleString("fr-FR")
          }}
          x {{ s.distance.toLocaleString("fr-FR") }} m)
        </div>
        <div class="legend" v-else>
          Pas de Légende : (0 x
          {{ s.distance.toLocaleString("fr-FR") }} m)
        </div>
      </div>
      <div class="second">
        <div class="label">Effort à faire :</div>
        <div class="value">
          {{ remainingEffort(s).toLocaleString("fr-FR") }}
          m
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.list {
  flex: 1;
  display: flex;
  flex-flow: column;
  cursor: pointer;

  .segment {
    padding: 0;
    display: flex;
    gap: 0.5em;
    &:nth-child(odd) {
      background: hsl(120, 0%, 95%);
    }

    &:hover {
      background: hsl(120, 0%, 90%);
    }

    &.selected {
      z-index: 1;
      box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
      background-color: hsla(120, 100%, 10%, 0.2);
      border-color: black;
    }

    .first {
      padding: 0.5em;
      flex: 1;
      display: flex;
      flex-flow: column;

      .name {
        font-weight: bold;
      }

      .legend {
        font-size: 0.8em;
      }
    }

    .second {
      padding: 0.25em;
      margin: 0.25em;
      border: 0.01em solid hsl(120, 100%, 20%);
      width: 6em;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;

      .label {
        font-size: 0.7em;
        white-space: nowrap;
      }

      .value {
        font-weight: bold;
        color: hsl(120, 100%, 20%);
      }
    }
  }
}
</style>
