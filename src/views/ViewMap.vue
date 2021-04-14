<template>
  <div class="maps">
    <Map v-bind:map="this.$route.params.map" />
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'

export default {
  name: 'ViewMap',
  components: {
    Map
  }
}
</script>
