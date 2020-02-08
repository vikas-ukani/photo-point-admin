<template >
  <div class="animated fadeIn">
    <div class>
      <page-header
        :title="$route.name"
        :titleCounter="totalCount"
        :is_show_serach="true"
        :is_show_add_button="false"
        :is_delete_all="true"
        :selected_ids="selectedIds"
        :is_show_model="true"
        :search="search"
      ></page-header>
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
              <th class="text-capitalize">Image</th>
              <th class="text-capitalize">Category</th>
              <th class="text-capitalize">Name</th>
              <th class="text-capitalize">Discount</th>
              <th class="text-capitalize">Description</th>
              <th class="text-capitalize">Valid From</th>
              <th class="text-capitalize">Valid To</th>
              <th class="text-capitalize">Status</th>
              <th class="text-capitalize">Actions</th>
            </tr>
          </thead>
          <tbody v-if="lists && lists.length">
            <tr v-for="(list, index) in lists" :key="index">
              <td>
                <b-form-checkbox
                  @change="selectCheckBox(list.id, !list.is_selected  )"
                  v-model="list.is_selected"
                >{{ ((page * limit) - (limit - (index + 1)) ) }}</b-form-checkbox>
              </td>

              <td>

                <img
                   multiple
                  v-bind:src="list.image"
                  v-bind:alt="list.name"
                  height="150"
                  width="150"
                  class="img-fluid"
                />
              </td>
              <td>
                <small class="font-bold">{{ list.category_detail.name || '-' }}</small>
              </td>
              <td>
                <small class="font-bold">{{ list.name || '-' }}</small>
              </td>
              <td>
                <small class="font-bold">{{ (list.discount + "%" ) || '-' }}</small>
              </td>
              <td>
                <small class="font-bold">{{ (list.description )|| '-' }}</small>
              </td>
              <td>
                <small class="font-bold">{{ (list.valid_from )|| '-' }}</small>
              </td>
              <td>
                <small class="font-bold">{{ (list.valid_to)|| '-' }}</small>
              </td>
              <td>
                <span class="p-0 m-0" @click="statusChange('is_active', !list.is_active, list.id)">
                  <switches
                    v-model="list.is_active"
                    v-bind:label="(!!list.is_active) ? 'Active' : 'Deactive'"
                    theme="bulma"
                    color="green"
                    type-bold="false"
                  ></switches>
                </span>
              </td>
              <td>
                <a
                  v-b-tooltip.hover.left="'Edit ' + list.name"
                  class="text-primary p-0"
                  @click="getDetails(list.id)"
                >
                  <i class="fa fa-edit fa-2x"></i>
                </a>

                <a
                  v-b-tooltip.hover.left="'Delete ' + list.name"
                  class="link text-danger p-0 ml-1"
                  @click="deleteConfirmation(list)"
                >
                  <i class="fa fa-trash fa-2x"></i>
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
      size="lg"
      id="modal-lg"
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
      <form method="post" enctype="multipart/form-data" novalidate name="addEditForm" class="row">
        <div class="input-group mb-3 col-md-6">
          <label for="name" class="text-capitalize ml-3">
            name
            <small
              :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
            >*</small>
          </label>
          <div class="input-group">
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

        <div class="input-group mb-3 col-md-6">
          <label for="category" class="text-capitalize ml-3">
            category
            <small
              :class="!detail.category || errors.has('category') ? 'text-danger' : 'text-success' "
            >*</small>
          </label>
          <div class="input-group">
            <!--  @change="changePageLimits($event)" -->
            <select class="form-control" v-model="detail.category_id">
              <option
                v-show="category_list && category_list.length"
                v-for="(list, index) in category_list"
                :key="index"
                :value="list.id"
              >{{list.name}}</option>

              <option
                selected="true"
                v-if="!category_list || !category_list.length"
              >No any category found</option>
            </select>
          </div>
          <small
            v-if="errors.has('category')"
            class="text-danger mt-1"
          >{{ errors.first('category') }}</small>
        </div>

        <div class="input-group mb-3 col-md-6">
          <label for="code" class="text-capitalize ml-3">
            code
            <small
              :class="!detail.code || errors.has('code') ? 'text-danger' : 'text-success' "
            >*</small>
          </label>
          <div class="input-group">
            <input
              type="text"
              id="code"
              name="code"
              required
              class="form-control"
              placeholder="Enter code "
              v-model="detail.code"
              v-validate="'required'"
              :class="{ 'is-invalid': errors.has('code') }"
            />
          </div>
          <small v-if="errors.has('code')" class="text-danger mt-1">{{ errors.first('code') }}</small>
        </div>

        <div class="input-group mb-3 col-md-6">
          <label for="discount" class="text-capitalize ml-3">
            discount
            <small
              :class="!detail.discount || errors.has('discount') ? 'text-danger' : 'text-success' "
            >*</small>
          </label>
          <div class="input-group">
            <input
              type="text"
              id="discount"
              name="discount"
              required
              class="form-control"
              placeholder="Enter discount"
              v-model="detail.discount"
              v-validate="'required|numeric'"
              :class="{ 'is-invalid': errors.has('discount') }"
            />
          </div>
          <small
            v-if="errors.has('discount')"
            class="text-danger mt-1"
          >{{ errors.first('discount') }}</small>
        </div>

        <!-- Date Picker -->
        <div class="input-group mb-3 col-md-6">
          <label for="valid_from" class="text-capitalize ml-3">
            Valid From
            <small
              :class="!detail.valid_from || errors.has('valid_from') ? 'text-danger' : 'text-success' "
            >*</small>
          </label>
          <div class="input-group">
            <date-picker
              v-model="detail.valid_from"
              :config="optionsFrom"
              placeholder="Select Valid From Date"
            ></date-picker>
          </div>
          <small
            v-if="errors.has('valid_from')"
            class="text-danger mt-1"
          >{{ errors.first('valid_from') }}</small>
        </div>

        <!-- Date Picker -->
        <div class="input-group mb-3 col-md-6">
          <label for="valid_to" class="text-capitalize ml-3">
            Valid To
            <small
              :class="!detail.valid_to || errors.has('valid_to') ? 'text-danger' : 'text-success' "
            >*</small>
          </label>
          <div class="input-group">
            <date-picker
              v-model="detail.valid_to"
              :config="optionsTo"
              placeholder="Select Valid To Date"
            ></date-picker>
          </div>
          <small
            v-if="errors.has('valid_to')"
            class="text-danger mt-1"
          >{{ errors.first('valid_to') }}</small>
        </div>

        <div class="input-group mb-3 col-md-12">
          <label for="description" class="text-capitalize ml-3">
            Description
            <small
              :class="!detail.description || errors.has('description') ? 'text-danger' : 'text-success' "
            >*</small>
          </label>
          <div class="input-group">
            <textarea
              class="form-control"
              required
              placeholder="Enter description"
              name="description"
              id="description"
              cols="20"
              rows="5"
              v-model="detail.description"
              v-validate="'required'"
              :class="{ 'is-invalid': errors.has('description') }"
            ></textarea>
          </div>
          <small
            v-if="errors.has('description')"
            class="text-danger mt-1"
          >{{ errors.first('description') }}</small>
        </div>

        <div class="input-group">
          <div class="input-group col-md-12">
            <img
              v-if="detail.image && detail.id"
              v-bind:src="detail.image"
              class="img-thumbnail"
              width="120"
              height="150"
            />
            <div class="input-group pull-left">
              <label class="btn btn-primary btn-sm" for="file-upload">
                <input
                  id="file-upload"
                  type="file"
                  class="d-none"
                  v-on:change="handleFileUpload"
                  accept="image/png, image/jpeg, image/gif"
                />
                Upload Product Image
              </label>
            </div>
          </div>
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
          <!-- <small
                        v-if="errors.has('name')"
                        class="text-danger mt-1"
          >{{ errors.first('name') }}</small>-->
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Services from "../../../../Services/apiServices";
import { ApiCollections, LIMITS, baseURL } from "../../../../config/config";
import Switches from "vue-switches";
import PageHeader from "../../../../components/custom/PageHeader";
import { async } from "q";
import apiServices from "../../../../Services/apiServices";

