<template >
  <div class="animated fadeIn">
    <div class>
      <!-- <div class="breadcrumb col-md-12 col-sm-12 col-xs-10 mt-2 mb-2 p-2">
        <div class="font-weight-bold col-md-11 col-sm-11 col-xs-2 pt-1">
          <label>Edit User</label>
        </div>
        <div class="col-md-1 col-sm-1 col-xs-1">
          <router-link to="users" class="btn btn-sm btn-primary rounded pull-right">
            <i class="fa fa-fa-reply-all"></i> View
          </router-link>
        </div>
      </div>-->

      <PageHeader :title="$route.name" :back_route="'/users'"></PageHeader>
      <b-card class="card container">
        <div class="background">
          <form method="post" novalidate name="userForm">
            <div class="row mb-3">
              <div class="input-group col-md-4">
                <label for="name" class="text-capitalize">
                  name
                  <small
                    :class="!user.name || errors.has('name') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <div class="input-group">
                  <!-- <span class="input-group-addon">
                    <i class="icon-user"></i>
                  </span>-->
                  <input
                    type="name"
                    id="name"
                    name="name"
                    required
                    class="form-control"
                    placeholder="Enter name"
                    v-model="user.name"
                    v-validate="'required'"
                    :class="{ 'is-invalid': errors.has('name') }"
                  />
                </div>
                <small v-if="errors.has('name')" class="text-danger mt-1">{{ errors.first('name') }}</small>
              </div>

              <div class="input-group col-md-4">
                <label for="email" class="text-capitalize">
                  email
                  <small
                    :class="!user.email || errors.has('email') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <div class="input-group">
                  <!-- <span class="input-group-addon">
                    <i class="icon-user"></i>
                  </span>-->
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    class="form-control"
                    placeholder="Enter email"
                    v-model="user.email"
                    v-validate="'required|email'"
                    :class="{ 'is-invalid': errors.has('email') }"
                  />
                </div>
                <small
                  v-if="errors.has('email')"
                  class="text-danger mt-1"
                >{{ errors.first('email') }}</small>
              </div>

              <div class="input-group col-md-4">
                <label for="mobile" class="text-capitalize">
                  mobile
                  <small
                    :class="!user.mobile || errors.has('mobile') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <small
                  v-if="errors.has('mobile')"
                  class="text-danger mt-1"
                >{{ errors.first('mobile') }}</small>
                <div class="input-group">
                  <input
                    type="mobile"
                    id="mobile"
                    name="mobile"
                    required
                    class="form-control"
                    placeholder="Enter mobile"
                    v-model="user.mobile"
                    v-validate="'required|numeric'"
                    :class="{ 'is-invalid': errors.has('mobile') }"
                  />
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <div class="input-group col-md-4">
                <label for="gender" class="text-capitalize">
                  gender
                  <small
                    :class="!user.gender || errors.has('gender') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <div class="input-group">
                  <!-- <span class="input-group-addon">
                    <i class="icon-user"></i>
                  </span>-->

                  <div v-for="(list, index) in genders" :key="index">
                    <input
                      type="radio"
                      id="list.id"
                      name="gender"
                      v-bind:value="list.id"
                      v-model="user.gender"
                      :checked="list.id == user.gender"
                    />
                    <!-- v-bind:value="{id: list.id, name: list.name}" -->
                    <!-- v-on:change="showSellers" -->
                    <label for="list.id" class="text-capitalize">{{list.name }}</label>
                    <!-- | capitaliza -->
                  </div>
                </div>
              </div>

              <div class="input-group col-md-4">
                <label for="facebook" class="text-capitalize">
                  facebook
                  <small
                    :class="!user.facebook || errors.has('facebook') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <div class="input-group">
                  <!-- <span class="input-group-addon">
                    <i class="icon-user"></i>
                  </span>-->
                  <input
                    type="text"
                    id="facebook"
                    name="facebook"
                    required
                    class="form-control"
                    placeholder="Enter facebook id"
                    v-model="user.facebook"
                    v-validate="'url'"
                    :class="{ 'is-invalid': errors.has('facebook') }"
                  />
                </div>
                <small
                  v-if="errors.has('facebook')"
                  class="text-danger mt-1"
                >{{ errors.first('facebook') }}</small>
              </div>

              <div class="input-group col-md-4">
                <!-- <pre>{{ user.country_detail.name }}</pre> -->
                <label for="country" class="text-capitalize">
                  Country
                  <small
                    :class="!user.country_detail.name || errors.has('country') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <small
                  v-if="errors.has('country')"
                  class="text-danger mt-1"
                >{{ errors.first('country') }}</small>
                <div class="input-group">
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    class="form-control"
                    placeholder="Country Name"
                    v-model="user.country_detail.name"
                    v-validate="'required'"
                    :class="{ 'is-invalid': errors.has('country') }"
                  />
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <div class="input-group col-md-8">
                <label for="goal" class="text-capitalize">
                  goal
                  <small
                    :class="!user.goal || errors.has('goal') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <div class="input-group">
                  <!-- <span class="input-group-addon">
                    <i class="icon-user"></i>
                  </span>-->
                  <textarea
                    class="form-control"
                    name="goal"
                    id="goal"
                    cols="30"
                    rows="5"
                    v-model="user.goal"
                    placeholder="Enter your goal"
                  ></textarea>
                </div>
                <small v-if="errors.has('goal')" class="text-danger mt-1">{{ errors.first('goal') }}</small>
              </div>

              <div class="input-group col-md-4">
                <span>
                  <label for="height" class="text-capitalize">
                    height
                    <small
                      :class="!user.height || errors.has('height') ? 'text-danger' : 'text-success' "
                    >*</small>
                  </label>
                  <small
                    v-if="errors.has('height')"
                    class="text-danger mt-1"
                  >{{ errors.first('height') }}</small>
                  <div class="input-group">
                    <input
                      type="height"
                      id="height"
                      name="height"
                      required
                      class="form-control"
                      placeholder="Enter height"
                      v-model="user.height"
                      v-validate="'required|numeric'"
                      :class="{ 'is-invalid': errors.has('height') }"
                    />
                  </div>
                </span>
                <span>
                  <label for="weight" class="text-capitalize">
                    weight
                    <small
                      :class="!user.weight || errors.has('weight') ? 'text-danger' : 'text-success' "
                    >*</small>
                  </label>
                  <small
                    v-if="errors.has('weight')"
                    class="text-danger mt-1"
                  >{{ errors.first('weight') }}</small>
                  <div class="input-group">
                    <input
                      type="weight"
                      id="weight"
                      name="weight"
                      required
                      class="form-control"
                      placeholder="Enter weight"
                      v-model="user.weight"
                      v-validate="'required|numeric'"
                      :class="{ 'is-invalid': errors.has('weight') }"
                    />
                  </div>
                </span>
              </div>
            </div>

            <div class="row mb-3">
              <div class="input-group col-md-6">
                <label for="created_at" class="text-capitalize">
                  created at
                  <small
                    :class="!user.created_at || errors.has('created_at') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <div class="input-group">
                  <!-- <span class="input-group-addon">
                    <i class="icon-user"></i>
                  </span>-->
                  <input
                    type="datetime"
                    id="created_at"
                    name="nacreated_atme"
                    required
                    class="form-control"
                    placeholder="User created at"
                    v-model="user.created_at"
                    v-validate
                    :class="{ 'is-invalid': errors.has('created_at') }"
                  />
                </div>
                <small
                  v-if="errors.has('created_at')"
                  class="text-danger mt-1"
                >{{ errors.first('created_at') }}</small>
              </div>

              <div class="input-group col-md-6">
                <label for="last_login_at" class="text-capitalize">
                  last login at
                  <small
                    :class="!user.last_login_at || errors.has('last_login_at') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <div class="input-group">
                  <input
                    type="datetime"
                    id="last_login_at"
                    name="last_login_at"
                    required
                    class="form-control"
                    placeholder="Enter last_login_at"
                    v-model="user.last_login_at"
                    v-validate="'required'"
                    :class="{ 'is-invalid': errors.has('last_login_at') }"
                  />
                </div>
                <small
                  v-if="errors.has('last_login_at')"
                  class="text-danger mt-1"
                >{{ errors.first('email') }}</small>
              </div>
            </div>

            <div class="row mb-3">
              <div class="input-group col-md-4">
                <label for="users" class="text-capitalize">
                  Photo
                  <small
                    :class="!user.photo || errors.has('photo') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>

                <div class="input-group">
                  <img
                    v-bind:src="user.photo"
                    v-bind:alt="user.name"
                    height="80"
                    width="80"
                    class="img-avatar"
                  />
                  <input type="file" @change="onFileChanged" />
                </div>
                <small
                  v-if="errors.has('email')"
                  class="text-danger mt-1"
                >{{ errors.first('email') }}</small>
              </div>
            </div>
            <div class="row pull-right">
              <div class="p-3">
                <button type="submit" class="m-1 btn btn-success btn-sm rounded pull-right">Update</button>
                <router-link to="/users" class="m-1 btn btn-danger btn-sm rounded pull-right">Cancel</router-link>
              </div>
            </div>
          </form>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import services from "../../Services/apiServices";
