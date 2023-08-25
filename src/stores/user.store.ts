import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { TokenObject } from "../interfaces/TokenObject";
import { stravaApi } from "../strava.api";
import { appCache } from "../utils/cache";

export const useUserStore = defineStore("user", () => {
  const tokenObject = ref<TokenObject | undefined>(undefined);

  (async () => {
    tokenObject.value = await appCache.get<TokenObject>("tokenObject");
    stravaApi.tokenObject = tokenObject.value;
  })();

  const signin = async (authorizationCode: string) => {
    console.log("signin with newCode", authorizationCode);

    const newTokenObject = await stravaApi.getTokenObject(authorizationCode);
    console.log("newTokenObject: ", newTokenObject);

    tokenObject.value = newTokenObject;
    stravaApi.tokenObject = newTokenObject;
    await appCache.set<TokenObject>("tokenObject", newTokenObject);
  };

  const signout = async () => {
    tokenObject.value = undefined;
    stravaApi.tokenObject = undefined;
    await appCache.remove("tokenObject");
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
