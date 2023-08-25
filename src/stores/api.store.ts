import { defineStore } from "pinia";
import { ref } from "vue";
import { getDefaultClientSecret } from "../utils/secret";
import { appCache } from "../utils/cache";

export const useApiStore = defineStore("api", () => {
  const clientId = ref("");
  const clientSecret = ref("");

  (async () => {
    clientId.value = await appCache.getOrDefault("clientId", "");
    clientSecret.value = await appCache.getOrDefault("clientSecret", "");
  })();

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

  const update = async (
    newClientId: string,
    newClientSecret: string
  ): Promise<void> => {
    clientId.value = newClientId;
    clientSecret.value = newClientSecret;
    await appCache.set("clientId", newClientId);
    await appCache.set("clientSecret", newClientSecret);
  };

  return {
    clientId,
    clientSecret,
    update,
    getClientSecret,
    getClientId,
  };
});