import { ApiCollections } from "../../config/config";
import { Constants } from "../../constants";
import PageHeader from "../../components/custom/PageHeader";

// import Switches from "vue-switches";

export default {
  // name: "EditUser",
  components: {
    // Switches,
    PageHeader
  },
  data: function() {
    return {
      selectedFile: null,
      genders: [],
      totalCount: 0,
      user: {},
      request: {
        page: 1,
        limit: 20,
        relation: ["country_detail"]
      }
    };
  },
  beforeMount() {
    // let genders = [];
    // _.each(Constants.Genders, function(value, key) {
    //   genders.push({ id: key, name: value });
    // });
    // this.genders = genders;

    let genders = [];
    _.each(Constants.Genders, function(value, key) {
      genders.push({ id: key, name: value });
    });
    this.genders = genders;

    if (this.$route.params && this.$route.params.id) {
      this.getCurrentUser(this.$route.params.id);
    } else {
      this.$route.push({ name: "Users" });
    }
  },
  mounted() {
    this.$Progress.finish();
  },
  // computed
  methods: {
    onFileChanged(event) {
      const file = event.target.files[0];
      this.selectedFile = event.target.files[0];
    },

    async getCurrentUser(id) {
      this.$Progress.start();

      let res = await services.call(ApiCollections.getUserById).getOne(id);

      if (res && res.success && res.success == true) {
        this.user = res.data;
        // services.notify("s", res.message);
        this.$Progress.finish();
      } else {
        this.$Progress.fail();

        services.notify("e", res.message);
         
      }
    },
    statusChange(key, value) { 

      /**
       * Call Status change api
       */
    }
  }
};
</script>
