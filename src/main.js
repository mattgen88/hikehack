import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import VueSidebarMenu from 'vue-sidebar-menu'
require('leaflet-gpx/gpx.js');
import '@/assets/style.css';
Vue.use(VueSidebarMenu)

delete Icon.Default.prototype._getIconUrl;


Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  startIconUrl: require("leaflet/dist/images/marker-icon.png"),
  endIconUrl: require("leaflet/dist/images/marker-icon.png")
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
