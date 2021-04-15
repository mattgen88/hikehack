<template>
<div>
  <div style="height: 80vh">
    <LMap  @ready="onReady" :zoom="zoom" :center="center" ref="map">
      <l-tile-layer :url="url" :attribution="attribution" />
      <LGpx :v-if="loaded" :gpx-file="trail" :visible="gpxVisible" @gpx-loaded="onGpxLoaded" :gpx-options="gpxOptions" />
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
      loaded: false,
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
    onReady () {
      this.loaded=true;
    },
    onGpxLoaded(loadedEvent) {
      const { mapObject } = this.$refs.map;
      const gpxMapObject = loadedEvent.target;
      mapObject.fitBounds(gpxMapObject.getBounds());
      this.gpxVisible = true;
    }
  },
  created() {
    const api_uri = process.env.server || "https://hikehack-backend.herokuapp.com";
    const url = api_uri+"/trails/"+this.$attrs.map;
    this.trail = url;
  }
};
</script>
