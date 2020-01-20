<template src="./AddProduct/addProductHTML.vue"/>

<script>
  /** Components Injection */
  import ProductStockDetailsTable from "./AddProduct/productStckDetailsTable";
  import PageHeader from "../../../../components/custom/PageHeader";
  import Services from "../../../../Services/apiServices";
  import {ApiCollections, baseURL} from "../../../../config/config";
  import {ModelSelect} from "vue-search-select";
  import Multiselect from "vue-multiselect";
  import Switches from "vue-switches";
  import VueUploadMultipleImage from "vue-upload-multiple-image";
  import {Constants} from "../../../../constants/index";
  import {VueEditor} from "vue2-editor";

  export default {
    name: "AddProduct",
    components: {
      PageHeader,
      ProductStockDetailsTable,
      Switches,
      VueUploadMultipleImage,
      Multiselect,
      ModelSelect,
      VueEditor
    },

    data() {
      return {
        stock_inventories: [],
        size_attributes: [],
        size_selected: [],

        color_attributes: [],
        color_selected: [],

        category_list: [],
        subcategory_list: [],
        child_category_list: [],
        attributes_list: [],

        sku_details: [{}],

        items: [],
        /* main_category_id: null,
                subcategory_id: null,
                child_category_id: null,*/
        main_category_id: null,
        sub_category_id: null,
        category_id: null,
        baseURL: baseURL,
        detail: {
          name: "",
          main_category_id: null,
          sub_category_id: null,
          category_id: null,
          description: null,
          is_active: true,
          stock_inventories: []
        }
      };
    },
    mounted() {
      this.getCategoryList(); // categories_list
      this.getProductAttributeDetailsBuCategoryId(this.category_id ? this.category_id : this.sub_category_id); // categories_list
    },
    methods: {

      /**
       * Create Update Product
       */
      async submitData() {
        if (this.main_category_id) this.detail.main_category_id = this.main_category_id;
        if (this.sub_category_id) this.detail.sub_category_id = this.sub_category_id;
        if (this.category_id) this.detail.category_id = this.category_id;

        // let index;
        // let formData = new FormData();
        // if (this.detail.images && this.detail.images.length) {
        //   /** start  */
        //   for (let i = 0; i < this.detail.images.length; i++) {
        //     let file = this.detail.images[i];
        //     index = file.path.search("data:image");
        //     if (index >= 0) {
        //       let arr = file.path.split(",");
        //       console.log("Arr 1", i, arr);
        //
        //       let mime = arr[0].match(/:(.*?);/)[1];
        //       let bstr = atob(arr[1]);
        //       let n = bstr.length;
        //       let u8arr = new Uint8Array(n);
        //       while (n--) {
        //         u8arr[n] = bstr.charCodeAt(n);
        //       }
        //       formData.append(
        //         "images[]",
        //         new File([u8arr], file.name, {type: mime})
        //       );
        //     }
        //   }
        // }


        console.log("Final Detail this.detail", this.detail);

        this.$Progress.start();
        if (this.detail && this.detail.id) {
          let apiObject = this.$_.clone(ApiCollections.products_update);
          apiObject.url += this.detail.id;

          let res = await Services.call(apiObject).post(formData);

          /** set update data  */
          if (res && res.success && res.success === true) {
            index = this.$_.findIndex(this.lists, {
              id: this.detail.id
            });

            /** stop loader */
            this.$Progress.finish();
            if (index === -1) {
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
            this.detail
          );
          /** set data  */
          if (res && res.success && res.success === true) {
            console.log("Create Success", res.data);
            // this.lists.unshift(res.data);
            // this.totalCount++;
            this.$Progress.finish();
            Services.notify("s", res.message);

            /** clear data */
            this.detail = {
              name: null,
              category_id: null,
              description: null,
              is_active: true,
              // product_attributes: [],
              stock_inventories: []
            };

            /** redirect to home page */
          } else {
            console.log("Create Error", res.data);
            this.$Progress.fail();
            Services.notify("e", res.message);
          }
        }
      },


      getAttributeOptionsForSelection(details) {
        if (details) {
          let options = [];
          _.each(details, function (list, index) {
            if (list) {
              options.push({value: list.id, text: list.name});
            }
          });
          return options;
        }
      },

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
            this.category_list.push({value: list.id, text: list.name});
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
            this[varName].push({value: list.id, text: list.name});
          });
        } else {
          this[varName] = [];
        }
      },

      /**
       * Get Attributes
       */
      async getProductAttributeDetailsBuCategoryId(subcategoryId) {

        let request = {
          subcategory_id: subcategoryId,
          is_parent: true,
          relation: ["subcategory_details"],
          subcategory_details_where: {
            subcategory_ids: subcategoryId,
            is_active: true
          }
        };
        let res = await Services.call(
          ApiCollections.common_products_attributes_list
        ).post(request);
        if (res && res.success === true) {
          let attributes_list = res.data.list;
          this.attributes_list = attributes_list;

          let allParents = [];
          let allChilds = [];

          let sizes = [];

          _.each(attributes_list, (list, index) => {
            /** get size array */
            if (list.code === Constants.SIZE_NAME) {
              let data = this.getAttributesSelectionData(
                list.subcategory_details
              );
              this.size_attributes = data;
            }
            if (list.code === Constants.COLOR_NAME) {
              let data = this.getAttributesSelectionData(
                list.subcategory_details
              );
              this.color_attributes = data;
            }
          });
        } else {
        }
      },
      getAttributesSelectionData(details) {
        let allData = [];
        _.each(details, (subList, index) => {
          allData.push({
            id: subList.id,
            name: subList.name,
            code: subList.id
          });
        });
        return allData;
      },

      toDataURL(url, callback) {
        let xhr = new XMLHttpRequest();
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
      makeStockInputDetails: function () {
        /** make stock details records */

        let stockDetail = [];
        // let stockDetail = [...this.color_selected, this.size_selected];

        _.each(this.size_selected, (size, index) => {
          _.each(this.color_selected, (color, index) => {
            stockDetail.push({
              common_product_attribute_size_id: size.id,
              common_product_attribute_size_name: size.name,
              common_product_attribute_color_id: color.id,
              common_product_attribute_color_name: color.name,
              images: []
            });
          });
        });
        this.detail.stock_inventories = stockDetail;
      },
      removeItemFromStockDetails(index) {
        this.detail.stock_inventories.splice(index, 1);
      }
    },
    watch: {
      'detail.main_category_id'(newVal) {
        /** clear first sub and child category */
        this.subcategory_list = [];
        this.child_category_list = [];
        this.detail.sub_category_id = undefined;
        this.getCategoryListById(parseInt(newVal), "subcategory_list");
      },
      'detail.sub_category_id'(newVal) {
        this.detail.category_id = undefined;
        this.getCategoryListById(parseInt(newVal), "child_category_list");

        if (!this.subcategory_list || this.subcategory_list.length) {
          this.getProductAttributeDetailsBuCategoryId(parseInt(newVal));
        }
      },
      'detail.category_id'(val) {
        this.getProductAttributeDetailsBuCategoryId(parseInt(val));
      }
    }
  };
</script>

<style scoped>
</style>
