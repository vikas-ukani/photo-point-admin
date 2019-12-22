<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="/">
        <!-- <img
          class="navbar-brand-full"
          src="img/brand/logo.svg"
          width="89"
          height="25"
          alt="CoreUI Logo"
        />-->
        <!-- <img
          class="navbar-brand-minimized"
          src="img/brand/sygnet.svg"
          width="30"
          height="30"
          alt="CoreUI Logo"
        />-->
        <b>Shopikana</b>
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen="true" />
      <b-navbar-nav class="d-md-down-none">
        <!-- <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <b-nav-item class="px-3">Settings</b-nav-item>-->
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>-->
        <!-- <b-nav-item class="d-md-down-none">
          <i class="icon-location-pin"></i>
        </b-nav-item>-->
        <DefaultHeaderDropdownAccnt />
      </b-navbar-nav>
      <!-- <AsideToggler class="d-none d-lg-block" /> -->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter />
        <SidebarMinimizer />
      </AppSidebar>
      <main class="main">
        <!-- {{list}}  -->
        <!-- <Breadcrumb :list="list" /> -->
        <div class="container-fluids m-2">
          <router-view></router-view>
        </div>
      </main>
      <!-- <AppAside fixed> -->

      <!-- <DefaultAside /> -->
      <!-- </AppAside> -->
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="/">Shopikana</a>
        <span class="ml-1">
          &copy; {{ new Date().getFullYear() }}.
          <!-- creativeLabs -->
        </span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Developed by</span>
        <a href="https://github.com/vikas-ukani" target="_blank">Vikas Ukani.</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from "@/_nav";
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb
} from "@coreui/vue";
import DefaultAside from "./DefaultAside";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";

export default {
  name: "DefaultContainer",
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data() {
    return {
      nav: nav.items
    };
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    }
  }
};
</script>
