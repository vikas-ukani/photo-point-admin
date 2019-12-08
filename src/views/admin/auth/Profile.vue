<template >
  <b-card class="animated fadeIn">
    <div class="background">
      <b-row class="mb-3">
        <b-col>
          <h4>Update Profile</h4>
        </b-col>
      </b-row>

      <form method="post" novalidate name="userForm" enctype="multipart/form-data">
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
            <small v-if="errors.has('email')" class="text-danger mt-1">{{ errors.first('email') }}</small>
          </div>

          <div class="input-group col-md-4">
            <label for="mobile" class="text-capitalize">
              mobile
              <small
                :class="!user.mobile || errors.has('mobile') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <small v-if="errors.has('mobile')" class="text-danger mt-1">{{ errors.first('mobile') }}</small>
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
              <!-- <b-form-radio-group> -->
              <div v-for="(list, index) in genders" :key="index">
                <label :for="list.id" class="text-capitalize col-md-6">
                  <b-form-radio
                    :id="list.id"
                    v-bind:value="list.name"
                    name="radio"
                    v-model="user.gender"
                    :checked="list.id == user.gender"
                  >
                    <span>{{ list.name | capitalize }}</span>
                  </b-form-radio>
                </label>
              </div>
            </div>
          </div>

          <!-- <div class="input-group col-md-4">
            <label for="facebook" class="text-capitalize">
              facebook
              <small
                :class="!user.facebook || errors.has('facebook') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
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
          </div>-->

          <div class="input-group col-md-4">
            <label for="country" class="text-capitalize">
              Country
              <small
                :class="!user.country_id || errors.has('country') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <small
              v-if="errors.has('country')"
              class="text-danger mt-1"
            >{{ errors.first('country') }}</small>
            <div class="input-group">
              <select
                class="form-control"
                required
                name="country_id"
                v-model="user.country_id"
                v-validate="'required|numeric'"
                :class="{ 'is-invalid': errors.has('country_id') }"
              >
                <!-- @change="changePageLimits($event)" -->
                <option
                  v-for="(list, index) in countries"
                  :key="index"
                  :value="list.id"
                >{{list.name | capitalize}}</option>
              </select>
              <!-- <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    class="form-control"
                    placeholder="Country Name"
                    v-model="user.country_detail.name"
                    v-validate="'required'"
                    :class="{ 'is-invalid': errors.has('country') }"
              />-->
            </div>
          </div>
          <div class="input-group col-md-4">
            <div class="input-group col-md-6">
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
            </div>
            <div class="input-group col-md-6">
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

          <div class="input-group col-md-4"></div>
        </div>
        <!-- <ImageUpload :photo="user.photo ? user.photo : null" /> -->
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
                v-img="user.photo"
                v-bind:src="user.photo"
                v-bind:alt="user.name"
                height="80"
                width="80"
                class="img-avatar"
              />
            </div>
            <div class="input-group pull-left">
              <label class="btn btn-primary" for="file-upload">
                <input id="file-upload" type="file" class="d-none" v-on:change="onFileChanged" />
                Profile
              </label>
            </div>
          </div>
        </div>
        <div class="row pull-right">
          <div class="p-3">
            <button
              type="button"
              @click="submitData"
              class="m-1 btn btn-success btn-sm rounded pull-right"
            >Update</button>
            <router-link to="/users" class="m-1 btn btn-danger btn-sm rounded pull-right">Cancel</router-link>
          </div>
        </div>
      </form>
    </div>
  </b-card>
</template>

<script>
import services from "../../../Services/apiServices";
import { ApiCollections } from "../../../config/config";
import { Constants } from "../../../constants";
import PageHeader from "../../../components/custom/PageHeader";
import Axios from "axios";

// import Switches from "vue-switches";
import ImageUpload from "./ImageUpload";
import DefaultHeaderDropdownAccnt from "../../../containers/DefaultHeaderDropdownAccnt";
export default {
  name: "Profile",

  components: {
    // Switches,
    PageHeader,
    ImageUpload,
    DefaultHeaderDropdownAccnt
  },
  data: function() {
    return {
      // selectedFile: null,
      // genders: [],
      user: {},
      countries: []
      // request: {
      //   page: 1,
      //   limit: 20,
      //   relation: ["country_detail"]
      // }
    };
  },
  beforeMount() {
    // let genders = [];
    // _.each(Constants.Genders, function(value, key) {
    //   genders.push({ id: key, name: value });
    // });
    // this.genders = genders;Gender
    this.user = JSON.parse(this.$store.getters.getUserDetail);

    let genders = [];
    _.each(Constants.Genders, function(value, key) {
      genders.push({ id: key, name: value });
    });
    this.genders = genders;

    if (this.user && this.user.id) {
      this.getCurrentUser(this.user.id);
    } else {
      this.$route.push({ name: "Users" });
    }
  },
  mounted() {
    this.$Progress.finish();
    this.getCountryList();
  },
  // computed
  methods: {
    async getCountryList() {
      var request = {
        is_active: true
      };

      let res = await services
        .call(ApiCollections.countries_listing)
        .post(request);
      if (res && res.success && res.success == true) {
        this.countries = res.data.list;
        // services.notify("s", res.message);
        // this.$Progress.finish();
      } else {
        // this.$Progress.fail();
        // services.notify("e", res.message);
      }
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

    onFileChanged(event) {
      let input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.user.photo = e.target.result;
          this.selectedFile = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);
      }

      // this.selectedFile = event.target.files[0];
    },

    async submitData() {
      let formData = new FormData();
      formData.append("id", this.user.id);
      formData.append("name", this.user.name);
      formData.append("email", this.user.email);
      formData.append("mobile", this.user.mobile);
      formData.append("facebook", this.user.facebook);
      formData.append("country_id", this.user.country_id);
      formData.append("gender", this.user.gender);
      formData.append("height", this.user.height);
      formData.append("weight", this.user.weight);
      formData.append("goal", this.user.goal);

      if (this.selectedFile) {
        formData.append("photo", this.selectedFile);
      }

      this.$Progress.start();

      // if (this.selectedFile) {
      //   this.user.photo = this.selectedFile;
      // }

      var apiObject = this.$_.clone(ApiCollections.update_profile);
      // apiObject.url += this.user.id;
      // console.log("Submit called", this.selectedFile, apiObject);

      let res = await services.call(apiObject).post(
        formData
        // this.user
      );

      /** set update data  */
      if (res && res.success && res.success == true) {
        /** stop loader */
        this.$Progress.finish();

        // this.lists.slice(index, 1, this.$_.clone(res.data));
        console.log("Check update", res.data.token_type);

        this.user = res.data.user;
        // //  Not working
        // this.$store.getters.setDataInLocalStorage({
        //   token: res.data.access_token,
        //   type: res.data.token_type,
        //   user: JSON.stringify(this.user)
        // });
        localStorage.setItem("token_type", res.data.token_type);
        localStorage.setItem("auth_token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        services.notify("s", res.message);
        this.$router.go();
      } else {
        this.$Progress.fail();
        services.notify("e", res.message);
      }
    }
  }
};
</script>
