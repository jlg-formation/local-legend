<script setup lang="ts">
import HeaderLayout from "../layout/HeaderLayout.vue";
import FooterLayout from "../layout/FooterLayout.vue";
</script>

<template>
  <HeaderLayout />
  <main>
    <h1>Legal Information</h1>
    <p>
      This application is developed by
      <a href="https://github.com/jlguenego">Jean-Louis GUENEGO</a> for personal
      purposes and Front-end demonstration during the JLG Formation session
      courses. <b>It is not developed by Strava</b>.
    </p>
    <p>
      This application is using the Strava Developer API, thanks to
      <a href="https://strava.com">Strava</a> and all other open source
      libraries used in this project. See the
      <a href="https://github.com/jlg-formation/local-legend">source code</a>
      and package.json for a list.
    </p>
    <p>
      Cartography tools: &copy;
      <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy;
      <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy;
      <a href="http://openstreetmap.org">OpenStreetMap</a> contributors
    </p>
  </main>
  <FooterLayout />
</template>

<style scoped lang="scss">
main {
  width: 100%;
  max-width: 50em;
  margin: 0 auto;
}
</style>
