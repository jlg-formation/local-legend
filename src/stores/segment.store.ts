import * as L from "leaflet";
import { defineStore } from "pinia";
import { ref } from "vue";
import { DetailedSegment } from "../interfaces/DetailedSegment";
import { stravaApi } from "../strava.api";
import { merge } from "../utils/merge";
import { getAllSegmentFromCache } from "../utils/segments";

export const useSegmentStore = defineStore("segment", () => {
  const isCapturing = ref(false);
  const segments = ref<DetailedSegment[]>(getAllSegmentFromCache());
  const selectedSegmentId = ref<number | undefined>(undefined);

  const refresh = async (options: { bounds: L.LatLngBounds }) => {
    console.log("options: ", options);
    const newSegments: DetailedSegment[] = await stravaApi.getSegments(
      options.bounds
    );
    segments.value = merge(newSegments, segments.value);
  };
  return {
    isCapturing,
    segments,
    selectedSegmentId,
    refresh,
  };
});
