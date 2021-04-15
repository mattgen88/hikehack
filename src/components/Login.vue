<template>
    <div v-if="!authenticated">
        <h4>Login</h4>
        <form>
            <label for="username" >Username</label>
            <div>
                <input id="username" type="username" v-model="username" required autofocus>
            </div>
            <div>
                <label for="password" >Password</label>
                <div>
                    <input id="password" type="password" v-model="password" required>
                </div>
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
                    Login
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
                username : "",
                password : "",
                authenticated: false
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                if (this.password.length > 0) {
                    const api_uri = process.env.server || "https://hikehack-backend.herokuapp.com";
                    const url = api_uri+"/auth";

                    const formData = new FormData();
                    formData.append("username", this.username);
                    formData.append("password", this.password);
                    axios.post(url, formData, {'Content-Type': 'multipart/form-data'})
                    .then(response => {
                        console.debug(response);
                        if (response.data.result) {
                            this.$emit("authenticated");
                            this.authenticated=true;
                        }
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
