<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-6 col-sm-10 col-xs-12">
                    <div class="card-group mb-0">
                        <div class="card p-4">
                            <div class="card-body">
                                <h1>Login</h1>
                                <p class="text-muted">Sign In to your account</p>
                                <form
                                    method="post"
                                    name="vks.loginForm"
                                    @submit.prevent="handleSubmit"
                                    novalidate
                                >
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="icon-user mr-2 ml-2"></i>
                                        </span>
                                        <label for="email">
                                            Email
                                            <small
                                                :class="!vks.login.email || errors.has('email') ? 'text-danger' : 'text-success' "
                                            >*</small>
                                        </label>

                                        <div class="input-group">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                class="form-control"
                                                placeholder="Enter email"
                                                v-model="vks.login.email"
                                                v-validate="'required|email'"
                                                :class="{ 'is-invalid': errors.has('email') }"
                                            />
                                        </div>

                                        <small
                                            v-if="errors.has('email')"
                                            class="text-danger mt-1"
                                        >{{ errors.first('email') }}</small>
                                    </div>

                                    <div class="input-group mt-3">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="icon-lock mr-2 ml-2"></i>
                                            </span>
                                            <label for="password">
                                                Password
                                                <small
                                                    :class="!vks.login.password || errors.has('password') ? 'text-danger' : 'text-success' "
                                                >*</small>
                                            </label>

                                            <div class="input-group">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    required
                                                    placeholder="Password"
                                                    v-model="vks.login.password"
                                                    v-validate="'required'"
                                                    :class="{ 'is-invalid': errors.has('password') }"
                                                    class="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mt-3">
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <button type="submit" class="btn btn-primary px-4">Login</button>
                                        </div>

                                        <div class="col-md-6 col-sm-6 col-xs-12 text-right">
                                            <router-link
                                                to="/forgot-password"
                                                class="btn btn-link px-0"
                                            >Forgot password?</router-link>
                                            <!-- <button type="button" class="btn btn-link px-0">Forgot password?</button> -->
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    ApiCollections,
    route_prefix,
    default_route,
    dashboardURL
} from "../../../config/config";
import apiServices from "../../../Services/apiServices";
import axois from "axios";
import store from "../../../store";
import router from "../../../router";

export default {
    name: "Login",
    components: {
        // Callout
    },
    data: function() {
        name: "Login";
        return {
            vks: {
                login: {
                    email: "admin@gmail.com",
                    password: "admin"
                    // email: null,
                    // password: null
                }
            },
            submitted: false
        };
    },

    methods: {
        setDataInLocalStorage(data) {
            // // Not working
            // this.$store.getters.setDataInLocalStorage({
            //   token: data.token_type,
            //   type: data.access_token,
            //   user: JSON.stringify(data.user)
            // });
            localStorage.setItem("token_type", data.token_type);
            localStorage.setItem("auth_token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));

            /** Update Root User Data */
            this.$root.user = data.user;
        },

        async handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (!valid) {
                    apiServices.notify("i", "Enter email and password");
                    console.error("Validation Error");
                    return false;
                }
            });

            /** call API here */
            /**
             * Start Loader Before api calling
             */
            let res = await apiServices
                .call(ApiCollections.login)
                .post(this.vks.login);

            /**
             * True Response
             */
            if (res.success && res.success == true) {
                // this.$store.commit("saveToken", res.data);

                /** set token on localstorage */
                this.setDataInLocalStorage(res.data);
                apiServices.notify("s", res.message);

                /**redirect to dashboard */
                this.$router.go("Home");
                // router.push();
                // this.$router.push({ name: "Home" });

                // this.$router.push({ name: "Home" });
                // router.push(default_route);
                // this.$router.go(default_route);
            } else {
                apiServices.notify("e", res.message);
            }
            /**
             * Stop  Loader Here
             */
        }
    }

    // computed
    // methods: {}
};
</script>
