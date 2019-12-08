<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5 col-sm-5">
          <div class="card-group mb-0">
            <div class="card p-4">
              <div class="card-body">
                <h1>Change Password</h1>

                <p class="text-muted">Change your password here.</p>

                <form
                  method="post"
                  name="vks.loginForm"
                  @submit.prevent="changePassword"
                  novalidate
                >
                  <div class="input-group">
                    <label for="password">
                      Password
                      <small
                        :class="!vks.change.password || errors.has('password') ? 'text-danger' : 'text-success' "
                      >*</small>
                    </label>

                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="icon-lock"></i>
                      </span>

                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Enter password"
                        v-model="vks.change.password"
                        ref="password"
                        v-validate="'required'"
                        :class="{ 'is-invalid': errors.has('password') }"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="input-group mt-3">
                    <div class="input-group">
                      <label for="password">
                        Confirm password
                        <small
                          :class="!vks.change.confirm_password || errors.has('confirm_password') ? 'text-danger' : 'text-success' "
                        >*</small>
                      </label>

                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="icon-lock"></i>
                        </span>

                        <input
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          required
                          placeholder="Re-enter password"
                          v-model="vks.change.confirm_password"
                          v-validate="'required|confirmed:password'"
                          :class="{ 'is-invalid': errors.has('confirm_password') }"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-6">
                      <button
                        type="submit"
                        :disabled="!vks.change.confirm_password || errors.has('confirm_password')"
                        class="btn btn-primary px-4"
                      >Change Password</button>
                    </div>

                    <div class="col-6 text-right">
                      <router-link to="/login" class="btn btn-link px-0">Go to login</router-link>
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
  default_route
} from "../../../config/config";
import apiServices from "../../../Services/apiServices";
import axois from "axios";
import { async } from "q";

export default {
  name: "ChangePassword",
  components: {
    // Callout
  },
  data: function() {
    name: "Login";
    return {
      vks: {
        change: {
          email: null,
          token: null,
          confirm_password: null,
          password: null
        }
      },
      submitted: false
    };
  },
  beforeMount() {
    this.vks.change.email =
      this.$route && this.$route.params && this.$route.params.email
        ? this.$route.params.email
        : null;

    // if (this.$route && this.$route.params && this.$route.params.token) {
    //   this.setDataInLocalStorage(this.$route.params.token);
    // }

    this.vks.change.token =
      this.$route && this.$route.params && this.$route.params.token
        ? this.$route.params.token
        : null;
  },

  methods: {
    // setDataInLocalStorage(toekn) {
    //   localStorage.setItem("token_type", "Bearer ");
    //   localStorage.setItem("auth_token", data.token);
    // },
    async changePassword(e) {
      // this.$router.push({ name: "Dashboard" });
      // this.$router.push({ name: "Home" });
      // console.log(this.$router.push("/dashboard"));

      // this.$route.push("/dashboard");
      // this.$route.routers("/admin/dashboard");
      //  this.routes.push({ name: "Dashboard" });
      // console.log(this.$router, this.$route, "/admin/dashboard");

      // return false;

      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (!valid) {
          apiServices.notify("i", "Enter email and password");
          console.error("Validation Error ");
          return false;
        }
      });

      /** call API here */
      /**
       * Start Loader Before api calling
       */
      ApiCollections.changePassword.headers = {
        headers: { Authorization: "Bearer " + this.vks.change.token }
      };

      let res = await apiServices
        .call(ApiCollections.changePassword)
        .post(this.vks.change);

      /**
       * True Response
       */
      if (res.success && res.success == true) {
        this.vks.change = {
          password: null,
          confim_password: null
        };
        apiServices.notify("s", res.message);
        this.$router.push({ name: "login" });
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
