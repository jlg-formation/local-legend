import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { TokenObject } from "../interfaces/TokenObject";
import { stravaApi } from "../strava.api";
import { appCache } from "../utils/cache";

export const useUserStore = defineStore("user", () => {
  const tokenObject = ref<TokenObject | undefined>(
    appCache.get<TokenObject>("tokenObject")
  );

  stravaApi.tokenObject = tokenObject.value;

  const signin = async (authorizationCode: string) => {
    console.log("signin with newCode", authorizationCode);

    const newTokenObject = await stravaApi.getTokenObject(authorizationCode);
    console.log("newTokenObject: ", newTokenObject);

    tokenObject.value = newTokenObject;
    stravaApi.tokenObject = newTokenObject;
    appCache.set<TokenObject>("tokenObject", newTokenObject);
  };
  const signout = () => {
    tokenObject.value = undefined;
    stravaApi.tokenObject = undefined;
    appCache.remove("tokenObject");
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
