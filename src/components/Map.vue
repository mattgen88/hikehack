<template>
<div>
  <div style="height: 80vh">
    <LMap  @ready="onReady" @locationfound="onLocationFound" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution" />
      <LGpx :gpx-file="trail" :visible="gpxVisible" @gpx-loaded="onGpxLoaded" :gpx-options="gpxOptions" />
    </LMap>
  </div>
  <br/>
  <br/>
  </div>
</template>

<script>
// import L from 'leaflet';
import { LMap, LTileLayer } from "vue2-leaflet";
import LGpx from '@/components/LGpx.vue'

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LGpx
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 13,
      center: [42.89,-78.85],
      gpxVisible: false,
      trail: null,
      map: null,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      gpxOptions: {
        async: true,
        marker_options: {
          shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
          startIconUrl: require("leaflet/dist/images/marker-icon.png"),
          endIconUrl: require("leaflet/dist/images/marker-icon.png")
        }
      }
    };
  },
  methods: {
    onReady (mapObject) {
      mapObject.locate({setView: true, maxZoom: 13});
    },
    onLocationFound(location){
      console.log(location);
    },
    onGpxLoaded(loadedEvent) {
      console.debug({loadedEvent});
      this.gpxVisible = true;
      // @TODO: Center on loaded trail start
    }
  },
  created() {
    const api_uri = process.env.server || "http://localhost:8088";
    const url = api_uri+"/trails/"+this.$attrs.map;
    this.trail = url;
  }
};
</script>
