<!--<template src="./AddProduct/addProductHTML.vue"/>-->
<template src="./AddProduct/editProductHTML.vue"/>

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
  import _ from 'vue-underscore';

  export default {
    name: "EditProduct",
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
        id: this.$route.params.id,

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

        main_category_id: null,
        subcategory_id: null,
        child_category_id: null,
        baseURL: baseURL,
        detail: {
          name: null,
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
      this.getProductDetailsById();


      this.getCategoryList();

      /** get subcategory list */
      this.getCategoryListById(this.detail.main_category_id, 'subcategory_list');
      this.getCategoryListById(this.detail.sub_category_id, 'child_category_list');

      // this.getProductAttributeDetailsBuCategoryId(this.child_category_id ? this.child_category_id : this.subcategory_id);
    },
    methods: {

      /**
       * Get Product Details By id
       */
      async getProductDetailsById(pid = null) {
        let id = pid == null ? this.id : pid;

        // console.log("PID", id);

        /** get product api */
        let apiObject = this.$_.clone(ApiCollections.products_get);
        apiObject.url += id;

        let res = await Services.call(apiObject).get();

        if (res && res.success) {
          /** get all data here */
          let detail = res.data;

          // if (this.main_category_id) this.detail.main_category_id = this.main_category_id;
          // if (this.sub_category_id) this.detail.sub_category_id = this.sub_category_id;
          // if (this.category_id) this.detail.category_id = this.category_id;
          //

          // this.detail = _.clone(detail);

          this.detail.main_category_id = detail.main_category_id;
          this.detail.sub_category_id = detail.sub_category_id;
          this.detail.category_id = detail.category_id;
          this.detail.name = detail.name;
          this.detail.description = detail.description;
          this.detail.is_active = detail.is_active;
          this.detail.stock_inventories = detail.stock_inventories;

          this.$_.each(this.detail.stock_inventories, (stock, index) => {

            /** set size details */
            if (stock && stock.common_product_attribute_size_detail && stock.common_product_attribute_size_detail.name) {
              this.size_selected.push({
                id: stock.common_product_attribute_size_detail.id,
                name: stock.common_product_attribute_size_detail.name,
                code: stock.common_product_attribute_size_detail.id
              });
              stock.common_product_attribute_size_name = stock.common_product_attribute_size_detail.name;
            }

            /** set color details */
            if (stock && stock.common_product_attribute_color_detail && stock.common_product_attribute_color_detail.name) {
              stock.common_product_attribute_color_name = stock.common_product_attribute_color_detail.name;
              this.color_selected.push({
                id: stock.common_product_attribute_color_detail.id,
                name: stock.common_product_attribute_color_detail.name,
                code: stock.common_product_attribute_color_detail.id
              });
            }
          });
        } else {
          this.detail = {};
        }
        // console.log("res", res.data);

      },


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


        this.$_.each(this.detail.stock_inventories, (stock, sindex) => {
          this.$_.each(stock.images, (image, imgIndex) => {
            image = image.replace(baseURL, '');
            console.log("image", image)
          });
        });
        console.log("Final Detail this.detail", this.detail);

        return false;

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
          this.$_.each(details, function (list, index) {
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
        this.items = this.$_.unionWith(this.items, [this.options[0]], _.isEqual);
      },

      async getCategoryList() {
        let res = await Services.call(ApiCollections.categories_list).post({
          is_parent: true,
          is_active: true
        });
        if (res && res.success === true) {
          let category_list = res.data.list;
          // this.category_list = res.data.list;
          this.$_.each(category_list, (list, index) => {
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

          this.$_.each(category_list, (list, index) => {
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

          this.$_.each(attributes_list, (list, index) => {
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
        this.$_.each(details, (subList, index) => {
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

        console.log("this.detail.stock_inventories", this.detail.stock_inventories);
        this.$_.each(this.size_selected, (size, s_index) => {
          this.$_.each(this.color_selected, (color, i) => {

            let index = this.$_.findIndex(this.detail.stock_inventories, {
              common_product_attribute_size_id: size.id,
              common_product_attribute_color_id: color.id
            });

            /** if index not found then create new empty record */
            if (index === -1) {
              this.detail.stock_inventories.push({
                common_product_attribute_size_id: size.id,
                common_product_attribute_size_name: size.name,
                common_product_attribute_color_id: color.id,
                common_product_attribute_color_name: color.name,
                images: []
              })
            }
          });
        });
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
        this.subcategory_id = undefined;
        this.getCategoryListById(parseInt(newVal), "subcategory_list");
      },
      'detail.sub_category_id'(newVal) {
        this.child_category_id = undefined;
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
