<script setup lang="ts">
import { ref } from "vue";
import FooterLayout from "../layout/FooterLayout.vue";
import HeaderLayout from "../layout/HeaderLayout.vue";
import { useApiStore } from "../../stores/api.store";
import { useRouter } from "vue-router";
import { HOME_NAMEROUTE } from "./config";

const apiStore = useApiStore();
const router = useRouter();

const clientId = ref(apiStore.clientId);
const clientSecret = ref(apiStore.clientSecret);

const submit = () => {
  apiStore.update(clientId.value, clientSecret.value);
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
        <input type="text" v-model="clientId" />
      </label>
      <label>
        <span>Strava API Client Secret</span>
        <input type="text" v-model="clientSecret" />
      </label>
      <button class="primary">Update</button>
    </form>
  </main>
  <FooterLayout />
</template>
