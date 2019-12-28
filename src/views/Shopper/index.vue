<template >
  <div class="animated fadeIn">
    <div class>
      <PageHeader
        :title="$route.name"
        :titleCounter="totalCount"
        :is_show_serach="true"
        :is_show_add_button="false"
        :is_delete_all="  false"
        :selected_ids="selectedIds"
        :is_show_model="false"
        :search="search"
      ></PageHeader>
      <!-- :add_route="$route.path + '-add'" -->
      <div class="card card-body" v-if="lists && lists.length">
        <table
          class="table table-hover table-responsive-sm col-lg-12 col-md-12 col-sm-12 col-xs-12"
        >
          <thead>
            <tr>
              <th nowrap>
                <b-form-checkbox
                  @change="selectedAllRecords(!allSelectedData)"
                  v-model="allSelectedData"
                >#</b-form-checkbox>
              </th>
              <th class="text-capitalize">Profile</th>
              <th class="text-capitalize">Name</th>
              <th class="text-capitalize">Email</th>
              <th class="text-capitalize">Mobile</th>
              <th class="text-capitalize">Registered at</th>
              <th class="text-capitalize">Approved</th>

              <th class="text-capitalize">Status</th>
              <!-- <th class="text-capitalize">Actions</th> -->
            </tr>
          </thead>
          <tbody v-if="lists &&  lists.length">
            <tr v-for="(list, index) in lists" :key="index">
              <td>
                <b-form-checkbox
                  @change="selectCheckBox(list.id, !list.is_selected  )"
                  v-model="list.is_selected"
                >{{ ((page * limit) - (limit - (index + 1)) ) }}</b-form-checkbox>
              </td>
              <td>
                <img
                  :src="list.photo"
                  :alt="list.first_name"
                  srcset
                  height="80"
                  width="100"
                  class="img-thumbnail"
                />
              </td>
              <td>
                <small class="font-bold">
                  <i class="fa fa-user fa-2x"></i>
                  {{ list.first_name + ' ' + list.last_name || '-' }}
                </small>
              </td>
              <td>
                <small class="font-bold">{{ (list.email )|| '-' }}</small>
              </td>
              <td>
                <div class="font-bold">
                  <i class="fa fa-mobile fa-2x"></i>
                  {{ (list.mobile )|| '-' }}
                </div>
              </td>
              <td>
                <small class="font-bold">{{ (list.created_at )|| '-' }}</small>
              </td>
              <td>
                <span class="p-0 m-0" @click="statusChange('is_approved', !list.is_approved, list.id)">
                  <switches
                    v-model="list.is_approved"
                    v-bind:label="(!!list.is_approved) ? 'Active' : 'Deactivate'"
                    theme="bulma"
                    color="green"
                    type-bold="false"
                  />
                </span>
              </td>
              <td>
                <span class="p-0 m-0" @click="statusChange('is_active', !list.is_active, list.id)">
                  <switches
                    v-model="list.is_active"
                    v-bind:label="(!!list.is_active) ? 'Active' : 'Deactive'"
                    theme="bulma"
                    color="green"
                    type-bold="false"
                  />
                </span>
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
                    v-show="(totalCount >=  limit.value)"
                  >
                    {{limit.key}}
                    <!-- -- {{totalCount }} - {{ limit.value}} -->
                  </option>
                  <option :value="totalCount">
                    All
                    <!-- {{ totalCount }} -- {{ limit.value}} -->
                  </option>
                </select>
              </div>
            </div>
          </span>
          <span class="col-xl-4 col-sm-4 col-md-4 col-xs-4">
            Showing
            <span class="text-primary">{{ ((page * limit) - (limit - 1) ) }}</span>
            to
            <b>
              {{ (totalCount >= ((page * limit)) ? ((page * limit)) : totalCount ) }}
              <!-- {{ limit >= totalCount ? totalCount : limit }} -->
            </b> of
            <span class="text-primary">{{ totalCount }}</span>
            entries
          </span>
          <div class="pull-right">
            <b-pagination
              class="col-xl-4 col-sm-4 col-md-4 col-xs-4"
              v-model="page"
              :total-rows="totalCount"
              :per-page="limit"
              aria-controls="my-table"
            ></b-pagination>
          </div>
        </div>
      </div>
      <div
        class="no-data-found mt-5 col-md-12 display-4 text-center text-danger"
        v-if="!lists || lists.length == 0"
      >
        <i class="fa fa-warning mr-3"></i>No Data Found
      </div>
    </div>

    <b-modal
      :title="((  detail &&  detail.id  ) ? 'Edit ' : 'Add '  )  + $route.name   "
      v-model="showModal"
      okTitle="Save"
      name="addEditForm"
      :okDisabled="!!errors.any()"
      :noCloseOnEsc="true"
      :noCloseOnBackdrop="true"
      @close="clearAllData(); showModal = false"
      @ok="submitData"
    >
      <form method="post" novalidate name="addEditForm">
        <div class="col-md-12">
          <div class="input-group mb-3">
            <label for="name" class="text-capitalize ml-3">
              name
              <small
                :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group col-md-12">
              <input
                type="text"
                id="name"
                name="name"
                required
                class="form-control"
                placeholder="Enter name"
                v-model="detail.name"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('name') }"
              />
            </div>
            <small v-if="errors.has('name')" class="text-danger mt-1">{{ errors.first('name') }}</small>
          </div>

          <div class="input-group mb-3">
            <label for="code" class="text-capitalize ml-3">
              code
              <small
                :class="!detail.code || errors.has('code') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group col-md-12">
              <input
                type="text"
                id="code"
                name="code"
                v-model="detail.code"
                required="required"
                placeholder="Enter code"
                class="form-control"
                aria-required="true"
                aria-invalid="true"
                v-validate="'required|max:2'"
                :class="{ 'is-invalid': errors.has('code') }"
              />
            </div>
            <small v-if="errors.has('code')" class="text-danger mt-1">{{ errors.first('code') }}</small>
          </div>

          <div class="input-group mb-3">
            <label for="country_code" class="text-capitalize ml-3">
              Country code
              <small
                :class="!detail.country_code || errors.has('country_code') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group col-md-12">
              <input
                type="text"
                id="country_code"
                name="country_code"
                v-model="detail.country_code"
                required="required"
                placeholder="Enter country code"
                class="form-control"
                aria-required="true"
                aria-invalid="true"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('country_code') }"
              />
            </div>
            <small
              v-if="errors.has('country_code')"
              class="text-danger mt-1"
            >{{ errors.first('country_code') }}</small>
          </div>

          <div class="input-group mb-3">
            <label for="name" class="text-capitalize ml-3">
              Active
              <!-- <small
                          :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
              >*</small>-->
            </label>
            <div class="input-group col-md-12">
              <switches
                v-model="detail.is_active"
                v-bind:label="detail.is_active == true ? 'Active' : 'Deactive'"
                theme="bulma"
                color="green"
                type-bold="false"
              ></switches>
            </div>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Services from "@/Services/apiServices";
