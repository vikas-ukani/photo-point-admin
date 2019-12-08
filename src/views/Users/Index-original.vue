<template >
  <div class="animated fadeIn">
    <div class>
      <PageHeader
        :title="$route.name"
        :titleCounter="totalCount"
        :is_show_serach="true"
        :is_show_add_button="false"
        :is_delete_all="true"
        :is_show_model="false"
        :search="search"
      ></PageHeader>
      <div class="card card-body" v-if="users && users.length">
        <table class="table table-hover table-responsive-sm col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <thead>
            <tr>
              <th nowrap>
                <b-form-checkbox
                  @change="selectedAllRecords(!allSelectedData)"
                  v-model="allSelectedData"
                >#</b-form-checkbox>
              </th>
              <th class="text-capitalize">photo</th>
              <th class="text-capitalize">Name</th>
              <th class="text-capitalize">Email</th>
              <th class="text-capitalize" nowrap>user type</th>
              <th class="text-capitalize">country</th>
              <th class="text-capitalize">Status</th>
              <th class="text-capitalize">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, index) in users" :key="index">
              <td>
                <b-form-checkbox
                  @change="selectCheckBox(list.id, !list.is_selected  )"
                  v-model="list.is_selected"
                >{{ ((page * limit) - (limit - (index + 1)) ) }}</b-form-checkbox>
              </td>
              <td>
                <img
                  v-bind:src="list.photo"
                  v-bind:alt="list.name"
                  height="80"
                  width="80"
                  class="img-avatar"
                />
              </td>
              <td>
                <div>
                  <i class="icon-user"></i>
                  <small class="font-bold">{{ list.name || '-' }}</small>
                </div>
                <div v-if="list.mobile">
                  <i class="icon-phone"></i>
                  <span>{{ list.mobile || '-' }}</span>
                </div>
                <div v-if="list.membership_code">
                  <i class="icon-email"></i>
                  <span class="font-xs">Membership-code : {{ list.membership_code || '-' }}}</span>

                  <!-- <span class="text-info">{{ list.email }}</span> -->
                </div>
              </td>
              <td>
                <span>{{ list.email || '-'}}</span>
              </td>
              <td nowrap>
                <span>{{ list.user_type || '-'}}</span>
              </td>
              <td>
                <span v-if="list.country_detail">{{ list.country_detail.name || '-' }}</span>
                <span v-if="!list.country_detail">-</span>
              </td>
              <td>
                <span class="p-0 m-0" @click="statusChange('is_active', !list.is_active, list.id)">
                  <switches
                    v-model="list.is_active"
                    v-bind:label="list.is_active == true ? 'Active' : 'Deactive'"
                    theme="bulma"
                    color="green"
                    type-bold="false"
                  ></switches>
                </span>
              </td>

              <td>
                <!-- <router-link
                  :to="{ name: 'Edit user', params: { id: list.id }}"
                  v-b-tooltip.hover.left="'Edit ' + list.name"
                >
                  <i class="fa fa-edit"></i>
                </router-link>-->
                <a
                  v-b-tooltip.hover.left="'Delete ' + list.name"
                  a
                  class="link text-danger p-0"
                  @click="deleteConfirmation(list)"
                >
                  <i class="fa fa-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="col-md-12">
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
      </div>
    </div>
    <div
      class="no-data-found mt-5 col-md-12 display-4 text-center text-danger"
      v-if="!users || users.length == 0"
    >
      <i class="fa fa-warning mr-3"></i>No Data Found
    </div>

    <!--/.col-->
  </div>
</template>

<script>
import Services from "../../../Services/apiServices";
import { ApiCollections, LIMITS } from "../../../config/config";
import Switches from "vue-switches";
import PageHeader from "../../../components/custom/PageHeader";

export default {
  name: "Users",
  components: {
    Switches,
    PageHeader
  },
  data: function() {
    return {
      allSelectedData: false,
      selectedIds: [],
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
  },
  beforeMount() {
    this.limit = LIMITS[0].value;
    this.pageLimits = LIMITS;
    this.getAllList();
  },
  // computed
  methods: {
    async deleteAllFn() {
      var request = {
        ids: this.selectedIds
      };

      this.$swal
        .fire({
          title: "Are you sure?",
          text:
            "You want to delete selected(" +
            this.selectedIds.length +
            ") record!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(async result => {
          if (result.value) {
            if (this.selectedIds && this.selectedIds.length) {
              let res = await Services.call(
                ApiCollections.delete_multiple
              ).deleteMany(request);

              /**
               * Check Response
               */
              if (res && res.success && res.success == true) {
                this.$Progress.finish();
                this.selectedIds = [];
                this.allSelectedData = false;
                this.getAllList();

                Services.notify("s", res.message);
              } else {
                this.$Progress.fail();
                Services.notify("e", res.message);
              }
            }
          }
        });
    },
    /**
     * Select single record check box
     */
    selectCheckBox(id, value) {
      if (id) {
        var index = this.$_.findIndex(this.users, { id: id });
        var data = this.$_.findWhere(this.users, { id: id });

        if (!data) {
          Services.notify("e", "Records not found");
          return false;
        }
        /** set list check box to check or uncheck */
        data.is_selected = value;
        /** refresh selected object */
        this.users.splice(index, 1, data);
        if (value == false) {
          /** remove id from all selected ids array */
          if (this.selectedIds && this.selectedIds.length) {
            this.selectedIds = _.reject(this.selectedIds, function(num) {
              return num == id;
            });
          }
          this.allSelectedData = false;
        } else if (value == true) {
          this.selectedIds.push(id);

          /** check for all selected count and total count */
          if (
            this.selectedIds &&
            this.selectedIds.length == this.users.length
          ) {
            this.allSelectedData = true;
          }
        }
      } else {
        Services.notify("e", "Records not found");
        return false;
      }
    },

    changePageLimits(event) {
      this.limit = event.target.value;
      this.selectedIds = [];
      this.allSelectedData = false;
      this.getAllList();
    },
    /**
     * Set to All Check Box true or false
     */
    selectedAllRecords(allSelectedData) {
      var selIds = [];
      if (allSelectedData == true) {
        this.$_.map(this.users, function(list) {
          list.is_selected = allSelectedData;
          selIds.push(list.id);
        });
        this.selectedIds = selIds;
      } else {
        this.$_.map(this.users, function(list) {
          list.is_selected = allSelectedData;
        });
        this.selectedIds = [];
      }
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
        relation: ["country_detail"],
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
    },
    async statusChange(key, value, id) {
      var request = {
        id: id
      };
      if (key == "is_active") {
        request.is_active = value;
      }

      let res = await Services.call(ApiCollections.users_status_change).post(
        request
      );

      /** set update data  */
      if (res && res.success && res.success == true) {
        var index = this.$_.findIndex(this.users, { id: id });

        /** stop loader */
        this.$Progress.finish();
        if (index == -1) {
          Services.notify("e", "Record not found in listing");
          return false;
        }
        this.users.slice(index, 1, res.data);

        Services.notify("s", res.message);
      } else {
        this.$Progress.fail();
        Services.notify("e", res.message);
      }
    }
  }
  // watch: {
  //   is_active: function() {
  //     return false;

  //     if (this.availableMonitoring) {
  //       let dto = {
  //         reportToken: this.report.reportToken,
  //         version: this.report.version
  //       };
  //       this.$store.dispatch("TOGGLE_MONITORING", dto).then(
  //         response => {},
  //         error => {
  //         }
  //       );
  //     } else {
  //       this.toggle = false;
  //       this.noAvailalableMonitoring = true;
  //     }
  //   }
  // }
};
</script>
