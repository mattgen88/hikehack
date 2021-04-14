<!--
Stolen and modified from https://github.com/tdcook/vue2-leaflet-gpx which wouldn't work when imported
-->
<template>
    <div style="display: none">
        <slot v-if="ready"></slot>
    </div>
</template>

<script>
    import Vue from 'vue';
    import L from 'leaflet';
    import 'leaflet-gpx';
    import { findRealParent } from 'vue2-leaflet';
    const LGpx = Vue.extend({
        props: {
            gpxFile: {
                type: String,
            },
            gpxOptions: {
                type: Object,
                default: () => ({ async: true }),
            },
            visible: {
                type: Boolean,
                default: true,
            },
        },
        watch: {
            visible(newValue) {
                if (newValue) {
                    this.parentContainer.addLayer(this);
                } else {
                    this.parentContainer.removeLayer(this);
                }
            },
        },
        data() {
            return {
                ready: false,
                mapObject: null,
                parentContainer: null,
            };
        },
        mounted() {
            this.mapObject = new L.GPX(this.$props.gpxFile, this.$props.gpxOptions)
                .on('loaded', this.gpxLoaded)
                .on('addpoint', this.addpoint)
                .on('addline', this.addline);
            // @ts-ignore
            L.DomEvent.on(this.mapObject, this.$listeners);
            this.ready = true;
            this.parentContainer = findRealParent(this.$parent);
            this.parentContainer.addLayer(this);
        },
        beforeDestroy() {
            this.parentContainer.removeLayer(this);
        },
        methods: {
            gpxLoaded(loadedEvent) {
                this.$emit('gpx-loaded', loadedEvent);
            },
            addpoint(addPointEvent) {
                this.$emit('addpoint', addPointEvent);
            },
            addline(addLineEvent) {
                this.$emit('addline', addLineEvent);
            }
        }
    });
    export default LGpx;
</script>
