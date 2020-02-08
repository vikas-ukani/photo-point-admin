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
              <h5 class="font-weight-bolder">Step 1: Select a category.</h5>
            </div>
            <div class="mb-3 col-md-4">
              <label class="text-capitalize">
                Main Category
                <small
                  :class="!detail.name || errors.has('name') ? 'text-danger' : 'text-success' "
                >*</small>
              </label>
              <!-- <a
                class="pull-right"
                @click="main_category_id = undefined; subcategory_list = [];child_category_list = [] "
              >
                <i class="fa fa-times text-danger"></i>
              </a>-->
              <!-- {{main_category_id}} -->
              <model-select
                :options="category_list"
                @change="getCategoryListById(detail.main_category_id, 'subcategory_list')"
                name="main_category_id"
                placeholder="Select Main category"
                v-model="detail.main_category_id"
              />
            </div>
            <div class="mb-3 col-md-4">
              <div v-if="subcategory_list && subcategory_list.length">
                <label class="text-capitalize">
                  Subcategory
                  <small
                    :class="!detail.sub_category_id || errors.has('sub_category_id') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <model-select
                  :options="subcategory_list"
                  name="sub_category_id"
                  placeholder="Select Sub category"
                  v-model="detail.sub_category_id"
                />
              </div>
            </div>
            <div class="mb-3 col-md-4">
              <div v-if="detail.sub_category_id && child_category_list.length">
                <label class="text-capitalize">
                  child category
                  <small
                    :class="!detail.category_id || errors.has('category_id') ? 'text-danger' : 'text-success' "
                  >*</small>
                </label>
                <model-select
                  :options="child_category_list"
                  name="category_id"
                  placeholder="Select child category"
                  v-model="detail.category_id"
                />
              </div>
            </div>
          </div>

          <div class="input-group col-12 mt-3 border-top pt-3" id="sticky-reference" v-if="detail.category_id">
            <div class="mb-3 col-md-12 font-dark pl-0">
              <h5 class="font-weight-bolder">Step 2: Product Information.</h5>
            </div>
            <div class="pb-2 border-dark mb-4 col-12">
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
          </div>

          <div class="input-group col-12 mt-3 border-top pt-3" v-if="detail.category_id">
            <div class="mb-3 col-md-12 font-dark pl-0">
              <h5 class="font-weight-bolder">Step 3: Product attributes</h5>
            </div>
            <div class="pb-2 border-dark mb-4 col-12">
              <div class="form-group row">
                <div
                  class="input-group mb-3 col-md-6"
                  v-if="size_attributes && size_attributes.length"
                >
                  <label class="text-capitalize" for="size">Size</label>
                  <multiselect
                    :multiple="true"
                    :options="size_attributes"
                    :taggable="true"
                    @tag="addSizeTag('ke')"
                    id="size"
                    label="name"
                    placeholder="Search or add a tag"
                    tag-placeholder="Add this as new tag"
                    track-by="code"
                    v-model="size_selected"
                  />
                </div>

                <div
                  class="input-group mb-3 col-md-6"
                  v-if="color_attributes && color_attributes.length"
                >
                  <label class="text-capitalize" for="size">color</label>
                  <multiselect
                    :multiple="true"
                    :options="color_attributes"
                    :taggable="true"

                    id="color"
                    label="name"
                    placeholder="Search or add a tag"
                    tag-placeholder="Add this as new tag"
                    track-by="code"
                    v-model="color_selected"
                  />
                  <!-- @tag="addColorTag"-->
                </div>
              </div>

              <div class="col-12">
                <div class="pull-right">
                  <button
                    :disabled="(size_selected.length === 0 || color_selected.length === 0)"
                    @click="makeStockInputDetails"
                    class="btn btn-danger"
                    type="button"
                  >Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="input-group col-12 mt-3 border-top pt-3">
            <div class="mb-3 col-md-12 font-dark pl-0">
              <h5 class="font-weight-bolder">Step 4: Product Stock Details</h5>
              <span class="text-danger ml-2 mb-0 font-weight-bold font-italic">Select product attributes first,</span>
            </div>
            <div class="pb-2 border-dark mb-4 col-12">
              <ProductStockDetailsTable :stock_inventories="detail.stock_inventories"/>
            </div>
          </div>

          <div class="input-group col-12 mt-3 border-top pt-3" v-if="detail.category_id">
            <h5 class="mb-3">Description</h5>
            <div class="pb-2 border-dark mb-4 col-12">
              <vue-editor id="editor" v-model="detail.description"/>
            </div>
          </div>


          <div class="input-group col-12 mt-3 pt-3 pb-5" v-if="detail.category_id">
            <div class="input-group mb-3">
              <label class="text-capitalize ml-3" for="name">Active</label>
              <div class="input-group col-md-12">
                <switches
                  color="green"
                  theme="bulma"
                  type-bold="false"
                  v-bind:label="detail.is_active === true ? 'Active' : 'Deactive'"
                  v-model="detail.is_active"
                />
              </div>
            </div>
          </div>


          <div class="col-12" v-if="detail.category_id">
            <div class="pull-right">
              <button @click="clearAllData()" class="btn btn-danger mr-2" type="button">Cancel</button>
              <button
                :disabled="!!errors.any()"
                @click="submitData"
                class="btn btn-success"
                type="button"
              >Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
