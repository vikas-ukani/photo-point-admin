<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5 col-sm-5">
          <div class="card-group mb-0">
            <div class="card p-4">
              <div class="card-body">
                <h1>Forgot Password?</h1>

                <p class="text-muted">Enter email to reset password!</p>

                <form method="post" name="vks.loginForm" @submit.prevent="sendMail" novalidate>
                  <div class="input-group">
                    <label for="email">
                      Email
                      <small
                        :class="!vks.login.email || errors.has('email') ? 'text-danger' : 'text-success' "
                      >*</small>
                    </label>

                    <div class="input-group">
                      <!-- <span class="input-group-addon pt-1">
                        <i class="icon-user mr-2"></i>
                      </span>-->

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

                    <!-- <small
                      v-if="errors.has('email')"
                      class="text-danger mt-1"
                    >{{ errors.first('email') }}</small>-->
                  </div>

                  <!-- <pre>{{ !vks.login.email.length  }}</pre> -->
                  <div class="row mt-3">
                    <div class="col-6">
                      <button
                        id="submit-button"
                        type="submit"
                        :disabled="!vks.login.email"
                        class="btn btn-primary px-4"
                      >Send Mail</button>
                    </div>

                    <div class="col-6 text-right">
                      <router-link to="/login" class="nav-link">Go to login</router-link>
                      <!-- <button type="button" class="btn btn-link px-0">Go to login?</button> -->
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
  default_route
} from "../../../config/config";
import apiServices from "../../../Services/apiServices";
import axois from "axios";
import { async } from "q";

export default {
  name: "ForgotPassword",
  components: {
    // Callout
  },
  data: function() {
    name: "Login";
    return {
      vks: {
        login: {
          // email: "vikas@gmail.com",
          // password: "vikas"
          email: null
          // password: null
        }
      },
      submitted: false
    };
  },
  mounted() {
    console.log("Check URL");
  },
  methods: {
    // setDataInLocalStorage(data) {
    //   localStorage.setItem("token_type", data.token_type);
    //   localStorage.setItem("auth_token", data.access_token);
    //   localStorage.setItem("user", JSON.stringify(data.user));
    // },

    async sendMail(e) {
      this.submitted = true;
      // this.$validator.validate().then(valid => {
      //   if (!valid) {
      //     apiServices.notify("i", "Enter email to recive an email");
      //     return true;
      //     console.error("Validation Error");
      //   }
      // });

      /** call API here */
      /**
       * Start Loader Before api calling
       */

      /** start loader */
      this.$Progress.start();
      let res = await apiServices
        .call(ApiCollections.forgorPassword)
        .post(this.vks.login);
      /**
       * True Response
       */
      if (res.success && res.success == true) {
        // this.$store.commit("saveToken", res.data);

        /** set token on localstorage */
        // this.setDataInLocalStorage(res.data);
        apiServices.notify("s", res.message);
        this.vks.email = null;
        // this.$router.go(default_route);

        // this.$router.push({ name: "Dashboard" });
        /** stop loader */
        this.$Progress.finish();
      } else {
        apiServices.notify("e", res.message);
      }
      /**
       * Stop  Loader Here
       */
      /** stop loader */
      this.$Progress.fail();
    }
  }

  // computed
  // methods: {}
};
</script>
