<template>
  <div class="animated fadeIn">
    <div class>
      <page-header
        :is_delete_all="false"
        :is_show_add_button="false"
        :is_show_model="false"
        :is_show_serach="false"
        :title="$route.name"
        back_route="/products"
      />

      <div class="card card-body">
        <form class="row" enctype="multipart/form-data" method="post" name="addEditForm" novalidate>
          <div class="input-group mb-3 col-md-4">
            <label class="text-capitalize ml-3 font-weight-bold">
              Main Category
              <small
                :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            {{main_category_id}}
            <!-- object value -->
            <model-select :options="category_list"
                          @change="getCategoryListById(main_category_id, 'subcategory_list')"
                          placeholder="Select Main category"
                          v-model="main_category_id"
            >
              <!--              @click="getCategoryListById(main_category_id, 'subcategory_list')"-->
            </model-select>
          </div>

          <div class="input-group mb-3 col-md-4">
            <div class="col-md-12" v-if="subcategory_list && subcategory_list.length">
              <label class="text-capitalize ml-3 font-weight-bold">
                Subcategory
                <small
                  :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
                >*</small>
              </label>
              <!-- object value -->
              <model-select :options="subcategory_list"
                            placeholder="Select Sub category"
                            v-model="subcategory_id">
              </model-select>
            </div>
          </div>

          <div class="input-group mb-3 col-md-4">
            <div  class="col-md-12" v-if="child_category_list && child_category_list.length">
              <label class="text-capitalize ml-3 font-weight-bold">
                child category
                <small
                  :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
                >*</small>
              </label>
              <!--  {{main_category_id}}-->
              <!-- object value -->
              <model-select :options="child_category_list"
                            placeholder="Select clild category"
                            v-model="clild_category_id">
              </model-select>
            </div>
          </div>




          <div class="input-group mb-3 col-md-6">
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

          <div class="input-group mb-3 col-md-6">
            <label class="text-capitalize ml-3" for="category">
              category
              <small
                :class="!detail.category || errors.has('category') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
              <!--  @change="changePageLimits($event)" -->
              <!--              <select class="form-control" v-model="detail.category_id">-->
              <!--                <option-->
              <!--                  :key="index"-->
              <!--                  :value="list.id"-->
              <!--                  v-for="(list, index) in category_list"-->
              <!--                  v-show="category_list && category_list.length"-->
              <!--                >{{list.name}}-->
              <!--                </option>-->

              <!--                <option-->
              <!--                  selected="true"-->
              <!--                  v-if="!category_list || !category_list.length"-->
              <!--                >No any category found-->
              <!--                </option>-->
              <!--              </select>-->
            </div>
            <small
              class="text-danger mt-1"
              v-if="errors.has('category')"
            >{{ errors.first('category') }}</small>
          </div>

          <div class="input-group mb-3 col-md-6">
            <label class="text-capitalize ml-3" for="price">
              price
              <small
                :class="!detail.price || errors.has('price') ? 'text-danger' : 'text-success' "
              >*</small>
            </label>
            <div class="input-group">
              <input
                :class="{ 'is-invalid': errors.has('price') }"
                class="form-control"
                id="price"
                name="price"
                placeholder="Enter price"
                required
                type="text"
                v-model="detail.price"
                v-validate="'required|numeric'"
              />
            </div>
            <small class="text-danger mt-1" v-if="errors.has('price')">{{ errors.first('price') }}</small>
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

                    <div class="input-group">
                      <div class="input-group mb-3 col-md-12">
                        <div class="input-group pull-left">
                          <vue-upload-multiple-image
                            :data-images="detail.images"
                            @before-remove="beforeRemove"
                            @edit-image="editImage"
                            @upload-success="uploadImageSuccess"
                            browseText="Select Product Images"
                            dragText="Browse Image"
                            popupText="Uploaded Image"
                            primaryText="Image"
                          />
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
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import PageHeader from "../../../../components/custom/PageHeader";
  import Services from "../../../../Services/apiServices";
  import {ApiCollections, baseURL} from "../../../../config/config";
  import {ModelSelect} from 'vue-search-select'
  import Switches from "vue-switches";
  import VueUploadMultipleImage from "vue-upload-multiple-image";


  export default {
    name: "AddProduct",
    components: {
      PageHeader,
      Switches,
      VueUploadMultipleImage,

      ModelSelect
    },

    data() {
      return {
        category_list: [],
        subcategory_list: [],
        child_category_list: [],
        main_category_id: null,
        subcategory_id: null,
        clild_category_id: null,


        baseURL: baseURL,

        detail: {
          name: "",
          category_id: "",
          price: "",
          description: "",
          is_active: true,
          images: [],
          product_attributes: []
        },
      }
    },
    mounted() {
      this.getCategoryList(); // categories_list
    },
    methods: {
      async getCategoryList() {
        let res = await Services.call(ApiCollections.categories_list).post({
          is_parent: true,
          is_active: true
        });
        if (res && res.success === true) {
          let category_list = res.data.list;
          // this.category_list = res.data.list;
          _.each(category_list, (list, index) => {
            this.category_list.push({value: list.id, text: list.name});
          })
        } else {
          this.category_list = [];
        }
      },

      async getCategoryListById(parent_id, varName = null) {
        // console.log("parent changed ", parent_id, varName);
        let request = {
          parent_id,
          is_active: true
        };
        let res = await Services.call(ApiCollections.categories_list).post(request);
        if (res && res.success === true) {
          let category_list = res.data.list;

          _.each(category_list, (list, index) => {
            this[varName].push({value: list.id, text: list.name});
          })
        } else {
          this[varName] = [];
        }
        console.log(varName, this[varName])
      },



      toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var reader = new FileReader();
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
        console.log("Check Data", formData, index, fileList);
        this.detail.images = fileList;
      },
      beforeRemove(index, done, fileList) {
        this.detail.images = fileList;
        let r = confirm("remove image");
        if (r === true) {
          done();
        } else {
        }
      },
      editImage(formData, index, fileList) {
        console.log("edit data", formData, index, fileList);
      },
    },
    watch: {
      "main_category_id"(newVal) {
        this.getCategoryListById(parseInt(newVal), 'subcategory_list')
      },
      "subcategory_id"(newVal) {
        this.getCategoryListById(parseInt(newVal), 'child_category_list')
      },
    }

  }
</script>

<style scoped>

</style>
