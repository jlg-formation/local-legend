<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useApiStore } from "../../stores/api.store";
import { isCliendIdValid, isClientSecretValid } from "../../utils/valid";
import FooterLayout from "../layout/FooterLayout.vue";
import HeaderLayout from "../layout/HeaderLayout.vue";
import { HOME_NAMEROUTE } from "./config";

const apiStore = useApiStore();
const router = useRouter();

const fields = reactive({
  clientId: apiStore.clientId,
  clientSecret: apiStore.clientSecret,
});

const isValid = computed(() => {
  return (
    isCliendIdValid(fields.clientId) && isClientSecretValid(fields.clientSecret)
  );
});

const submit = () => {
  apiStore.update(fields.clientId, fields.clientSecret);
  window.alert("update successfull! 😀");
  router.push({ name: HOME_NAMEROUTE });
};
</script>

<template>
  <HeaderLayout />
  <main>
    <h1>Strava API</h1>
    <form @submit.prevent="submit">
      <label>
        <span>Strava API Client ID</span>
        <input type="text" v-model="fields.clientId" />
      </label>
      <label>
        <span>Strava API Client Secret</span>
        <input type="text" v-model="fields.clientSecret" />
      </label>
      <button class="primary" :disabled="!isValid">Update</button>
    </form>
  </main>
  <FooterLayout />
</template>
