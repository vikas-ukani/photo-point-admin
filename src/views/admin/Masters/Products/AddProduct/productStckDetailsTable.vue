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


          <!--<ImageUploadComponent   folder_name="products"/>-->

          <input @change="handleFileChange(index)" type="file"/>

          <img :key="imageIndex"
               class="img-avatar"
               height="80"
               v-bind:alt="image"
               v-bind:src="image"
               v-for="(image, imageIndex) in stockList.images"
               width="80"
          />

          <!--          <file-select folder_name="products" v-model="file"></file-select>-->
          <!--          <pre>{{filepath}}</pre>-->
          <!--          <pre v-if="file">{{file}}</pre>-->

          <!--          <img :key="index"-->
          <!--               class="img-avatar"-->
          <!--               height="80"-->
          <!--               v-bind:alt="image"-->
          <!--               v-bind:src="image"-->
          <!--               v-for="(image, imageIndex) in stockList.images"-->
          <!--               width="80"-->
          <!--          />-->
          <!--          <input type="file" @change="handleFileChange"/>-->

          <!--          <input @change="onFileChanged(index, 'products' )" class="btn btn-info " type="file" />-->

          <!--          <button class="btn btn-outline-blue border-dashed w-64-px font-sm" type="button">-->
          <!--            <i class="iconfont icon-plus-circle mr-1"></i>-->
          <!--            <span >Add</span>-->
          <!--          </button>-->

          <!--                      :data-images="stockList.images"
                      @before-remove="beforeRemove"
                      @edit-image="editImage"
                      @upload-success="uploadImageSuccess"-->
          <!--                    <vue-upload-multiple-image-->
          <!--                      size="1"-->
          <!--                      browseText="Select Product Images"-->
          <!--                      dragText="Browse Image"-->
          <!--                      popupText="Uploaded Image"-->
          <!--                      primaryText="Image"-->
          <!--                      @upload-success="onFileChanged(this, index, 'products' )"-->
          <!--                    />-->
        </td>
        <td>
          <!--          <pre>{{errors.has(`stock_sale_price_${index}`)}}</pre>-->
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
  import FileSelect from '../../../../../components/custom/FileSelect'
  import {ApiCollections} from "../../../../../config/config";
  // import ImageUploadComponent from '../../../../../components/custom/ImageuploadComponent'

  export default {
    name: "ProductStockDetailsTable",
    components: {
      VueUploadMultipleImage,
      FileSelect,
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
      handleFileChange(index) {
        // Whenever the file changes, emit the 'input' event with the file data.

        let formData = new FormData();
        formData.append("folder_name", "products");
        formData.append("image", event.target.files[0]);

        /**
         * Call API service to upload image
         */
        axios.post(
          ApiCollections.singleImageUpload.url,
          formData
        ).then(response => {
          if (response.data.success) {
            if (typeof this.stock_details[index].images == 'array') {
              this.stock_details[index].images.push(response.data.data);
            } else {
              this.stock_details[index].images = [response.data.data];
            }
            console.log("Check data", this.stock_details[index].images);
          }
        });
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