// import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import datePicker from "vue-bootstrap-datetimepicker";

export default {
  name: "Offers",
  components: {
    Switches,
    PageHeader,
    // Datepicker
    datePicker
  },
  data: function() {
    return {
      optionsFrom: {
        format: "YYYY-MM-DD h:mm:ss",
        useCurrent: false,
        showClear: true,
        showClose: true
      },
      optionsTo: {
        format: "YYYY-MM-DD h:mm:ss",
        useCurrent: false,
        showClear: true,
        showClose: true
      },
      //   format: "yyyy-mm-dd ",
      baseURL: baseURL,
      allSelectedData: false,
      selectedIds: [],
      category_list: [],
      pageLimits: [],
      detail: {
        name: "",
        category_id: "",
        discount: "",
        code: "",
        description: "",
        image: "",
        valid_from: new Date(),
        valid_to: "",
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
    this.getCategoryList(); // categories_list
  },
  beforeMount() {
    this.limit = LIMITS[0].value;
    this.pageLimits = LIMITS;
    this.getAllList();
  },
  computed: {},
  // computed
  methods: {
    logChangedMonth(date) {
      this.changedMonthLog.push(date);
    },
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
                ApiCollections.offers_delete_multiple
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

    async getCategoryList() {
      let res = await Services.call(ApiCollections.categories_list).post({
        is_active: true
      });

      if (res && res.success == true) {
        this.category_list = res.data.list;
      } else {
        this.category_list = [];
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
      let res = await Services.call(ApiCollections.offers_get).getOne(id);
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
      let res = await Services.call(ApiCollections.offers_delete).delete(
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
      } else {
        Services.notify("e", res.message);
      }
    },
    clearAllData() {
      this.detail = {
        name: "",
        code: "",
        is_active: true
      };
    },
    handleFileUpload(e) {
      let input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.detail.image = e.target.result;
          this.selectedFile = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    async submitData() {
      let formData = new FormData();
      formData.append("name", this.detail.name);
      formData.append("category_id", this.detail.category_id);
      formData.append("discount", this.detail.discount);
      formData.append("code", this.detail.code);
      formData.append("valid_from", this.detail.valid_from);
      formData.append("valid_to", this.detail.valid_to);
      formData.append("description", this.detail.description);
      formData.append("is_active", this.detail.is_active);
      // if (this.detail.image) {
      //   formData.append("image", this.detail.image);
      // }
      if (this.selectedFile) {
        formData.append("image", this.selectedFile);
      }
      // if (this.detail.id) {
      //   formData.append("id", this.detail.id);
      // }

      this.$Progress.start();
      if (this.detail && this.detail.id) {
        var apiObject = this.$_.clone(ApiCollections.offers_update);
        apiObject.url += this.detail.id;

        let res = await Services.call(apiObject).post(formData);

        /** set update data  */
        if (res && res.success && res.success == true) {
          var index = this.$_.findIndex(this.lists, {
            id: this.detail.id
          });

          /** stop loader */
          this.$Progress.finish();
          if (index == -1) {
            Services.notify("e", "Record not found in listing");
            return false;
          }
          // this.lists.slice(index, 1, this.$_.clone(res.data));

          this.lists[index] = this.$_.clone(res.data);
          console.log("Updated Record", res.data, this.lists[index]);

          Services.notify("s", res.message);
          this.showModal = false;
          this.detail = {};
        } else {
          this.$Progress.fail();
          Services.notify("e", res.message);
        }
      } else {
        /** create data */
        let res = await Services.call(ApiCollections.offers_create).post(
          formData
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
        limit: this.limit,
        relation: ["category_detail"],
        category_detail_list: ["id", "name"]
      };

      /** if search found then send to request */
      if (search && search.length > 0) {
        request.search = search;
      } else if (this.search && this.search.length > 0) {
        request.search = this.search;
      }

      /** start progress here */
      this.$Progress.start();

      let res = await Services.call(
        // ApiCollections.training_activities_listing
        ApiCollections.offers_list
      ).post(request);

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

        this.$Progress.finish();
      } else {
        this.lists = [];
        this.totalCount = 0;
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

      let res = await Services.call(
        ApiCollections.offers_update_status_change
      ).post(request);

      /** set update data  */
      if (res && res.success && res.success == true) {
        var index = this.$_.findIndex(this.lists, { id: id });

        /** stop loader */
        this.$Progress.finish();
        if (index == -1) {
          Services.notify("e", "Record not found in listing");
          return false;
        }
        this.lists.slice(index, 1, res.data);

        Services.notify("s", res.message);
      } else {
        this.$Progress.fail();
        Services.notify("e", res.message);
      }
    },
    getImageLoaded(url) {
      return baseURL + url;
      return false;
      // ApiCollections.getImage.url += url;
      let requestData = ApiCollections.getImage;
      let mainURL = requestData.url + url;
      requestData.url = mainURL;
      // console.log(
      //   "Check Url ",
      //   requestData
      //   // mainURL
      //   // await Services.call(ApiCollections.getImage).get()
      // );

      // return await Services.call(requestData).get();
    }
  },
  watch: {
    "detail.code"(newVal) {
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
