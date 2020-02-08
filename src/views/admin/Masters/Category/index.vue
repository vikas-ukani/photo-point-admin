<template>
  <div class="animated fadeIn">
    <div class>
      <page-header
        :is_delete_all="true"
        :is_show_add_button="false"
        :is_show_model="true"
        :is_show_serach="true"
        :search="search"
        :selected_ids="selectedIds"
        :title="$route.name"
        :titleCounter="totalCount"
      />
      <div class="card card-body" v-if="lists && lists.length">

        <b-card no-body
        >

          <b-card-header><b>Main Categories</b></b-card-header>
          <!--<pre>{{activeCategory}}</pre>-->
          <b-tabs card nav-wrapper-class="w-25" pills small vertical>
            <b-tab :key="index" :title="list.name" @click="getSubCategoriesList(list.id)"
                   v-for="(list, index) in lists">
              <b-card-text>

                <!--                <pre>-->
                <!--                  {{subCategoriesList}}-->
                <!--                </pre>-->
                <!--                col-lg-12 col-md-12 col-sm-12 col-xs-12-->
                <table class="table table-hover table-responsive-sm ">
                  <thead>
                  <tr>
                    <th nowrap>
                      <b-form-checkbox
                        @change="selectedAllRecords(!allSelectedData)"
                        v-model="allSelectedData"
                      >#
                      </b-form-checkbox>
                    </th>
                    <th class="text-capitalize">Image</th>
                    <th class="text-capitalize">Name</th>
                    <th class="text-capitalize">Code</th>
                    <th class="text-capitalize">Descriptions</th>
                    <th class="text-capitalize">Status</th>
                    <th class="text-capitalize">Actions</th>
                  </tr>
                  </thead>
                  <tbody v-if="subCategoriesList && subCategoriesList.length">
                  <tr :key="index" v-for="(list, index) in subCategoriesList">
                    <td>
                      <b-form-checkbox
                        @change="selectCheckBox(list.id, !list.is_selected  )"
                        v-model="list.is_selected"
                      >{{ ((page * limit) - (limit - (index + 1)) ) }}
                      </b-form-checkbox>
                    </td>

                    <td>
                      <img
                        class="img-fluid"
                        height="150"
                        multiple
                        v-bind:alt="list.name"
                        v-bind:src="list.image"
                        v-if="list.image && list.image"
                        width="150"
                      />
                    </td>
                    <td>
                      <small class="font-bold">{{ list.name || '-' }}</small>
                    </td>
                    <td>
                      <small class="font-bold">{{ list.code || '-' }}</small>
                    </td>
                    <td>
                      <small class="font-bold">{{ (list.description )|| '-' }}</small>
                    </td>
                    <td>
                <span @click="statusChange('is_active', !list.is_active, list.id)" class="p-0 m-0">
                  <switches
                    color="green"
                    theme="bulma"
                    type-bold="false"
                    v-bind:label="(!!list.is_active) ? 'Active' : 'Deactive'"
                    v-model="list.is_active"
                  />
                </span>
                    </td>
                    <td>
                      <a
                        @click="getDetails(list.id)"
                        class="text-primary p-0"
                        v-b-tooltip.hover.left="'Edit ' + list.name"
                      >
                        <i class="fa fa-edit fa-2x"></i>
                      </a>

                      <a
                        @click="deleteConfirmation(list)"
                        class="link text-danger p-0 ml-1"
                        v-b-tooltip.hover.left="'Delete ' + list.name"
                      >
                        <i class="fa fa-trash fa-2x"/>
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div
                  class="no-data-found mt-5 col-md-12 display-5 text-center text-danger"
                  v-if="!subCategoriesList || subCategoriesList.length === 0">
                  <i class="fa fa-warning mr-3 mb-3"/>
                  No Subcategories found,
                </div>

              </b-card-text>
            </b-tab>

            <!--          <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>-->
            <!--          <b-tab title="Tab 3"><b-card-text>Tab contents 3</b-card-text></b-tab>-->
          </b-tabs>
        </b-card>
      </div>

      <!-- :add_route="$route.path + '-add'" -->
      <div class="card card-body" v-if="lists && lists.length">

        <div class="col-md-12">
          <span class="col-xl-4 col-sm-4 col-md-4 col-xs-4 pull-left">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  <b>Limit:</b>
                </span>
              </div>
              <select
                @change="changePageLimits($event)"
                class="form-control col-md-4 col-lg-4 col-sm-4"
                v-model="limit"
              >
                <option
                  :key="index"
                  :value="limit.value"
                  v-for="(limit, index) in pageLimits"
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
              :per-page="limit"
              :total-rows="totalCount"
              aria-controls="my-table"
              class="col-xl-4 col-sm-4 col-md-4 col-xs-4"
              v-model="page"
            />
          </div>
        </div>
      </div>
      <div
        class="no-data-found mt-5 col-md-12 display-4 text-center text-danger"
        v-if="!lists || lists.length === 0">
        <i class="fa fa-warning mr-3"/> No Data Found
      </div>
    </div>

    <b-modal
      :noCloseOnBackdrop="true"
      :noCloseOnEsc="true"
      :okDisabled="!!errors.any()"
      :title="((  detail &&  detail.id  ) ? 'Edit ' : 'Add '  )  + $route.name   "
      @close="clearAllData(); showModal = false"
      @ok="submitData"
      id="modal-lg"
      name="addEditForm"
      okTitle="Save"
      size="lg"
      v-model="showModal"
    >
      <form class="row" enctype="multipart/form-data" method="post" name="addEditForm" novalidate>

        <div class="input-group  col-md-12">
          <div class="input-group-prepend  mb-3 col-md-12">
            <span class="input-group-text" id="basic-addon1">
              <!--              @change="selectedAllRecords(!allSelectedData)"-->
            <b-form-checkbox
              @change="stateChange('is_parent', !detail.is_parent)"
              name="is_parent"
              v-model="detail.is_parent"
            > Parent
            </b-form-checkbox>
            </span>
            <div class="input-group">
              <select
                :disabled="detail.is_parent===false"
                class="form-control "
                placeholder="Select main category."
                v-model="detail.parent_id"
              >
                <option
                  :key="index" :value="list.id"
                  v-for="(list, index) in lists"
                >
                  {{list.name}}
                </option>
              </select>
            </div>
          </div>


          <div class="input-group mb-3 col-md-12">
            <label class="text-capitalize ml-3" for="name">
              name
              <small
                :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
              <input
                :class="{ 'is-invalid': errors.has('name') }"
                class="form-control"
                id="name"
                name="name"
                placeholder="Enter name"
                required
                type="text"
                v-model="detail.name"
                v-validate="'required'"
              />
            </div>
            <small class="text-danger mt-1" v-if="errors.has('name')">{{ errors.first('name') }}</small>
          </div>

          <div class="input-group mb-3 col-md-12">
            <label class="text-capitalize ml-3" for="code">
              code
              <small
                :class="!detail.code || errors.has('code') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
              <input
                :class="{ 'is-invalid': errors.has('code') }"
                class="form-control"
                id="code"
                name="code"
                placeholder="Enter code"
                required
                type="text"
                v-model="detail.code"
                v-validate="'required'"
              />
            </div>
            <small class="text-danger mt-1" v-if="errors.has('name')">{{ errors.first('name') }}</small>
          </div>


          <div class="input-group mb-3 col-md-12">
            <label class="text-capitalize ml-3" for="description">
              Description
              <small
                :class="!detail.description || errors.has('description') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
            <textarea
              :class="{ 'is-invalid': errors.has('description') }"
              class="form-control"
              cols="20"
              id="description"
              name="description"
              placeholder="Enter description"
              required
              rows="5"
              v-model="detail.description"
              v-validate="'required'"
            />
            </div>
            <small
              class="text-danger mt-1"
              v-if="errors.has('description')"
            >{{ errors.first('description') }}</small>
          </div>

          <div class="input-group mb-3">
            <label class="text-capitalize ml-3" for="name">
              category image
            </label>
            <div class="input-group col-md-12">
              <div class="input-group pull-left">
                <vue-upload-multiple-image
                  :data-images="detail.images"
                  :multiple=false
                  @edit-image="editImage"
                  @upload-success="uploadImageSuccess"
                  browseText="Select category Images"
                  dragText="Browse Image"
                  popupText="Uploaded Image"
                  primaryText="Image"
                />
                <!--  maxImage=1 -->
              </div>
            </div>
          </div>

          <div class="input-group mb-3">
            <label class="text-capitalize ml-3" for="name">
              Active
              <!-- <small
                            :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
              >*</small>-->
            </label>
            <div class="input-group col-md-12">
              <switches
                color="green"
                theme="bulma"
                type-bold="false"
                v-bind:label="detail.is_active === true ? 'Active' : 'Deactive'"
                v-model="detail.is_active"
              />
            </div>
            <!-- <small
                          v-if="errors.has('name')"
                          class="text-danger mt-1"
            >{{ errors.first('name') }}</small>-->
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
  import Services from "../../../../Services/apiServices";
  import {ApiCollections, baseURL, LIMITS} from "../../../../config/config";
  import Switches from "vue-switches";
  import PageHeader from "../../../../components/custom/PageHeader";
  import VueUploadMultipleImage from "vue-upload-multiple-image";

  export default {
    name: "Category",
    components: {
      Switches,
      VueUploadMultipleImage,

      PageHeader
    },
    data: function () {
      return {
        activeCategory: 1,
        baseURL: baseURL,
        allSelectedData: false,
        selectedIds: [],
        category_list: [],
        subCategoriesList: [],
        pageLimits: [],
        detail: {
          is_parent: false,
          parent_id: null,
          name: "",
          images: [],
          description: "",
          is_active: true,
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
      // this.getCategoryList(); // categories_list
    },
    beforeMount() {
      this.limit = LIMITS[0].value;
      this.pageLimits = LIMITS;
      this.getCategoryList();
    },
    computed: {},
    // computed
    methods: {

      stateChange(key, value) {
        // if (this.detail && this.detail[key]) {
        // this.detail[key] = value;
        this.detail.is_parent = value;
        // console.log("checkbox", this.detail[key])

        // }
      },

      /** Start Image Uploading methods */
      toDataURL(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
          let reader = new FileReader();
          reader.onloadend = function () {
            callback(reader.result);
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
      },

      uploadImageSuccess(formData, index, fileList) {

        this.detail.images = fileList;
      },
      beforeRemove: (index, done, fileList) => {

        this.detail.images = fileList;

        let r = confirm("remove image");
        if (r === true) {
          done();
        } else {
        }
      },
      editImage(formData, index, fileList) {
        // console.log("Edit Image ", formData, index, _.first(fileList));
        this.detail.images[index] = _.first(fileList);
        // this.detail.images = fileList;
      },
      /** End Image Uploading methods */

      async deleteAllFn() {
        let request = {
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
                  ApiCollections.category_delete_multiple
                ).deleteMany(request);

                /**
                 * Check Response
                 */
                if (res && res.success && res.success == true) {
                  this.$Progress.finish();
                  this.selectedIds = [];
                  this.allSelectedData = false;
                  this.getCategoryList();

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
        this.getCategoryList();
      },
      /**
       * Set to All Check Box true or false
       */
      selectedAllRecords(allSelectedData) {
        let selIds = [];
        if (allSelectedData === true) {
          this.$_.map(this.lists, function (list) {
            list.is_selected = allSelectedData;
            selIds.push(list.id);
          });
          this.selectedIds = selIds;
        } else {
          this.$_.map(this.lists, function (list) {
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
          let index = this.$_.findIndex(this.lists, {id: id});
          let data = this.$_.findWhere(this.lists, {id: id});

          if (!data) {
            Services.notify("e", "Records not found");
            return false;
          }
          /** set list check box to check or uncheck */
          data.is_selected = value;
          /** refresh selected object */
          this.lists.splice(index, 1, data);
          if (value === false) {
            /** remove id from all selected ids array */
            if (this.selectedIds && this.selectedIds.length) {
              this.selectedIds = _.reject(this.selectedIds, function (num) {
                return num === id;
              });
            }
            this.allSelectedData = false;
          } else if (value === true) {
            this.selectedIds.push(id);

            /** check for all selected count and total count */
            if (
              this.selectedIds &&
              this.selectedIds.length === this.lists.length
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
        let res = await Services.call(ApiCollections.category_get).getOne(id);

        if (res && res.success && res.success === true) {
          this.detail = res.data;
          let imageUrls = res.data.image;

          if (imageUrls && imageUrls.length > 0) {
            this.detail.images = [];
            // imageUrls.forEach((imageUrl, index) => {
            this.detail.images[0] = {
              name: `image${0}.png`,
              // name: "vrushik1.png",
              path: imageUrls,
              highlight: 1,
              default: 1
            };
            // });
          }
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
        let res = await Services.call(ApiCollections.category_delete).delete(
          list.id
        );
        if (res && res.success && res.success === true) {
          let index = this.$_.findIndex(this.lists, {id: list.id});

          /** stop loader */
          this.$Progress.finish();
          if (index === -1) {
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
          category_id: "",
          price: "",
          size: "",
          color: "",
          description: "",
          is_active: true,
          images: []
        };
        // this.detail.images = [];
      },
      handleFileUpload(e) {
        let input = event.target;
        if (input.files && input.files[0]) {
          let reader = new FileReader();
          reader.onload = e => {
            this.detail.images = e.target.result;
            this.selectedFile = input.files[0];
          };
          reader.readAsDataURL(input.files[0]);
        }
      },
      async submitData() {
        let formData = new FormData();

        let firstFile = this.$_.first(this.detail.images);
        console.log("Image  id ", this.detail.images, this.detail.id);
        let index = firstFile.path.search("data:image");
        if (index >= 0) {
          let arr = firstFile.path.split(",");

          let mime = arr[0].match(/:(.*?);/)[1];
          let bstr = atob(arr[1]);
          let n = bstr.length;
          let u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          formData.append(
            "image",
            new File([u8arr], firstFile.name, {type: mime})
          );
        }


        if (this.detail && this.detail.parent_id) {
          formData.append("parent_id", this.detail.parent_id);
        }
        formData.append("name", this.detail.name);
        formData.append("code", this.detail.code);
        formData.append("description", this.detail.description);
        formData.append("is_active", this.detail.is_active);

        this.$Progress.start();
        if (this.detail && this.detail.id) {
          let apiObject = this.$_.clone(ApiCollections.category_update);
          apiObject.url += this.detail.id;

          let res = await Services.call(apiObject).post(formData);

          /** set update data */
          if (res && res.success && res.success === true) {
            let index;
            if (this.detail && this.detail.parent_id) {
              // this.subCategoriesList[index] = this.$_.clone(res.data);
              index = this.$_.findIndex(this.subCategoriesList, {
                id: this.detail.id
              });
            } else if (this.detail.parent_id == null) {
              // this.lists[index] = this.$_.clone(res.data);
              index = this.$_.findIndex(this.lists, {
                id: this.detail.id
              });
            }

            //subCategoriesList
            // let index = this.$_.findIndex(this.lists, {
            //   id: this.detail.id
            // });

            /** stop loader */
            this.$Progress.finish();
            if (index === -1) {
              Services.notify("e", "Record not found in listing");
              return false;
            }
            // this.lists.slice(index, 1, this.$_.clone(res.data));

            if (res.data.parent_id == null) {
              this.lists[index] = this.$_.clone(res.data);
            } else {
              this.subCategoriesList[index] = this.$_.clone(res.data);
            }
            // this.lists[index] = this.$_.clone(res.data);
            Services.notify("s", res.message);
            this.showModal = false;
            this.detail = {};
          } else {
            this.$Progress.fail();
            Services.notify("e", res.message);
          }
        } else {
          /** create data */
          let res = await Services.call(ApiCollections.category_create).post(
            formData
          );
          /** set data  */
          if (res && res.success && res.success === true) {
            if (res.data.parent_id == null) {
              this.lists.unshift(res.data);
            } else {
              if (this.activeCategory && this.activeCategory === res.data.parent_id)
                this.subCategoriesList.unshift(res.data);
            }
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
      clearSearch(value) {
      },
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
        let request = {
          'is_parent': true
          // page: this.page,
          // limit: this.limit,
          // relation: ["category"],
          // category_list: ["id", "name"]
        };

        /** if search found then send to request */
        /*       if (search && search.length > 0) {
                 delete request.is_parent;
                 request.parent_id = this.activeCategory;
                 request.search = search;
               } else if (this.search && this.search.length > 0) {
                 delete request.is_parent;
                 request.parent_id = this.activeCategory;
                 request.search = this.search;
               }*/
        console.log("Final Request ", request);
        /** start progress here */
        this.$Progress.start();

        let res = await Services.call(
          // ApiCollections.training_activities_listing
          ApiCollections.category_list
        ).post(request);

        /** check error or success response */
        if (res && res.success && res.success === true) {
          // if (search || this.search){
          this.getSubCategoriesList(this.activeCategory, search ? search : this.search);
          // }
          // this.lists = this._.findWhere(res.data, {parent_id: null});
          /*         this.subCategoriesList = _.clone(_.reject(res.data.list, function (data) {
                     return data.parent_id === null || data.parent_id === 0
                   }));*/
          // this.lists = _.clone(_.reject(res.data.list, function (data) {
          //   return data.parent_id > 0
          // }));

          /*   if (!search && !this.search) {
               if (this.lists && this.lists[0] && this.lists[0].id) {
                 this.getSubCategoriesList(this.activeCategory)
               }
             }*/

          // console.log("List", this.subCategoriesList, this.lists, res.data.list);
          // this.subCategoriesList = _.clone(this._.findWhere(res.data, function (data) {
          //   return data.parent_id > 0
          // }));
          // console.log("Subcategory ", this.subCategoriesList);


          // if (this.activeCategory) {
          //   this.subCategoriesList = res.data.list;
          //   // this.totalCount = parseInt(res.data.count);
          //   if (this.subCategoriesList && this.subCategoriesList.length) {
          //     /** to set default check box is false */
          //     this.$_.each(this.subCategoriesList, function (value, key) {
          //       value.is_selected = false;
          //     });
          //   }
          // } else{
          //   this.lists = res.data.list;
          //   this.totalCount = parseInt(res.data.count);
          //   if (this.lists && this.lists.length) {
          //     /** to set default check box is false */
          //     this.$_.each(this.lists, function (value, key) {
          //       value.is_selected = false;
          //     });
          //   }
          // }

          this.$Progress.finish();
        } else {
          console.log("Else Part");
          // this.lists = [];
          this.totalCount = 0;
          this.$Progress.fail();
          // Services.notify("e", res.message);
        }
      },

      async getCategoryList() {
        let res = await Services.call(ApiCollections.category_list).post({
          is_parent: true
        });

        if (res && res.success === true) {
          this.lists = res.data.list;
          await this.getSubCategoriesList(_.first(this.lists).id)
        } else {
          this.lists = [];
        }
      },

      async getSubCategoriesList(parent_id = null, search = null) {
        // activeCategory
        this.activeCategory = parent_id;
        console.log(this.search);
        delete this.search;
        this.subCategoriesList = [];
        let request = {
          parent_id: parent_id
        };
        if (search && search.length > 0) {
          request.search = search
        }
        if (this.search && this.search.length > 0) {
          request.search = this.search
        }
        let res = await Services.call(ApiCollections.category_list).post(request);

        if (res && res.success === true) {
          this.subCategoriesList = res.data.list;
        } else {
          this.subCategoriesList = [];
        }

      },


      async statusChange(key, value, id) {
        let request = {
          id: id
        };
        if (key === "is_active") {
          request.is_active = value;
        }

        let res = await Services.call(
          ApiCollections.category_update_status_change
        ).post(request);

        /** set update data  */
        if (res && res.success && res.success === true) {
          let index;
          if (res.data && res.data.parent_id) {
            index = this.$_.findIndex(this.subCategoriesList, {id: id});
          } else if (res.data.parent_id == null) {
            index = this.$_.findIndex(this.lists, {id: id});
          }

          /** stop loader */
          this.$Progress.finish();
          if (index === -1) {
            Services.notify("e", "Record not found in listing");
            return false;
          }
          if (res.data && res.data.parent_id) {
            this.subCategoriesList.slice(index, 1, res.data);
            // let index = this.$_.findIndex(this.subCategoriesList, {id: id});
          } else if (res.data == null) {
            this.lists.slice(index, 1, res.data);
            // let index = this.$_.findIndex(this.lists, {id: id});
          }
          // this.lists.slice(index, 1, res.data);

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
      "detail.name"(newVal) {
        if (newVal) {
          this.detail.code = this.$_.clone(
            newVal.replace(/ /g, "_").toUpperCase()
          );
        }
      },
      page: function (val) {
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
