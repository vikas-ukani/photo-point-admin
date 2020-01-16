<template>
  <label class="file-select">
    <div class="select-button">
      <span v-if="value">Selected File: {{value.name}}</span>
      <span v-else>Select File</span>
    </div>
    <input @change="handleFileChange" type="file"/>
  </label>
</template>

<script>
  import {ApiCollections} from "../../config/config";

  export default {
    props: {
      folder_name: null,
      value: File
    },

    methods: {
      handleFileChange(e) {

        // console.log("E", e.target.files[0]);
        this.$emit('input', e.target.files[0]);
        // this.$emit('file', e.target.files[0]);

        let formData = new FormData();
        formData.append("folder_name", this.folder_name);
        formData.append("image", e.target.files[0]);

        /**
         * Call API service to upload image
         */
        axios.post(
          ApiCollections.singleImageUpload.url,
          formData
        ).then(response => {

          console.log("RES", response);

          if (response.data.success) {
            console.log("File Input ", response.data.data);

            this.$emit('filepath', response.data.data);


          }
        });
      }
    }
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

  .file-select > input[type="file"] {
    display: none;
  }
</style>

