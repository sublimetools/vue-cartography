<script setup lang="ts">
import Geographies from './components/Geographies.vue'
import Geography from './components/Geography.vue'
</script>

<template>
  <Geographies
    geography="https://raw.githubusercontent.com/sublimetools/vue-cartography/main/src/assets/world.geojson"
    width="800"
    height="600"
    scale="1.5"
    center="[12, 0]"
    v-slot="{geographies}"
  >
    <Geography 
      v-for="geography in geographies"
      :geography="geography" 
      fill="white"
      stroke="black" />
  </Geographies>
</template>
