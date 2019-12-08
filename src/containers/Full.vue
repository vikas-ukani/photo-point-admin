<template>
  <div>
    <AppHeader />
    <div class="app-body min-vh-100">
      <Sidebar :navItems="nav" />
      <main class="main">
        <!-- <breadcrumb :list="list" /> -->
        <div class>
          <!-- container-fluid -->
          <router-view></router-view>
        </div>
      </main>
      <!-- <AppAside/> -->
    </div>
    <AppFooter />
  </div>
</template>

<script>
import nav from "../_nav";
import {
  Header as AppHeader,
  Sidebar,
  // Aside as AppAside,
  Footer as AppFooter,
  Breadcrumb
} from "../components/";

export default {
  name: "full",
  components: {
    AppHeader,
    Sidebar,
    // AppAside,
    AppFooter,
    Breadcrumb
  },
  data() {
    return {
      nav: nav.items
    };
  },
  beforeMount() {
    _.each(this.nav, function(item, key) {
      if (item.children && item.children.length) {
        item.children = _.sortBy(item.children, "sequence");
      }
    });
    return false;
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched;
    }
  }
};
</script>
