<template>
  <div class="breadcrumb col-md-12 col-sm-12 col-xs-10 mt-2 mb-2 p-2">
    <div class="font-weight-bold col-md-4 col-sm-4 col-xs-3 pt-1">
      <label for="title name" class="text-capitalize" v-text="title"></label>
      <!-- <sup class="badge badge-pill badge-primary" v-text="totalCount"></sup> -->
      <sup v-if="titleCounter" class="badge badge-pill badge-primary mt-1" v-text="titleCounter"></sup>
    </div>
    <div class="col-md-8 col-sm-8 col-sm-8">
      <div class="pull-right">
        <!-- col-xl-4 col-md-5 col-sm-5 col-xs-2 -->
        <button
          class="btn btn-outline-warning rounded btn-sm m-1"
          v-if="is_show_update_sequence_button == true"
          @click="$parent.handleUpdateSequence"
        >Update Sequence</button>
        <button
          v-if="is_delete_all == true"
          class="btn btn-danger rounded btn-sm m-1"
          @click="$parent.deleteAllFn"
          :disabled="!(selected_ids && selected_ids.length)"
        >Delete all</button>

        <!-- selected_ids -->
        <router-link
          v-if="is_show_add_button == true "
          :to="add_route"
          class="btn btn-primary rounded m-5 btn-sm"
        >Add</router-link>

        <button
          v-if="is_show_model == true"
          @click="$parent.showModal = true"
          class="btn btn-primary rounded btn-sm"
        >
          <i class="fa fa-plus"></i>
          Add
        </button>
        <router-link v-if="back_route" :to="back_route" class="btn btn-info rounded btn-sm">
          <i class="fa fa-reply"></i>
          <span>Back</span>
        </router-link>
      </div>
      <div v-if="is_show_serach ==true" class="col-xl-8 col-sm-7 col-xs-6 pull-right">
        <form v-on:submit.prevent="searchData(searchText)" class="input-group">
          <button
            type="button"
            class="input-group-addon text-danger pointer-event input-group-text"
            :disabled="!(searchText)"
            @click="clearSearch"
          >
            <i class="fa fa-trash"></i>
          </button>
          <input
            type="search"
            name="search"
            v-model="searchText"
            placeholder="Search here."
            class="form-control"
          />
          <button
            type="button"
            class="input-group-addon text-info input-group-text"
            @click="searchData(searchText)"
          >
            <i class="fa fa-search"></i>
          </button>
          <!-- <a class="search-clear-icon" 
            <i class="fa fa-times-circle text-danger"></i>
          </a>-->
          <!-- <span class="input-group-addon">S</span> -->
        </form>
      </div>
    </div>
    <!-- {{ $route.name }} -->
  </div>
  <!-- <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="(item, index) in list">
      <span class="active" v-if="isLast(index)">{{ showName(item) }}</span>
      <router-link :to="item.path" v-else>{{ showName(item) }}</router-link>
    </li>
  </ol>-->
</template>

<script>
export default {
  name: "PageHeader",
  data: function() {
    return {
      //   search: ""
      searchText: ""
    };
  },
  props: {
    title: {
      type: String,
      required: true,
      default: () => ""
    },
    titleCounter: {
      required: true,
      required: false,
      default: () => ""
    },
    is_show_serach: {
      type: Boolean,
      required: false,
      default: () => false
    },
    is_show_add_button: {
      type: Boolean,
      default: () => false
    },
    is_show_update_sequence_button: {
      type: Boolean,
      default: () => false
    },
    search: {
      type: String,
      required: false,
      default: () => null
    },
    add_route: {
      type: String,
      required: false,
      default: () => ""
    },
    is_delete_all: {
      type: Boolean,
      required: false,
      default: () => false
    },
    is_show_model: {
      type: Boolean,
      required: false,
      default: () => false
    },
    back_route: {
      type: String,
      required: false,
      default: () => ""
    },
    selected_ids: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  watch: {
    watch: {
      searchText() {
        this.search = this.searchText;
      }
      // search(){
      //     if(this.search == false){
      //     this.$parent.$emit('createmodalhide');
      //     }
      // }
    }
    // search: function() {
    //   return false;
    //   var arr = [];
    //   if (typeof this.search !== "undefined") {
    //     //added this because once i passed 3 characters in the field the search variable becomes undefined
    //     if (this.search.length > 0) {
    //       this.$parent.getAllList(this.search);
    //       //   this.$emit("event_child", arr); //emits the array back to parent "eventChild" method
    //     }
    //   }
    // }
  },
  methods: {
    searchData(search) {
      // if (search && search.length) {
      this.$parent.getAllList(search);
      // }
    },
    /** clear search here */
    clearSearch() {
      this.searchText = "";
      this.$parent.getAllList();
    }
  }
};
</script>
<style  type="text/css" scoped>
.search-clear-icon {
  position: absolute;
  right: 25px;
  top: -5px;
  bottom: 0;
  height: 16px;
  margin: auto;
  /* font-size: 14px; */
  cursor: pointer;
  /* color: #ccc; */
}
</style>