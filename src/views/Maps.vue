<template>
    <div class="maps">
        <template v-for="trail in trails">
            <router-link v-bind:key="trail.id" v-bind:to="{ name: 'ViewMap', params: {map: trail.id} }">{{trail.name}}<br /></router-link>
        </template>
    </div>
</template>

<script>
const axios = require("axios");
export default {
    name: 'Maps',
    components: {
    },
    methods: {

    },
    data() {
        return {
            trails: []
        };
    },
    created() {
    const api_uri = process.env.server || "http://localhost:8088";
    console.debug(api_uri);
    axios.get(api_uri+"/trails")
        .then(r => {
            for(var i =0; i < r.data.trails.length; i++) {
                console.debug(r.data.trails[i]);
                this.trails.push({id: r.data.trails[i], name: r.data.trails[i].replace("_", " ")});
            }
        });
    }

}
</script>
<style>
.maps li {
    list-style-type: none;
}
.maps a {
    line-height: 30px;
    font-weight: bold;
    color: #2c3e50;}
</style>
