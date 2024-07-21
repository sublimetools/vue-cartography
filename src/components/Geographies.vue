<template>
  <svg :width="width" :height="height">
    <g>
      <slot :geographies="geographies"></slot>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import * as d3 from 'd3';

const projections = {
  'geoAzimuthalEqualArea': d3.geoAzimuthalEqualArea,
  'geoAzimuthalEquidistant': d3.geoAzimuthalEquidistant,
  'geoGnomonic': d3.geoGnomonic,
  'geoOrthographic': d3.geoOrthographic,
  'geoStereographic': d3.geoStereographic,
  'geoConicConformal': d3.geoConicConformal,
  'geoConicEqualArea': d3.geoConicEqualArea,
  'geoConicEquidistant': d3.geoConicEquidistant,
  'geoAlbers': d3.geoAlbers,
  'geoAlbersUsa': d3.geoAlbersUsa,
  'geoEquirectangular': d3.geoEquirectangular,
  'geoMercator': d3.geoMercator,
  'geoTransverseMercator': d3.geoTransverseMercator,
  'geoEqualEarth': d3.geoEqualEarth,
  'geoNaturalEarth1': d3.geoNaturalEarth1
}

type ProjectionName = keyof typeof projections;
type NumberPair = [number, number];

const props = defineProps({
  geography: { // topojson file
    type: String,
    required: true
  },
  projection: {
    type: String as () => ProjectionName,
    default: 'geoNaturalEarth1'
  },
  width: {
    type: [String, Number],
    required: true
  },
  height: {
    type: [String, Number],
    required: true
  },
  center: {
    type: String,
    default: [13, 50]
  },
  scale: {
    type: [String, Number],
    default: 1.5
  },
  filter: {
    type: String
  }
});

const parsedCenter = computed(() => {
  // Remove brackets and split by comma
  const cleanedString = props.center.replace(/[\[\]\s]/g, '');
  const posArray = cleanedString.split(',').map(Number);
  
  // Ensure it has exactly two elements and both are numbers
  if (posArray.length !== 2 || posArray.some(isNaN)) {
    throw new Error('Invalid position format');
  }

  return posArray as [number, number];
});

const geographies = ref([]);

const loadMap = () => {
  const svg = d3.select('svg'),
    width = +svg.attr('width'),
    height = +svg.attr('height');
  
  // Map and projection
  const projection = projections[props.projection]()
    .center(parsedCenter.value) // GPS of location to zoom on
    .scale(width / +props.scale / Math.PI) // Zoom
    .translate([width / 2, height / 2]);
  
  // Load external data and boot
  d3.json(props.geography).then(function(data: any) {
    // Filter data
    if (props.filter) {
      data.features = data.features.filter((d: any) => { return d.properties.name == props.filter });
    }

    const pathGenerator = d3.geoPath().projection(projection);
    geographies.value = data.features.map((d: any) => {
      d.path = pathGenerator(d);
      return d;
    });
  });
}

onMounted(() => {
  loadMap();
})
</script>