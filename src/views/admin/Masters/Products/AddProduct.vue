<template lang="" src="./AddProduct/addProduct.html" >
</template>




<script>
import PageHeader from "../../../../components/custom/PageHeader";
import Services from "../../../../Services/apiServices";
import { ApiCollections, baseURL } from "../../../../config/config";
// import _ from "vue-underscore";
import { ModelSelect } from "vue-search-select";
import Multiselect from "vue-multiselect";

import Switches from "vue-switches";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import { Constants } from "../../../../constants/index";
import { VueEditor } from "vue2-editor";

export default {
  name: "AddProduct",
  components: {
    PageHeader,
    Switches,
    VueUploadMultipleImage,
    Multiselect,
    ModelSelect,
    VueEditor
  },

  data() {
    return {
      stockDetails: [],

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
      clild_category_id: null,

      baseURL: baseURL,

      detail: {
        name: "",
        category_id: "",
        price: "",
        description: "<h4>Some initial content</h4>",
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

    /**
     * Get Attributes
     */
    async getProductAttributeDetailsBuCategoryId(subcategoryId) {
      console.log("ID Gotted", subcategoryId);
      // return  false;

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

        // let size_attributes = _.findWhere(attributes_list, {
        //   code: Constants.SIZE_NAME
        // });

        // let allParents = this.$_.where(attributes_list, {'parent_id' : null});
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
    },
    makeStockInputDetails() {
      /** make stock details records */
      this.stockDetails = [{}];
      console.log("color_attributes", this.color_attributes);
    }
  },
  watch: {
    main_category_id(newVal) {
      /** clear first sub and child category */
      this.subcategory_list = [];
      this.child_category_list = [];

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
