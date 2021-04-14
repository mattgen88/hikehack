<template>
    <div class="maps">
        <ul>
            <li v-for="trail in trails" v-bind:key="trail.id">
                <router-link v-bind:to="{ name: 'ViewMap', params: {map: trail.id} }">{{trail.name}}</router-link>
            </li>
        </ul>
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
