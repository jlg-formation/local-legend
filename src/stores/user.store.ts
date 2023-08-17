import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { stravaApi } from "../strava.api";
import { Athlete } from "../interfaces/Athlete";
import { AuthenticationError } from "../errors/errors";

export const useUserStore = defineStore("user", () => {
  const code = ref<string | undefined>(undefined);
  const athlete = ref<Athlete | undefined>(undefined);

  const signin = async (authorizationCode: string) => {
    console.log("signin with newCode", authorizationCode);

    const tokenObject = await stravaApi.getTokenObject(authorizationCode);
    console.log("tokenObject: ", tokenObject);

    code.value = tokenObject.access_token;
    stravaApi.accessCode = tokenObject.access_token;
    await checkConnection();
  };
  const signout = () => {
    code.value = undefined;
    stravaApi.accessCode = "xxx";
  };

  const checkConnection = async () => {
    try {
      athlete.value = await stravaApi.getCurrentAthlete();
      console.log("athlete: ", athlete.value);
    } catch (err) {
      if (err instanceof AuthenticationError) {
        console.log("signout", err);
        signout();
      }
    }
  };

  const isAuthenticated = computed(() => {
    console.log("isAuthenticated");

    console.log("code.value : ", code.value);
    return code.value !== undefined;
  });

  return { code, athlete, isAuthenticated, signin, signout, checkConnection };
});
