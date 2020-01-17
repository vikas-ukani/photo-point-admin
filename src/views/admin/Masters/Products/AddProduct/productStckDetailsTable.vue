<!--suppress ALL -->
<template>
  <div>
    <!--      <pre>{{stock_details}}</pre>-->
    <table class="table table-hover" v-if="stock_details.length ">
      <thead>
      <tr>
        <th>#</th>
        <th>Size</th>
        <th>Color</th>
        <th>Image</th>
        <th>Sale Price</th>
        <th>MRP</th>
        <th>Stock</th>
        <th>Action</th>
      </tr>
      </thead>

      <tbody>
      <tr :key="index" v-for="(stockList, index) in stock_details">
        <td>{{index + 1}}</td>
        <td>
          <input
            class="form-control"
            disabled
            name="common_product_attribute_size_name"
            type="text"
            v-model="stockList.common_product_attribute_size_name"
          />
        </td>
        <td>
          <input
            class="form-control"
            disabled
            name="common_product_attribute_color_name"
            type="text"
            v-model="stockList.common_product_attribute_color_name"
          />
        </td>

        <td>

          <input @change="handleFileChange(index)" type="file"/>

          <img :key="imageIndex"
               class="img-avatar"
               height="80"
               v-bind:alt="getFullImage(image)"
               v-bind:src="getFullImage(image)"
               v-for="(image, imageIndex) in stockList.images"
               width="80"
          />

        </td>
        <td>
          <input
            :name="'sale_price' + index "
            class="form-control"
            placeholder="Enter Sale Price "
            type="text"
            v-model="stockList.sale_price"
            v-validate="{required:true}"
          />
          <span aria-hidden="true"
                class="glyphicon glyphicon-remove form-control-feedback"
                v-show="errors.has(`sale_price${index}`)">

          </span>
          <span class="help-block" v-show="`sale_price${index}`">{{ errors.first(`sale_price${index}`) }}
          </span>
          <!--            v-validate="'required'"-->
        </td>
        <td>
          <input
            :name="'mrp_price' +index "
            class="form-control"
            placeholder="Enter MRP Price "
            type="text"
            v-model="stockList.mrp_price"
            v-validate="{required:true}"
          />
          <span aria-hidden="true"
                class="glyphicon glyphicon-remove form-control-feedback"
                v-show="errors.has(`mrp_price${index}`)">
          </span>
          <span class="help-block" v-show="`mrp_price${index}`">{{ errors.first(`mrp_price${index}`) }}
          </span>
        </td>
        <td>
          <input
            :name="'stock_available' +index "
            class="form-control"
            placeholder="Number of available stock "
            type="text"
            v-model="stockList.stock_available"
            v-validate="{required:true}"
          />
          <span aria-hidden="true"
                class="glyphicon glyphicon-remove form-control-feedback"
                v-show="errors.has(`stock_available${index}`)">
          </span>
          <span class="help-block" v-show="`stock_available${index}`">{{ errors.first(`stock_available${index}`) }}
          </span>
        </td>
        <td>
          <button
            @click="$parent.removeItemFromStockDetails(index)"
            class="btn btn-link"
            type="button"
          >Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import VueUploadMultipleImage from "vue-upload-multiple-image";
   import {ApiCollections, baseURL} from "../../../../../config/config";
  import Services from "../../../../../Services/apiServices";
  // import ImageUploadComponent from '../../../../../components/custom/ImageuploadComponent'

  export default {
    name: "ProductStockDetailsTable",
    components: {
      VueUploadMultipleImage,
       // ImageUploadComponent
    },

    props: ['stock_details'],
    data() {
      return {
        file: null,
        filepath: null
      }
    },
    methods: {
      // onFileChanged(index, folderName) {
      //   console.log("Called ", event, index, folderName);
      //   const file = event.target.files[0];
      //   this.selectedFile = event.target.files[0];
      // },
      async handleFileChange(index) {
        // Whenever the file changes, emit the 'input' event with the file data.

        let formData = new FormData();
        formData.append("folder_name", "products");
        formData.append("image", event.target.files[0]);

        /**
         * Call API service to upload image
         */
        let res = await Services.call(ApiCollections.singleImageUpload).post(
          // formData
          formData
        );
        /** set data  */
        if (res && res.success && res.success === true) {
          if (this.stock_details[index].images && this.stock_details[index].images.length) {
            this.stock_details[index].images.push(res.data);
          } else {
            this.stock_details[index].images = [res.data];
          }
        }
      },
      getFullImage(filePath) {
        return baseURL + filePath;
      }
    },
  }
</script>

<style scoped>
  .file-select > .select-button {
    padding: 1rem;

    color: white;
    background-color: #2EA169;

    border-radius: .3rem;

    text-align: center;
    font-weight: bold;
  }

  /* Don't forget to hide the original file input! */
  .file-select > input[type="file"] {
    display: none;
  }
</style>
