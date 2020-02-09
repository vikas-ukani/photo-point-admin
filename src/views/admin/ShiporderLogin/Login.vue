<template>
  <div>
    <div class="app flex-row">
      <!-- align-items-center -->
      <div class="container">
        <b-row class>
          <!-- justify-content-center -->
          <b-col md="8">
            <b-card-group>
              <b-card no-body class="p-4">
                <b-card-body>
                  <b-form>
                    <h1>Shiporder Login</h1>
                    <p class="text-muted">Login at Shiporder</p>
                    <b-input-group class="mb-3">
                      <b-input-group-prepend>
                        <b-input-group-text>
                          <i class="icon-user"></i>
                        </b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input
                        type="text"
                        class="form-control"
                        v-model="login.email"
                        placeholder="Username"
                        autocomplete="username email"
                      />
                    </b-input-group>
                    <b-input-group class="mb-4">
                      <b-input-group-prepend>
                        <b-input-group-text>
                          <i class="icon-lock"></i>
                        </b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input
                        type="password"
                        class="form-control"
                        v-model="login.password"
                        placeholder="Password"
                        autocomplete="current-password"
                      />
                    </b-input-group>
                    <b-row>
                      <b-col cols="6">
                        <b-button variant="primary" class="px-4" @click="loginCall">Login</b-button>
                      </b-col>
                      <!-- <b-col cols="6" class="text-right">
                        <b-button variant="link" class="px-0">Forgot password?</b-button>
                      </b-col>-->
                    </b-row>
                  </b-form>
                </b-card-body>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import apiServices from "../../../Services/apiServices";
import { ShipOrderAPICollection } from "../../../config/config";
export default {
  name: "ShiporderLogin",
  data() {
    return {
      login: {
        email: "anildhameliya66@gmail.com",
        password: "Hardik@123"
      }
    };
  },
  methods: {
    async loginCall() {
      console.log("clicked", this.login);

      let res = await apiServices
        .call(ShipOrderAPICollection.login)
        .post(this.login);

      console.log("res", res);

      if (res && res.success === true) {
        apiServices.notify("s", res.message);
      } else {
        apiServices.notify("e", res.message);
      }
    }
  }
};
</script>