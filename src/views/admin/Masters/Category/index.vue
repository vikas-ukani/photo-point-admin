<template>
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
      />
      <div class="card card-body" v-if="lists && lists.length">

        <b-card no-body
        >

          <b-card-header><b>Main Categories</b></b-card-header>

          <b-tabs pills small card vertical nav-wrapper-class="w-25">
            <b-tab v-for="(list, index) in lists" :key="index" :title="list.name"
                   @click="getSubCategoriesList(list.id)">
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
                  <tr v-for="(list, index) in subCategoriesList" :key="index">
                    <td>
                      <b-form-checkbox
                        @change="selectCheckBox(list.id, !list.is_selected  )"
                        v-model="list.is_selected"
                      >{{ ((page * limit) - (limit - (index + 1)) ) }}
                      </b-form-checkbox>
                    </td>

                    <td>
                      <img
                        v-if="list.image && list.image.length && list.image[0]"
                        multiple
                        v-bind:src="list.image[0]"
                        v-bind:alt="list.name"
                        height="150"
                        width="150"
                        class="img-fluid"
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
                    <td>
                      <a
                        v-b-tooltip.hover.left="'Edit ' + list.name"
                        class="text-primary p-0"
                        @click="getDetails(list.id)"
                      >
                        <i class="fa fa-edit"></i>
                      </a>

                      <a
                        v-b-tooltip.hover.left="'Delete ' + list.name"
                        class="link text-danger p-0 ml-1"
                        @click="deleteConfirmation(list)"
                      >
                        <i class="fa fa-trash"/>
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

          <pre>
            {{this.detail}}
          </pre>

        <div class="input-group mb-3 col-md-12">
          <div class="input-group-prepend col-md-12">
            <span class="input-group-text" id="basic-addon1">
              <!--              @change="selectedAllRecords(!allSelectedData)"-->
            <b-form-checkbox
              v-model="this.detail.is_parent"
            > Parent
            </b-form-checkbox>
            </span>
            <div class="input-group">
<!--              @change="changePageLimits($event)"-->
              <select
                :disabled="this.detail.is_parent===false"
                class="form-control "
                v-model="this.detail.parent_id"
                placeholder="Select main category."
              >
