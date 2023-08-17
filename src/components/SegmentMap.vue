<script setup lang="ts">
import * as L from "leaflet";
import { onMounted, ref } from "vue";
import { getInitialLocation } from "../utils/location";

const mapElement = ref<HTMLElement | null>(null);

onMounted(async () => {
  const location = await getInitialLocation();
  if (mapElement.value === null) {
    throw new Error("Cannot find the map Element");
  }
  const map = L.map(mapElement.value).setView(location, 13);

  L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }
  ).addTo(map);
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
