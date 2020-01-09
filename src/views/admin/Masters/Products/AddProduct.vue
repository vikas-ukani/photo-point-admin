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
          <div class="input-group row col-md-12">
            <div class="mb-3 col-md-12 font-dark">
              <h5>Step 1: Select a category.</h5>
            </div>

            <div class="mb-3 col-md-4">
              <label class="text-capitalize ml-3 font-weight-bold">
                Main Category
                <small
                  :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
                >*</small>
              </label>
              {{main_category_id}}
              <!-- object value -->
              <!-- <model-select
                :options="category_list"
                @change="getCategoryListById(main_category_id, 'subcategory_list')"
                placeholder="Select Main category"
                v-model="main_category_id"
              >-->
              <!--              @click="getCategoryListById(main_category_id, 'subcategory_list')"-->
              <!-- </model-select> -->
            </div>

            <div class="mb-3 col-md-4">
              <div class="col-md-12" v-if="subcategory_list && subcategory_list.length">
                <label class="text-capitalize ml-3 font-weight-bold">
                  Subcategory
                  <small
                    :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <!-- object value -->
                <!-- <model-select
                  :options="subcategory_list"
                  placeholder="Select Sub category"
                  v-model="subcategory_id"
                ></model-select>-->
              </div>
            </div>

            <div class="mb-3 col-md-4">
              <div class="col-md-12" v-if="child_category_list && child_category_list.length">
                <label class="text-capitalize ml-3 font-weight-bold">
                  child category
                  <small
                    :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <!--  {{main_category_id}}-->
                <!-- object value -->
                <!-- <model-select
                  :options="child_category_list"
                  placeholder="Select clild category"
                  v-model="clild_category_id"
                ></model-select>-->
              </div>
            </div>
          </div>

          <!--           v-if="showProductDetails ? showProductDetails : clild_category_id"-->
          <div class="input-group col-12 mt-3 border-top pt-3" id="sticky-reference">
            <h5 class="mb-3">Step 2: Edit Product Information</h5>
            <div class="pb-2 border-bottom border-dark mb-4 col-12">
              <div class="form-group row">
                <div class="input-group pl-0 mb-3 col-md-12">
                  <label class="text-capitalize" for="name">
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
                  <small
                    class="text-danger mt-1"
                    v-if="errors.has('name')"
                  >{{ errors.first('name') }}</small>
                </div>
              </div>
            </div>
            <!-- <component  v-bind:is="multiselect"
                    :value='[
               {"id": "apple", "title": "Яблоко"},
               {"id": "banana", "title": "Banana"},
               {"id": "man", "title": "Jon"}
            ]'   ></component>-->

            <div class="mt-3 mb-3 col-md-12 font-dark">
              <h5>Step 3: Product attributes.</h5>
            </div>

            <label class="typo__label">Simple select / dropdown</label>
            <div v-for="(detail, key) in sku_childs_attributes_list " :key="key">
              <pre>{{detail}}</pre>

              <label class="typo__label">{{kdetail.name}}</label>
              <multiselect
                v-model="items"
                tag-placeholder="Add this as new tag"
                placeholder="Search or add a tag"
                label="name"
                track-by="code"
                :options="[
                      { name: 'Vue.js', code: 'vu' },
                      { name: 'Javascript', code: 'js' },
                      { name: 'Open Source', code: 'os' }
                    ]"
                :multiple="true"
                :taggable="true"
                @tag="addTag('ke')"
              ></multiselect>
            </div>
            <pre class="language-json"><code>{{ items  }}</code></pre>

            <div class="input-group mb-3 col-md-12 border border-secondary p-4">
              <div
                class="input-group col-md-5 border border-info m-3 p-3"
                v-for="(parent, key) in sku_childs_attributes_list"
                :key="key"
              >
                <!-- sku_childs_attributes_list -->
                <label class="text-capitalize" for="price">{{key}} attributes</label>
                <div class="input-group mt-3">
                  <input class="form-control" name="price" readonly type="text" value="key" />
                  <!--   v-model="key" -->
                  <!--                     v-model="sku_parnet_attributes_list_id"-->
                  <!--              @click="getCategoryListById(main_category_id, 'subcategory_list')"-->
                  <!--                  </model-select>-->
                </div>

                <div class="input-group mt-3">
                  <!-- :options="getAttributeOptionsForSelection(parent.subcategory_details)" -->

                  <!-- <component
                    v-bind:is="multiselect"
                    :value="[
               {"id": "apple", "title": "Яблоко"},
               {"id": "banana", "title": "Banana"},
               {"id": "man", "title": "Jon"}
                  ]"   ></component>-->

                  <!-- <multi-select
                    :options="parent[key]['sku_' + key +'_options']"
                    :placeholder="'Select ' + key"
                    :selected-options="parent[key]['sku_' + key +'_items']"
                    @select="onSelect"
                  />-->
                  <!--                                                  :selected-options="parent.parent_items"-->
                  <pre>{{sku_details}}</pre>

                  <!--              @click="getCategoryListById(main_category_id, 'subcategory_list')"-->
                </div>

                <small
                  class="text-danger mt-1"
                  v-if="errors.has('price')"
                >{{ errors.first('price') }}</small>
              </div>
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
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "../../../../components/custom/PageHeader";
import Services from "../../../../Services/apiServices";
import { ApiCollections, baseURL } from "../../../../config/config";
import _ from "lodash";
// import { ModelSelect, MultiSelect } from "vue-search-select";
import Multiselect from "vue-multiselect";

