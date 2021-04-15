<template>
    <div v-if="this.$props.authenticated">
        <h4>Submit Trail</h4>
        <form>
            <label for="name" >Name</label>
            <div>
                <input id="name" type="name" v-model="name" required autofocus>
            </div>
            <div>
                <label for="file" >GPX File</label>
                <div>
                    <input id="file" type="file" ref="file" required>
                </div>
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
                    Upload
                </button>
            </div>
        </form>
    </div>
</template>
<script>
    var axios = require('axios');
    export default {
        data(){
            return {
                name : ""
            }
        },
        props: {
            authenticated: Boolean,
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                if (this.name.length > 0 || this.$refs.file.files.length != 1) {
                    const api_uri = process.env.server || "https://hikehack-backend.herokuapp.com";
                    const url = api_uri+"/trails";

                    const formData = new FormData();
                    formData.append("name", this.name);
                    formData.append("file", this.$refs.file.files[0]);
                    axios.post(url, formData, {'Content-Type': 'multipart/form-data'})
                    .then(response => {
                        console.debug(response);
                    })
                    .catch(function (error) {
                        console.error(error.response);
                        // @TODO: Display error
                    });
                }
            }
        }
    }
</script>
