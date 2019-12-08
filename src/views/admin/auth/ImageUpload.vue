<template>
  <div class="row mb-3">
    <div class="input-group col-md-4">
      <label for="users" class="text-capitalize">
        Photo
        <small :class="!photo || errors.has('photo') ? 'text-danger' : 'text-success' ">*</small>
      </label>

      <div class="input-group">
        <img v-img="photo" v-bind:src="photo" height="80" width="80" class="img-avatar" />
      </div>
      <div class="input-group pull-left">
        <label class="btn btn-primary" for="file-upload">
          <input id="file-upload" type="file" class="d-none" @change="onFileChanged" />
          Upload
        </label>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  name: "ImageUpload",
  props: {
    photo: {
      type: String,
      default: null
    }
  },
  components: {},
  data: function() {
    return {};
  },
  methods: {
    onFileChanged(event) {
      let input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.selectedFile = e.target.result;
          this.photo = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      // this.selectedFile = event.target.files[0];
    }
  }
};
</script>
  