import { ApiCollections, LIMITS } from "@/config/config";
import Switches from "vue-switches";
import PageHeader from "@/components/custom/PageHeader";
import { isString } from "util";
import apiServices from "@/Services/apiServices";

export default {
  name: "ActionForce",
  components: {
    Switches,
    PageHeader
  },
  data: function() {
    return {
      allSelectedData: false,
      selectedIds: [],
      pageLimits: [],
      detail: {
        name: "",
        code: "",
        country_code: "",
        is_active: true
      },
      search: PageHeader.data.search,
      showModal: false,
      totalCount: 0,
      page: 1,
      limit: 10,
      lists: []
    };
  },
  mounted() {
    // this.getAllList();
  },
  beforeMount() {
    this.limit = LIMITS[0].value;
    this.pageLimits = LIMITS;
    this.getAllList();
  },
  computed: {},
  // computed
  methods: {
    async deleteAllFn() {
      var request = {
        ids: this.selectedIds
      };

      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You want to delete selected record!",
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
                ApiCollections.shopper_delete_multiple
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
        this.$_.map(this.lists, function(list) {
          list.is_selected = allSelectedData;
          selIds.push(list.id);
        });
        this.selectedIds = selIds;
      } else {
        this.$_.map(this.lists, function(list) {
          list.is_selected = allSelectedData;
        });
        this.selectedIds = [];
      }
    },

    /**
     * Select single record check box
     */
    selectCheckBox(id, value) {
      if (id) {
        var index = this.$_.findIndex(this.lists, { id: id });
        var data = this.$_.findWhere(this.lists, { id: id });

        if (!data) {
          Services.notify("e", "Records not found");
          return false;
        }
        /** set list check box to check or uncheck */
        data.is_selected = value;
        /** refresh selected object */
        this.lists.splice(index, 1, data);
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
            this.selectedIds.length == this.lists.length
          ) {
            this.allSelectedData = true;
          }
        }
      } else {
        Services.notify("e", "Records not found");
        return false;
      }
    },

    /** get details by id */
    async getDetails(id) {
      let res = await Services.call(ApiCollections.get_shopper).getOne(id);
      this.detail = res.data;
      if (res && res.success && res.success == true) {
        this.detail = res.data;
        this.$Progress.finish();
        // Services.notify("s", res.message);
        this.showModal = true;
      } else {
        this.$Progress.fail();
        Services.notify("e", res.message);
      }
    },

    /**
     * Delete Confirmation
     */
    deleteConfirmation(list) {
      //   this.$swal("Hello Vue world!!!");
      // title: "",
      //
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You want to delete " + list.name + " record!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.deleteRecord(list);
          }
        });
      /** if yes then call false */
      //   this.deleteRecord(id);
    },

    /** delete record from list by id  */
    async deleteRecord(list) {
      if (!list.id) {
        Services.notify("e", "Record details not found");
        return false;
      }
      let res = await Services.call(ApiCollections.delete_shopper).delete(
        list.id
      );
      if (res && res.success && res.success == true) {
        var index = this.$_.findIndex(this.lists, { id: list.id });

        /** stop loader */
        this.$Progress.finish();
        if (index == -1) {
          Services.notify("e", "Record not found in listing");
          return false;
        }
        this.lists.splice(index, 1);
        this.totalCount--;
        this.$swal.fire(
          "Deleted!",
          list.name + " record has been deleted.",
          "success"
        );
      }
    },
    clearAllData() {
      this.detail = {
        name: "",
        code: "",
        is_active: true
      };
    },
    async submitData() {
      this.$Progress.start();
      if (this.detail && this.detail.id) {
        var apiObject = this.$_.clone(ApiCollections.update_shopper);
        apiObject.url += this.detail.id;

        let res = await Services.call(apiObject).update(this.detail);
        /** set update data  */
        if (res && res.success && res.success == true) {
          var index = this.$_.findIndex(this.lists, { id: this.detail.id });

          /** stop loader */
          this.$Progress.finish();
          if (index == -1) {
            Services.notify("e", "Record not found in listing");
            return false;
          }
          // this.lists.slice(index, 1, this.$_.clone(res.data));

          this.lists[index] = this.$_.clone(res.data);
          Services.notify("s", res.message);
          this.showModal = false;
          this.detail = {};
        } else {
          this.$Progress.fail();
          Services.notify("e", res.message);
        }
      } else {
        /** create data */
        let res = await Services.call(ApiCollections.create_shopper).post(
          this.detail
        );
        /** set data  */
        if (res && res.success && res.success == true) {
          this.lists.unshift(res.data);
          this.totalCount++;
          this.$Progress.finish();
          Services.notify("s", res.message);
          this.showModal = false;
          this.detail = {};
        } else {
          this.$Progress.fail();
          Services.notify("e", res.message);
        }
      }
    },
    clearSearch(value) {},
    pageChangeFn(page = 1) {
      this.selectedIds = [];
      this.allSelectedData = false;
      this.getAllList();
    },

    /**
     * Get All Listing
     */
    async getAllList(search = "") {
      /** make common request */
      var request = {
        page: this.page,
        limit: this.limit
      };

      /** if search found then send to request */
      if (search && search.length > 0) {
        request.search = search;
        request.search_from = ["id", "first_name", "last_name", "email", "mobile"];
      } else if (this.search && this.search.length > 0) {
        request.search = this.search;
        request.search_from = ["id", "first_name", "last_name", "email", "mobile"];
      }

      /** start progress here */
      this.$Progress.start();
      let res = await Services.call(ApiCollections.shopper_listing).post(
        request
      );

      /** check error or success response */
      if (res && res.success && res.success == true) {
        this.lists = res.data.list;
        this.totalCount = parseInt(res.data.count);

        if (this.lists && this.lists.length) {
          /** to set defalt check box is false */
          this.$_.each(this.lists, function(value, key) {
            value.is_selected = false;
          });
        }

        console.log(this.lists[0]);

        this.$Progress.finish();
      } else {
        this.lists = [];
        this.totalCount = 0;
        this.$Progress.fail();
        // Services.notify("e", res.message);
      }
    },
    async statusChange(key, value, id) {
      let request = {
        id: id
      };
      if (key === "is_active") {
        request.is_active = value;
      }
      if (key === "is_approved") {
        request.is_approved = value;
      }
      let res = await Services.call(ApiCollections.shopper_status_change).post(
        request
      );

      /** set update data  */
      if (res && res.success && res.success === true) {
        let index = this.$_.findIndex(this.lists, { id: id });

        /** stop loader */
        this.$Progress.finish();
        if (index === -1) {
          Services.notify("e", "Record not found in listing");
          return false;
        }
        this.lists.slice(index, 1, res.data);

        Services.notify("s", res.message);
      } else {
        this.$Progress.fail();
        Services.notify("e", res.message);
      }
    }
  },
  watch: {
    "detail.code"(newVal) {
      if (!isString(newVal)) {
        // Services.notify("w", "Only string value allowed");
        return false;
      }
      if (newVal) {
        this.detail.code = this.$_.clone(
          newVal.replace(/ /g, "_").toUpperCase()
        );
      }
    },
    page: function(val) {
      this.pageChangeFn(parseInt(val));
    }
  }
};
</script>

<style scope="">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
