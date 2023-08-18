<script setup lang="ts">
import * as L from "leaflet";
import { onMounted, ref } from "vue";
import { getInitialLocation } from "../utils/location";
import SideSheet from "./widgets/SideSheet.vue";
import SegmentList from "./SegmentList.vue";
import SegmentConfig from "./SegmentConfig.vue";
import { useSegmentStore } from "../stores/segment.store";

const mapElement = ref<HTMLElement | null>(null);

const segmentStore = useSegmentStore();

onMounted(async () => {
  const location = await getInitialLocation();
  if (mapElement.value === null) {
    throw new Error("Cannot find the map Element");
  }
  const map = L.map(mapElement.value, { zoomControl: false }).setView(
    location,
    13
  );

  L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 20,
      attribution: "",
    }
  ).addTo(map);

  L.control.scale({ imperial: false }).addTo(map);

  map.on("moveend", async () => {
    console.log("move");
    if (!segmentStore.isCapturing) {
      return;
    }
    segmentStore.refresh({
      bounds: map.getBounds(),
    });
  });
});
</script>

<template>
  <div class="segment-map">
    <div class="wrapper">
      <div class="map" ref="mapElement"></div>
    </div>

    <SideSheet>
      <div class="content">
        <SegmentConfig />
        <SegmentList />
      </div>
    </SideSheet>
  </div>
</template>

<style scoped lang="scss">
div.segment-map {
  flex: 1;
  display: flex;
  height: 100%;
  width: 100%;
}
.wrapper {
  flex: 1;
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 0;

  .map {
    flex: 1;
    width: 100%;
    height: 100;
  }
}

.content {
  flex: 1;
  display: flex;
  flex-flow: column;
}
</style>
