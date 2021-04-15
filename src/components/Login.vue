<template>
    <fieldset>
        <h4>Login</h4>
        <form>
            <label for="login_username" >Username</label>
            <div>
                <input id="login_username" type="username" v-model="username" required autofocus autocomplete>
            </div>
            <div>
                <label for="login_password" >Password</label>
                <div>
                    <input id="login_password" type="password" v-model="password" required autocomplete>
                </div>
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
                    Login
                </button>
            </div>
        </form>
    </fieldset>
</template>
<script>
    var axios = require('axios');
    export default {
        data(){
            return {
                username : "",
                password : "",
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
                    axios.post(url, formData, {
                        headers: {'Content-Type': 'multipart/form-data'},
                        withCredentials: true,
                        })
                    .then(response => {
                        console.debug(response);
                        if (response.data.result) {
                            this.$emit("authenticated");
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
