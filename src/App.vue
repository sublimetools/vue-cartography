<script setup lang="ts">
import Geography from './components/Geography.vue'
//import Geography from 'vuemaps'
</script>

<template>
  <Geography 
    geography="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson" 
    width="800"
    height="600"
    stroke="gray"
  />
</template>