import Switches from "vue-switches";
import VueUploadMultipleImage from "vue-upload-multiple-image";

export default {
  name: "AddProduct",
  components: {
    PageHeader,
    Switches,
    VueUploadMultipleImage,
    Multiselect
    // ModelSelect
  },

  data() {
    return {
      category_list: [],
      subcategory_list: [],
      child_category_list: [],
      attributes_list: [],

      sku_details: [{}],

      sku_parnet_attributes_list: [],
      sku_childs_attributes_list: [],
      items: [],

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
      }
    };
  },
  mounted() {
    this.getCategoryList(); // categories_list
    this.getProductAttributeDetailsBuCategoryId(8); // categories_list
  },
  methods: {
    getAttributeOptionsForSelection(details) {
      if (details) {
        let options = [];
        _.each(details, function(list, index) {
          if (list) {
            options.push({ value: list.id, text: list.name });
          }
        });
        return options;
      }
    },
    // addTag (newTag, key ) {

    //   const tag = {
    //     name: newTag,
    //     code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
    //   }
    //   console.log("New Ta key",key,  tag);

    //   this.options.push(tag)
    //   this.value.push(tag)
    // },

    // onSelect(items, lastSelectItem, key, event) {
    //   this.items = items;
    //   this.parent_items = items;
    //   this.lastSelectItem = lastSelectItem;
    //   console.log("Parnet is d", event, key, this.parent_items);
    //   console.log("Select Change", items, lastSelectItem);
    // },
    setTagValues(key) {
      console.log("Key ", key);
      // this.items = items;
      // this.lastSelectItem = lastSelectItem;
      // console.log("Select Change", this.items, this.lastSelectItem)
    },
    // deselect option
    reset() {
      console.log("Reset Data", this.items);
      this.items = []; // reset
    },
    // select option from parent component
    selectFromParentComponent() {
      this.items = _.unionWith(this.items, [this.options[0]], _.isEqual);
    },

    async getCategoryList() {
      let res = await Services.call(ApiCollections.categories_list).post({
        is_parent: true,
        is_active: true
      });
      if (res && res.success === true) {
        let category_list = res.data.list;
        // this.category_list = res.data.list;
        _.each(category_list, (list, index) => {
          this.category_list.push({ value: list.id, text: list.name });
        });
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
      let res = await Services.call(ApiCollections.categories_list).post(
        request
      );
      if (res && res.success === true) {
        let category_list = res.data.list;

        _.each(category_list, (list, index) => {
          this[varName].push({ value: list.id, text: list.name });
        });
      } else {
        this[varName] = [];
      }
    },

    async getProductAttributeDetailsBuCategoryId(subcategoryId) {
      console.log("ID Gotted", subcategoryId);
      // return  false;

      let request = {
        // subcategory_id:  8,
        subcategory_id: subcategoryId,
        is_parent: true,
        relation: ["subcategory_details"],
        subcategory_details_where: {
          // "subcategory_ids": 8,
          subcategory_ids: subcategoryId,
          is_active: true
        }
      };
      let res = await Services.call(
        ApiCollections.common_products_attributes_list
      ).post(request);
      if (res && res.success === true) {
        let attributes_list = res.data.list;
        this.attributes_list = res.data.list;

        // let allParents = this.$_.where(attributes_list, {'parent_id' : null});
        let allParents = [];
        let allChilds = [];
        _.each(attributes_list, (list, index) => {
          list.parent_items = [];
          // allChilds["sku_" + list.name.toLowerCase()] = [];

          let data_object = {
            name: list.name,
            details: []
          };
          allChilds.push(data_object);
          // allChilds[index][data_object] = [];
          allChilds[index].details[list.name + "_sku_options"] = [];

          // allParents.push({ value: list.id, text: list.name });

          if (list.subcategory_details && list.subcategory_details.length)
            _.each(list.subcategory_details, (list1, index) => {
              list1.child_items = [];
              // console.log("In child", allChilds);

              allChilds[list.name][list.name + "_sku_options"].push({
                value: list1.id,
                text: list1.name
              });
              allChilds[list.name][list.name + "_sku_items"] = [];
            });
        });

        // console.log("Parent ", /* allParents, */ allChilds);
        // this.sku_parnet_attributes_list = allParents;
        this.sku_childs_attributes_list = allChilds;
        console.log(
          "sku_childs_attributes_list",
          // this.sku_parnet_attributes_list,
          this.sku_childs_attributes_list
        );

        // console.log("All Parents with clients", this.attributes_list);
      } else {
        this.sku_parnet_attributes_list = [];
        this.sku_childs_attributes_list = [];
      }
    },
    /** get attribute request list
       /*{
    "subcategory_id": "8",
    "is_parent": true,
    "relation": [
        "subcategory_details"
    ],
    "subcategory_details_where": {
        "subcategory_ids": 8,
        "is_active" : true
    }
}*/

    toDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
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
    }
  },
  watch: {
    main_category_id(newVal) {
      this.getCategoryListById(parseInt(newVal), "subcategory_list");
    },
    subcategory_id(newVal) {
      this.getCategoryListById(parseInt(newVal), "child_category_list");
    },
    clild_category_id(val) {
      this.getProductAttributeDetailsBuCategoryId(parseInt(val));
    }
  }
};
</script>

<style scoped>
</style>
