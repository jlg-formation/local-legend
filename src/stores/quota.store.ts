import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuotaStore = defineStore("quota", () => {
  const isExeeded = ref(false);

  return {
    isExeeded,
  };
});
