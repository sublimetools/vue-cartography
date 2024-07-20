# VueCartography

Create d3.js maps easily in Vue with `VueCartography`.

## Install

```npm install vue-cartography```

## How to use

Example of use:

```vue
<template>
  <Geographies
    geography="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    width="800"
    height="600"
    v-slot="{geographies}"
  >
    <Geography 
      v-for="geography in geographies"
      :geography="geography" 
      fill="white"
      stroke="black" />
  </Geographies>
</template>
```

## Components and their params

### Geographies

`geography`: Specify path to TopoJSON file

`projection`: One of the projections of D3 Geo (https://d3js.org/d3-geo/projection):
* geoAzimuthalEqualArea
* geoAzimuthalEquidistant
* geoGnomonic
* geoOrthographic
* geoStereographic
* geoConicConformal
* geoConicEqualArea
* geoConicEquidistant
* geoAlbers
* geoAlbersUsa
* geoEquirectangular
* geoMercator
* geoTransverseMercator
* geoEqualEarth
* geoNaturalEarth1

`width`: SVG width

`height`: SVG height

`scale`: Map zoom. Zoom in with lower values and zoom out with higher values

`filter`: Check if properties.name matches the filter [Experimental]

### Geography

You can style this component as you wish, however it needs one parameter:

`geography`: Provided by Geographies component, see example
