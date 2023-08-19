<script setup lang="ts">
import polyline from "@mapbox/polyline";
import * as L from "leaflet";
import { onMounted, ref } from "vue";
import { DetailedSegment } from "../interfaces/DetailedSegment";
import { useSegmentStore } from "../stores/segment.store";
import { appCache } from "../utils/cache";
import { getInitialLocation } from "../utils/location";
import { scrollToSegment } from "../utils/scroll";
import { SEGMENT_PREFIX } from "../utils/segments";
import SegmentConfig from "./SegmentConfig.vue";
import SegmentList from "./SegmentList.vue";
import SideSheet from "./widgets/SideSheet.vue";

const mapElement = ref<HTMLElement | null>(null);

const segmentStore = useSegmentStore();

const group = L.layerGroup([]);

const redraw = () => {
  console.log("start redraw");

  group.clearLayers();

  for (const s of segmentStore.segments) {
    let color = "hsla(0, 0%, 70%, 1)";
    if (
      segmentStore.selectedSegmentId !== undefined &&
      segmentStore.selectedSegmentId === s.id
    ) {
      color = "hsla(120, 100%, 25%, 1)";
    }
    if (segmentStore.selectedSegmentId === undefined) {
      color = "hsla(120, 100%, 25%, 1)";
    }

    const segmentPolyline = polyline.decode(s.map.polyline);
    const visiblePolyline = L.polyline(segmentPolyline, { color: color });
    const clickablePolyline = L.polyline(segmentPolyline, {
      color: "transparent",
      weight: 20,
    });
    clickablePolyline.on("click", (...args) => {
      console.log("polyline click args: ", args);
      segmentStore.select(s);
      scrollToSegment(s.id);
    });
    group.addLayer(visiblePolyline);
    group.addLayer(clickablePolyline);
  }
  console.log("end redraw");
};

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

  group.addTo(map);

  L.control.scale({ imperial: false }).addTo(map);

  redraw();

  map.on("moveend", async () => {
    console.log("move");
    if (!segmentStore.isCapturing) {
      return;
    }
    if (segmentStore.selectedSegmentId !== undefined) {
      return;
    }
    try {
      await segmentStore.refresh({
        bounds: map.getBounds(),
      });
    } catch (err) {
      console.log("err: ", err);
    } finally {
      redraw();
    }
  });

  segmentStore.$subscribe((mutation, state) => {
    console.log("state: ", state);
    console.log("mutation: ", mutation);
    console.log("state.selectedSegmentId: ", state.selectedSegmentId);
    const selectedSegment = appCache.get<DetailedSegment>(
      SEGMENT_PREFIX + state.selectedSegmentId
    );
    if (selectedSegment === undefined) {
      return;
    }
    map.setView(selectedSegment.start_latlng);
    redraw();
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
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: 5em;
}
</style>
