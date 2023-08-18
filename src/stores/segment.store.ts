import { defineStore } from "pinia";
import { ref } from "vue";

export const useSegmentStore = defineStore("segment", () => {
  const isCapturing = ref(false);
  return {
    isCapturing,
  };
});
