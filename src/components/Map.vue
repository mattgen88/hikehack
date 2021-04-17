<template>
  <div>
    <div style="height: 80vh">
      <LMap  @ready="onReady" :zoom="zoom" :center="center" @locationfound="onLocationFound" ref="lmap">
        <l-tile-layer :url="url" :attribution="attribution" />
        <LGpx v-if="loaded && !!map" :gpx-file="trail" :visible="gpxVisible" @gpx-loaded="onGpxLoaded" :gpx-options="gpxOptions" />
        <LMarker v-if="loaded && location" :lat-lng="location" />
      </LMap>
    </div>
  </div>
</template>

<script>
// import L from 'leaflet';
import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
import LGpx from '@/components/LGpx.vue'

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LGpx,
    LMarker
  },
  props: {
    map: Number || String
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 13,
      center: [42.89,-78.85],
      gpxVisible: false,
      trail: null,
      loaded: false,
      location: false,
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
      this.$refs.lmap.mapObject.locate();
    },
    onLocationFound(location) {
      if (!this.$props.map) {
        this.$refs.lmap.mapObject.setView(location.latlng);
        this.location = location.latlng;
      }
    },
    onGpxLoaded(loadedEvent) {
      const { mapObject } = this.$refs.lmap;
      const gpxMapObject = loadedEvent.target;
      mapObject.fitBounds(gpxMapObject.getBounds());
      this.gpxVisible = true;
    }
  },
  created() {
    const api_uri = process.env.server || "https://hikehack-backend.herokuapp.com";
    const url = api_uri+"/trails/"+this.$props.map;
    this.trail = url;
  }
};
</script>
