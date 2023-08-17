import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const code = ref<string | undefined>(undefined);
  const signin = (newCode: string) => {
    code.value = newCode;
  };
  const signout = () => {
    code.value = undefined;
  };
  const isAuthenticated = computed(() => code !== undefined);

  return { code, isAuthenticated, signin, signout };
});
