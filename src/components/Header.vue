<template>
  <header class="app-header navbar position-sticky fixed-top">
    <button
      class="navbar-toggler mobile-sidebar-toggler d-lg-none"
      type="button"
      @click="mobileSidebarToggle"
    >&#9776;</button>
    <span class="navbar-brand" to="#"></span>
    <button
      class="navbar-toggler sidebar-toggler d-md-down-none"
      type="button"
      @click="sidebarMinimize"
    >&#9776;</button>
    <b-nav is-nav-bar class="d-md-down-none">
      <!-- <b-nav-item class="px-3">Dashboard</b-nav-item> -->
      <!-- <b-nav-item class="px-3">
        <router-link to="/users">Users</router-link>
      </b-nav-item>-->
      <!-- <b-nav-item class="px-3">Settings</b-nav-item> -->
    </b-nav>
    <b-nav is-nav-bar class="ml-auto">
      <!-- <b-nav-item class="d-md-down-none">
        <i class="icon-bell"></i>
        <span class="badge badge-pill badge-danger">2</span>
      </b-nav-item>-->
      <!-- <b-nav-item class="d-md-down-none">
        <i class="icon-list"></i>
      </b-nav-item>-->
      <!-- <b-nav-item class="d-md-down-none">
        <i class="icon-location-pin"></i>
      </b-nav-item>-->
      <b-nav-item-dropdown right>
        <template slot="button-content">
          <!-- <pre> {{ list.photo  }} </pre> -->
          <router-link to="/profile" class>
            <img v-if="user && user.photo" v-bind:src="user.photo" class="img-avatar" />
          </router-link>

          <!--  v-bind:src="list.photo"  v-bind:alt="list.name"  -->
          <span class="d-md-down-none" v-if="user && user.name" v-bind:text="user.name">
            <!-- {{ user.name }} -->
          </span>
        </template>
        <b-dropdown-header tag="div" class="text-center">
          <strong>Account</strong>
        </b-dropdown-header>
        <!-- <b-dropdown-item>
          <i class="fa fa-bell-o"></i> Updates
          <span class="badge badge-info">42</span>
        </b-dropdown-item>
        <b-dropdown-item>
          <i class="fa fa-envelope-o"></i> Messages
          <span class="badge badge-success">42</span>
        </b-dropdown-item>
        <b-dropdown-item>
          <i class="fa fa-tasks"></i> Tasks
          <span class="badge badge-danger">42</span>
        </b-dropdown-item>
        <b-dropdown-item>
          <i class="fa fa-comments"></i> Comments
          <span class="badge badge-warning">42</span>
        </b-dropdown-item>
        <b-dropdown-header tag="div" class="text-center">
          <strong>Settings</strong>
        </b-dropdown-header>-->

        <!-- <b-dropdown-item>
          <i class="fa fa-wrench"></i> Settings
        </b-dropdown-item>-->
        <!-- <b-dropdown-item>
          <i class="fa fa-usd"></i> Payments
          <span class="badge badge-default">42</span>
        </b-dropdown-item>-->
        <!-- <b-dropdown-item>
          <i class="fa fa-file"></i> Projects
          <span class="badge badge-primary">42</span>
        </b-dropdown-item>-->
        <b-dropdown-divider></b-dropdown-divider>
        <!-- <b-dropdown-item>
          <i class="fa fa-shield"></i> Lock Account
        </b-dropdown-item>-->
        <b-dropdown-item>
          <router-link to="/profile" class="nav-link">
            <i class="fa fa-user"></i> Profile
          </router-link>
        </b-dropdown-item>

        <b-dropdown-item @click="logout()">
          <i class="fa fa-lock"></i> Logout
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    <!-- <button
      class="navbar-toggler aside-menu-toggler d-md-down-none "
      type="button"
      @click="asideToggle"
    >&#9776;</button>-->
  </header>
</template>
<script>
import router from "../router";
import { route_prefix } from "../config/config";

export default {
  data: function() {
    return {
      user: {}
    };
  },
  mounted() {
    this.user = this.$parent.$parent.user;
    console.log("User", this.user);
  },
  // name: "header",
  methods: {
    sidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-hidden");
    },
    sidebarMinimize(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-minimized");
    },
    mobileSidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-mobile-show");
    },
    logout() {
      this.$router.go({ name: "login" });
      localStorage.clear();
    }
  }
};
</script>
