<!--suppress ALL -->
<template>
  <div>

    <!--    v-if="stock_inventories.length "-->
    <table class="table table-hover">
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
      <tr :key="index" v-for="(stockList, index) in stock_inventories "> <!--stock_inventories-->
        <td>{{index + 1}}</td>
        <td width="10%">
          <input
            class="form-control"
            disabled
            name="common_product_attribute_size_name"
            type="text"
            v-model="stockList.common_product_attribute_size_name"
          />
        </td>
        <td width="10%">
          <input
            class="form-control"
            disabled
            name="common_product_attribute_color_name"
            type="text"
            v-model="stockList.common_product_attribute_color_name"
          />
        </td>

        <td width="30%">
          <input @change="handleFileChange(index)" type="file"/>
          <br>
          <!--          class="col-sm-12"-->
          <div class="mt-2 ml-2 mr-2" >
            <img :key="imageIndex"
                 class="img-thumbnail stock-img mr-2 mt-2"
                 style=""
                 v-bind:alt="getFullImage(image)"
                 v-bind:src="getFullImage(image)"
                 v-for="(image, imageIndex) in stockList.images"

            />
          </div>

        </td>
        <td width="10%">
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
        <td width="10%">
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
        <td width="10%">
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

    props: ['stock_inventories'],
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
          if (this.stock_inventories[index].images && this.stock_inventories[index].images.length) {
            this.stock_inventories[index].images.push(res.data);
          } else {
            this.stock_inventories[index].images = [res.data];
          }
        }
      },
      getFullImage(filePath) {
        /** check if base url already in string */
        if (filePath.search(baseURL) >= 0) {
          return filePath
        } else {
          return baseURL + filePath;
        }
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

  .stock-img {
    min-height: 70px;
    min-width: 70px;
    max-height: 70px;
    max-width: 70px;
  }
</style>
