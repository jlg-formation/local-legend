import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { TokenObject } from "../interfaces/TokenObject";
import { stravaApi } from "../strava.api";

export const useUserStore = defineStore("user", () => {
  const tokenObject = ref<TokenObject | undefined>(undefined);

  const signin = async (authorizationCode: string) => {
    console.log("signin with newCode", authorizationCode);

    const newTokenObject = await stravaApi.getTokenObject(authorizationCode);
    console.log("newTokenObject: ", newTokenObject);

    tokenObject.value = newTokenObject;
    stravaApi.tokenObject = newTokenObject;
  };
  const signout = () => {
    tokenObject.value = undefined;
    stravaApi.tokenObject = undefined;
  };

  const isAuthenticated = computed(() => {
    console.log("isAuthenticated");

    console.log("code.value : ", tokenObject.value);
    return tokenObject.value !== undefined;
  });

  return {
    tokenObject,
    isAuthenticated,
    signin,
    signout,
  };
});
