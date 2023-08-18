import { defineStore } from "pinia";
import { ref } from "vue";
import * as L from "leaflet";
import { stravaApi } from "../strava.api";
import { DetailedSegment } from "@/interfaces/DetailedSegment";
import { merge } from "../utils/segments";

export const useSegmentStore = defineStore("segment", () => {
  const isCapturing = ref(false);
  const segments = ref<DetailedSegment[]>([]);

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
    refresh,
  };
});
