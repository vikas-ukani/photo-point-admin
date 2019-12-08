<template>
    <b-card class="animated fadeIn">
        <div class="breadcrumb col-md-12 col-sm-12 col-xs-10 mt-2 mb-2 p-2">
            <div class="font-weight-bold">
                <!-- <label for="title name" class="text-capitalize" v-for="(item, index) in statusTabs" :key="index" >{{  item.name }}</label> -->
                <button
                    :class="{ 'tab-content' :  currentTab == item.name }"
                    class="text-capitalize btn"
                    @click="currentTab = item.name "
                    v-for="(item, index) in statusTabs"
                    :key="index"
                >{{ item.name }}</button>
            </div>
        </div>

        <CustomizedDashboard v-show="currentTab == statusTabsConstant.DASHBOARD " />

        <!-- Users list component call here  -->
        <UsersList v-show="currentTab == statusTabsConstant.USER_LIST" />
    </b-card>
</template>

<script>
import UsersList from "./Users/Index";
import { Constants } from "../constants";
import CustomizedDashboard from "./dashboard/CustomizedDashboard";

export default {
    name: "Dashboard",
    components: {
        UsersList,
        CustomizedDashboard
    },
    beforeMount() {
        _.each(Constants.DashboardTabs, (key, val) => {
            this.statusTabs.push({ name: key, id: val });
        });
        /** set default to dashboard */
        this.currentTab = this.setDefaultTab();
    },
    mounted() {},

    data: function() {
        return {
            statusTabsConstant: Constants.DashboardTabs,
            statusTabs: [],
            currentTab: null
        };
    },
    methods: {
        setDefaultTab() {
            return _.first(this.statusTabs).id;
        }
    }
};
</script>

<style>
.bg-gray-custom-color {
    background-color: #ede9e8;
}
</style>
