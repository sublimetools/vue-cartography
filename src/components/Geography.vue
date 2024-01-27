<template>
  <svg id="map" :width="width" :height="height"></svg>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as d3 from 'd3';

const props = defineProps({
  geography: { // topojson file
    type: String,
    required: true
  },
  width: {
    type: [String, Number],
    required: true
  },
  height: {
    type: [String, Number],
    required: true
  },
  scale: {
    type: [String, Number],
    default: 1.5
  },
  filter: {
    type: String
  },
  fill: {
    type: String,
    default: "white"
  },
  stroke: {
    type: String,
    default: "black"
  },
});

onMounted(() => {
  const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
  
  // Map and projection
  const projection = d3.geoNaturalEarth1()
    .center([12, 0]) // GPS of location to zoom on
    .scale(width / +props.scale / Math.PI) // Zoom
    .translate([width / 2, height / 2]);
  
  // Load external data and boot
  d3.json(props.geography).then(function(data: any) {
    // Filter data
    if (props.filter) {
      data.features = data.features.filter((d: any) => { console.log(typeof d); return d.properties.name == props.filter });
    }

    const pathGenerator = d3.geoPath().projection(projection);

    // Draw the map
    svg.append("g")
      .selectAll("path")
      .data(data.features)
      .join("path")
      .attr("fill", props.fill)
      .attr("d", (d: any) => pathGenerator(d))
      .style("stroke", props.stroke);
  });
})
</script>