<!--                <option value="" selected>Select main category</option>-->
                <option
                  v-for="(list, index) in category_list" :key="index"
                  :value="list.id"
                >
                  {{list.name}}
                 </option>
              </select>
          </div>



          </div>

          <!--          <small v-if="errors.has('name')" class="text-danger mt-1">{{ errors.first('name') }}</small>-->


          <!--          <label for="name" class="text-capitalize ml-3">-->
          <!--            name-->
          <!--            <small-->
          <!--              :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "-->
          <!--            >*</small>-->
          <!--          </label>-->
          <!--          <div class="input-group">-->
          <!--            <input-->
          <!--              type="text"-->
          <!--              id="name"-->
          <!--              name="name"-->
          <!--              required-->
          <!--              class="form-control"-->
          <!--              placeholder="Enter name"-->
          <!--              v-model="detail.name"-->
          <!--              v-validate="'required'"-->
          <!--              :class="{ 'is-invalid': errors.has('name') }"-->
          <!--            />-->
          <!--          </div>-->
          <!--          <small v-if="errors.has('name')" class="text-danger mt-1">{{ errors.first('name') }}</small>-->
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
            />
          </div>
          <small
            v-if="errors.has('description')"
            class="text-danger mt-1"
          >{{ errors.first('description') }}</small>
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
  import {ApiCollections, LIMITS, baseURL} from "../../../../config/config";
  import Switches from "vue-switches";
  import PageHeader from "../../../../components/custom/PageHeader";
  import {async} from "q";
  import apiServices from "../../../../Services/apiServices";

  import VueUploadMultipleImage from "vue-upload-multiple-image";

  export default {
    name: "Products",
    components: {
      Switches,
      VueUploadMultipleImage,
      PageHeader
    },
    data: function () {
      return {
        baseURL: baseURL,
        allSelectedData: false,
        selectedIds: [],
        category_list: [],
        subCategoriesList: [],
        pageLimits: [],
        detail: {
          is_parent: false,
          parent_id: "",
          name: "",
          code: "",
          image: "",
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
                  ApiCollections.products_delete_multiple
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
        let res = await Services.call(ApiCollections.category_list).post({
          is_parent: true
        });

        if (res && res.success === true) {
          this.category_list = res.data.list;
          this.getSubCategoriesList(_.first(this.category_list).id)
        } else {
          this.category_list = [];
        }

        console.log("Categ", this.category_list);
      },

      async getSubCategoriesList(parent_id = null) {
        this.subCategoriesList = [];
        let res = await Services.call(ApiCollections.category_list).post({
          parent_id: parent_id
        });

        if (res && res.success === true) {
          this.subCategoriesList = res.data.list;
        } else {
          this.subCategoriesList = [];
        }

        console.log("Subcategories", this.subCategoriesList);
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
          var index = this.$_.findIndex(this.lists, {id: id});
          var data = this.$_.findWhere(this.lists, {id: id});

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
              this.selectedIds = _.reject(this.selectedIds, function (num) {
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
        let res = await Services.call(ApiCollections.products_get).getOne(id);

        if (res && res.success && res.success == true) {
          this.detail = res.data;
          let imageUrls = res.data.image;

          if (imageUrls && imageUrls.length > 0) {
            this.detail.images = [];
            imageUrls.forEach((imageUrl, index) => {
              this.detail.images[index] = {
                name: `image${index}.png`,
                // name: "vrushik1.png",
                path: imageUrl,
                highlight: 1,
                default: 1
              };

              // this.toDataURL(imageUrl, dataUrl => {
              //   let imageDataIs = {
              //     name: `image${index}.png`,
              //     path: dataUrl,
              //     highlight: 1,
              //     default: 1
              //   };
              //   this.detail.images.push(imageDataIs);
              // });
            });
            console.log("Data are", this.detail.images);
          }

          //         this.detail.images.map(imageUrl => () {
          //           toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
          //   console.log('RESULT:', dataUrl)
          // }),
          //         });

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
        let res = await Services.call(ApiCollections.products_delete).delete(
          list.id
        );
        if (res && res.success && res.success == true) {
          var index = this.$_.findIndex(this.lists, {id: list.id});

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
          var reader = new FileReader();
          reader.onload = e => {
            this.detail.image = e.target.result;
            this.selectedFile = input.files[0];
          };
          reader.readAsDataURL(input.files[0]);
        }

        // console.log(this.detail.image);
      },
      async submitData() {
        let formData = new FormData();

        if (this.detail.images && this.detail.images.length) {
          /** start  */

          for (var i = 0; i < this.detail.images.length; i++) {
            let file = this.detail.images[i];
            var index = file.path.search("data:image");
            if (index >= 0) {
              var arr = file.path.split(",");
              console.log("Arr 1", i, arr);

              var mime = arr[0].match(/:(.*?);/)[1];
              var bstr = atob(arr[1]);
              var n = bstr.length;
              var u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              formData.append(
                "images[]",
                new File([u8arr], file.name, {type: mime})
              );
            }
          }
        }

        formData.append("name", this.detail.name);
        formData.append("category_id", this.detail.category_id);
        formData.append("price", this.detail.price);
        formData.append("size", this.detail.size);
        formData.append("color", this.detail.color);
        formData.append("description", this.detail.description);
        formData.append("is_active", this.detail.is_active);
        // if (this.detail.image) {
        //   formData.append("image", this.detail.image);
        // }
        /*       if (this.selectedFile) {
          formData.append("image", this.selectedFile);
        } */
        // if (this.detail.id) {
        //   formData.append("id", this.detail.id);
        // }

        this.$Progress.start();
        if (this.detail && this.detail.id) {
          var apiObject = this.$_.clone(ApiCollections.products_update);
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
          let res = await Services.call(ApiCollections.products_create).post(
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
        if (search && search.length > 0) {
          request.search = search;
        } else if (this.search && this.search.length > 0) {
          request.search = this.search;
        }

        /** start progress here */
        this.$Progress.start();

        let res = await Services.call(
          // ApiCollections.training_activities_listing
          ApiCollections.category_list
        ).post(request);

        /** check error or success response */
        if (res && res.success && res.success === true) {
          this.lists = res.data.list;

          this.totalCount = parseInt(res.data.count);

          if (this.lists && this.lists.length) {
            /** to set default check box is false */
            this.$_.each(this.lists, function (value, key) {
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
          ApiCollections.products_update_status_change
        ).post(request);

        /** set update data  */
        if (res && res.success && res.success == true) {
          var index = this.$_.findIndex(this.lists, {id: id});

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
      // "detail.name"(newVal) {
      //     if (newVal) {
      //         this.detail.code = this.$_.clone(
      //             newVal.replace(/ /g, "_").toUpperCase()
      //         );
      //     }
      // },
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
