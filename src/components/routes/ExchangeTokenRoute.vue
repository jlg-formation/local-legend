<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user.store";
import { AuthenticationError } from "../../errors/errors";

const router = useRouter();

const message = ref("");

onMounted(async () => {
  try {
    console.log("mounted");

    const hash = window.location.hash;
    const queryString = hash.replace(/^.*\?/, "");
    const params = new URLSearchParams(queryString);
    const error = params.get("error");
    if (error !== null) {
      router.replace({ name: "Signin" });
      return;
    }
    const code = params.get("code");
    if (code === null) {
      throw new Error("code is null");
    }
    console.log("code: ", code);

    const userStore = useUserStore();
    await userStore.signin(code);
  } catch (err) {
    if (err instanceof AuthenticationError) {
      message.value = "Bad authentication";
      router.replace({ name: "Signin" });
      return;
    }
    throw err;
  }
  message.value = "Yes you did it.";

  router.replace({ name: "Home" });
});
</script>

<template>
  <main>{{ message }}</main>
</template>
