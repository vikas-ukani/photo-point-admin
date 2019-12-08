<template>
  <AppHeaderDropdown right no-caret>
    <!-- {{ userName() }} -->
    <template slot="header">
      {{ userName() }}
      <!-- {{ user.name }} -->
      <!-- {{ user.name ? user.name : ( user.email ? user.email : user.mobile) }} -->
      <img :src="profilePhoto()" class="img-avatar pr-1" />
      <!-- :alt="userName()" -->
      <!-- <img src="img/avatars/6.jpg" class="img-avatar pr-1" alt="admin@bootstrapmaster.com" /> -->
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>Account</strong>
      </b-dropdown-header>
      <!--  <b-dropdown-item>
        <i class="fa fa-bell-o" /> Updates
        <b-badge variant="info">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-envelope-o" /> Messages
        <b-badge variant="success">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-tasks" /> Tasks
        <b-badge variant="danger">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-comments" /> Comments
        <b-badge variant="warning">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-header tag="div" class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item>
        <i class="fa fa-user" /> Profile
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-wrench" /> Settings
      </b-dropdown-item>-->
      <!-- <b-dropdown-item>
        <i class="fa fa-usd" /> Payments
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-file" /> Projects
        <b-badge variant="primary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item>
        <i class="fa fa-shield" /> Lock Account
      </b-dropdown-item>-->
      <b-dropdown-item>
        <router-link to="/profile" class="nav-link">
          <i class="fa fa-user"></i> Profile
        </router-link>
      </b-dropdown-item>
      <b-dropdown-item @click="logout()">
        <i class="fa fa-lock"></i> Logout
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
import { baseURL } from "../config/config";

export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return {
      itemsCount: 42
    };
  },
  mounted() {
    // this.user = store.getters.getUserDetail;
  },

  methods: {
    userName() {
      // let user = this.$root.user;
      // let user = this.$parent.$parent.$parent;
      // console.log("In Header", user);
      // return false;

      let user = JSON.parse(this.$store.getters.getUserDetail);
      return user.name
        ? user.name
        : user.email
        ? user.email
        : user.mobile
        ? user.mobile
        : "-";
    },

    profilePhoto() {
      let user = JSON.parse(this.$store.getters.getUserDetail);
      // console.log("Phpoto", baseURL, user.photo);

      return user.photo ? user.photo : "img/avatars/6.jpg";
    },
    logout() {
      this.$router.go({ name: "login" });
      localStorage.clear();
    }
  }
};
</script>
