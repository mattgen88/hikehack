<template>
    <fieldset>
        <h4>Register</h4>
        <form>
            <label for="reg_username" >Username</label>
            <div>
                <input id="reg_username" type="username" v-model="username" required autofocus autocomplete="no">
            </div>
            <div>
                <label for="reg_password" >Password</label>
                <div>
                    <input id="reg_password" type="password" v-model="password" required autocomplete="no">
                </div>
            </div>
            <div>
                <label for="reg_fullname" >Full Name</label>
                <div>
                    <input id="reg_fullname" type="fullname" v-model="fullname" autocomplete="no">
                </div>
            </div>
            <div>
                <label for="reg_email" >Email</label>
                <div>
                    <input id="reg_email" type="email" v-model="email" autocomplete="no">
                </div>
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
                    Register
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
                fullname: "",
                email: ""
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                if (this.password.length > 0) {
                    const api_uri = process.env.server || "https://hikehack-backend.herokuapp.com";
                    const url = api_uri+"/auth/register";

                    const formData = new FormData();
                    formData.append("username", this.username);
                    formData.append("password", this.password);
                    formData.append("fullname", this.fullname);
                    formData.append("email", this.email);
                    axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(response => {
                        console.debug(response)
                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                }
            }
        }
    }
</script>
