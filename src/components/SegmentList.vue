<script lang="ts" setup>
import { DetailedSegment } from "../interfaces/DetailedSegment";
import { useSegmentStore } from "../stores/segment.store";
import { remainingEffort } from "../utils/efforts";
import { capitalizeFirstLetter } from "../utils/strings";

const segmentStore = useSegmentStore();

const selectSegment = (s: DetailedSegment) => {
  console.log("s: ", s);
};
</script>

<template>
  <p>Segment List</p>
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
