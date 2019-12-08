<template >
  <div class="animated fadeIn">
    <!--<div>
      <PageHeader
        :title="$route.name"
        :titleCounter="totalCount"
        :is_show_serach="true"
        :is_show_add_button="false"
        :is_delete_all="false"
        :is_show_model="false"
        :search="search"
      ></PageHeader>
    </div>-->
    <div class="card card-body pl-0 pr-0 pt-0">
      <div
        v-if="users && users.length"
        v-for="(user, index) in users"
        :key="index"
        class="background-color-grey m-3 p-3 mr-3"
      >
        <div class="row" v-if="user">
          <div class="img-avatar col-md-2">
            <img v-bind:src="user.photo" class="img-avatar" height="100" width="100" />
          </div>
          <div class="col-md-10">
            <div class="row">
              <!-- <div class="col-md-7" v-if="user &&  user.name">
                <label for="name" class="font-weight-bold">{{ user.name }}</label>
              </div>-->
              <div class="col-md-5 mb-2">
                <button style="width:40%" class="btn btn-sm btn-square btn-danger">Block</button>
                <button style="width:40%" class="btn ml-2 btn-sm btn-square btn-primary">Message</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label for="name" class="font-sm">{{ user.email }}</label>
                <label for="name" class="font-sm" v-if="user.date_of_birth">
                  <b class="pl-1 pr-1">|</b>
                  Birth day {{ user.date_of_birth }}
                </label>
                <br />
                <label for="name" class="font-sm">
                  Member since
                  <b>NULL</b>.
                </label>
                <label for="name" class="font-sm" v-if="user.country_detail.name">
                  <b class="pl-2 pr-2">|</b>
                  Country: {{ user.country_detail.name }}
                </label>
                <label for="name" class="font-sm" v-if="user.account_detail.code">
                  <b class="pl-2 pr-2">|</b>
                  Membership: {{ user.account_detail.name }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row"></div>
        <div class="row">
          <div class="col-md-2"></div>
        </div>
        <hr style="border-top: 1px solid #bcb9b8;" />
        <table class="table">
          <tr>
            <td class="text-center">Paid</td>
            <td class="text-center">Wallet</td>
            <td class="text-center">Spend</td>
            <td class="text-center">Log</td>
            <td class="text-center">Client</td>
            <td class="text-center">Followers</td>
          </tr>
          <tr>
            <th class="text-center">$839 NULL</th>
            <th class="text-center">$58 NULL</th>
            <th class="text-center">$58 NULL</th>
            <th class="text-center">58 NULL</th>
            <th class="text-center">58 NULL</th>
            <th class="text-center">58 NULL</th>
          </tr>
        </table>
      </div>
      <div class="col-md-12" v-if="users && users.length">
        <span class="col-xl-4 col-sm-4 col-md-4 col-xs-4 pull-left">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <b>Limit:</b>
              </span>
              <select
                class="form-control col-md-4 col-lg-4 col-sm-4"
                @change="changePageLimits($event)"
                v-model="limit"
              >
                <option
                  v-for="(limit, index) in pageLimits"
                  :key="index"
                  :value="limit.value"
                  v-show=" !limit.value &&  (totalCount >  limit.value)"
                >{{limit.key}}</option>
                <option :value="totalCount">All</option>
              </select>
            </div>
          </div>
        </span>
        <span class="col-xl-4 col-sm-4 col-md-4 col-xs-4">
          Showing
          <span class="text-primary">{{ page }}</span> to
          <b>{{ limit >= totalCount ? totalCount : limit }}</b> of
          <span class="text-primary">{{ totalCount }}</span>
          entries
        </span>
        <div class="pull-right">
          <b-pagination
            class="col-xl-4 col-sm-4 col-md-4 col-xs-4"
            v-model="page"
            @change="pageChangeFn(page)"
            :total-rows="totalCount"
            :per-page="limit"
            aria-controls="my-table"
          ></b-pagination>
        </div>
      </div>
      <div
        v-if=" users.length == 0"
        class="no-data-found mt-5 col-md-12 display-4 text-center text-danger"
      >
        <i class="fa fa-warning mr-3"></i>No Data Found
      </div>
    </div>

    <!--/.col-->
  </div>
</template>

<style scoped>
.background-color-grey {
  background-color: #ede9e8;
}
</style>
 
<script>
import Services from "../../Services/apiServices";
import { ApiCollections, LIMITS } from "../../config/config";
import PageHeader from "../../components/custom/PageHeader";

export default {
  name: "Users",
  components: {
    PageHeader
  },
  data: function() {
    return {
      pageLimits: [],
      totalCount: 0,
      users: [],
      search: PageHeader.data.search,
      page: 1,
      limit: 10
    };
  },
  mounted() {
    this.$Progress.finish();
    this.getAllList();
  },
  beforeMount() {
    this.limit = LIMITS[0].value;
    this.pageLimits = LIMITS;
  },
  // computed
  methods: {
    changePageLimits(event) {
      this.limit = event.target.value;
      this.selectedIds = [];
      this.allSelectedData = false;
      this.getAllList();
    },
    pageChangeFn(page = 1) {
      this.page = page;
      this.getAllList();
    },
    async getAllList(search = "") {
      /** make common request */
      var request = {
        page: this.page,
        limit: this.limit,
        relation: ["country_detail", "account_detail"],
        is_except_current_user: true
      };

      /** if search found then send to request */
      if (search && search.length > 0) {
        request.search = search;
      } else if (this.search && this.search.length > 0) {
        request.search = this.search;
      }

      /** start progress here */
      this.$Progress.start();
      let res = await Services.call(ApiCollections.users_listing).post(request);

      if (res && res.success && res.success == true) {
        this.users = res.data.list;

        this.totalCount = parseInt(res.data.count);

        if (this.users && this.users.length) {
          /** to set defalt check box is false */
          this.$_.each(this.users, function(value, key) {
            value.is_selected = false;
          });
        }

        this.$Progress.finish();
      } else {
        this.users = [];
        this.totalCount = parseInt(this.users.length);
        this.$Progress.fail();
        // Services.notify("e", res.message);
      }
      console.log("this.users", this.users);
    }
  }
};
</script>
