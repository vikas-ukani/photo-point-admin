<template>
  <div>
    <!-- <notifications group="foo" /> -->
    <notifications group="foo" position="top center" />
    <router-view />
    <vue-progress-bar />
  </div>
</template>


<!--<link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">-->


<script>
export default {
  name: "App"
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"/>

<style lang="scss">
// CoreUI Icons Set
@import "~@coreui/icons/css/coreui-icons.min.css";
/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";
/* Import Simple Line Icons Set */
$simple-line-font-path: "~simple-line-icons/fonts/";
@import "~simple-line-icons/scss/simple-line-icons.scss";
/* Import Flag Icons Set */
@import "~flag-icon-css/css/flag-icon.min.css";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";
/*@import "~vue-multiselect.min.css";*/

// Import Main styles for this application
@import "./assets/scss/style";

@import "~/pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";

@import "~vue-search-select/dist/VueSearchSelect.css";
</style>
