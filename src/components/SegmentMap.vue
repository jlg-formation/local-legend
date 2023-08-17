<script setup lang="ts">
import * as L from "leaflet";
import { onMounted, ref } from "vue";

const mapElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (mapElement.value === null) {
    throw new Error("Cannot find the map Element");
  }
  const map = L.map(mapElement.value).setView([51.505, -0.09], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
});
</script>

<template>
  <div class="map" ref="mapElement"></div>
</template>

<style scoped lang="scss">
.map {
  flex: 1;
  width: 100%;
  height: 100%;
}
</style>
