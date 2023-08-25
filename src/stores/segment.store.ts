import * as L from "leaflet";
import { defineStore } from "pinia";
import { ref } from "vue";
import { DetailedSegment } from "../interfaces/DetailedSegment";
import { stravaApi } from "../strava.api";
import { merge } from "../utils/merge";
import { getAllSegmentFromCache } from "../utils/segments";
import { byRemainingEffort } from "../utils/sort";

export const useSegmentStore = defineStore("segment", () => {
  const isCapturing = ref(false);
  const segments = ref<DetailedSegment[]>([]);
  const selectedSegmentId = ref<number | undefined>(undefined);

  (async () => {
    segments.value = (await getAllSegmentFromCache()).sort(byRemainingEffort);
  })();

  const refresh = async (options: { bounds: L.LatLngBounds }) => {
    console.log("options: ", options);
    const newSegments: DetailedSegment[] = await stravaApi.getSegments(
      options.bounds
    );
    segments.value = merge(newSegments, segments.value).sort(byRemainingEffort);
  };

  const select = (s: DetailedSegment) => {
    if (selectedSegmentId.value === s.id) {
      selectedSegmentId.value = undefined;
      return;
    }
    selectedSegmentId.value = s.id;
  };

  return {
    isCapturing,
    segments,
    selectedSegmentId,
    refresh,
    select,
  };
});
