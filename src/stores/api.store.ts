import { defineStore } from "pinia";
import { ref } from "vue";
import { getDefaultClientSecret } from "../utils/secret";

export const useApiStore = defineStore("api", () => {
  const clientId = ref("");
  const clientSecret = ref("");

  const getClientId = (): string => {
    if (clientId.value !== "") {
      return clientId.value;
    }
    return "97719";
  };

  const getClientSecret = async (): Promise<string> => {
    if (clientSecret.value !== "") {
      return clientSecret.value;
    }
    return await getDefaultClientSecret();
  };

  const update = (newClientId: string, newClientSecret: string) => {
    clientId.value = newClientId;
    clientSecret.value = newClientSecret;
  };

  return {
    clientId,
    clientSecret,
    update,
    getClientSecret,
    getClientId,
  };
});
