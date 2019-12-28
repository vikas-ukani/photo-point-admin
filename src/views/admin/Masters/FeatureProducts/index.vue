<template >
    <div class="animated fadeIn">
        <div class>
            <page-header
                :title="$route.name"
                :titleCounter="totalCount"
                :is_show_serach="true"
                :is_show_add_button="false"
                :is_delete_all="true"
                :selected_ids="selectedIds"
                :is_show_model="true"
                :search="search"
            />
            <!-- :add_route="$route.path + '-add'" -->
            <div class="card card-body" v-if="lists && lists.length">
                <table
                    class="table table-hover table-responsive-sm col-lg-12 col-md-12 col-sm-12 col-xs-12"
                >
                    <thead>
                        <tr>
                            <th nowrap>
                                <b-form-checkbox
                                    @change="selectedAllRecords(!allSelectedData)"
                                    v-model="allSelectedData"
                                >#</b-form-checkbox>
                            </th>
                            <th class="text-capitalize">Image</th>
                            <th class="text-capitalize">Category</th>
                            <th class="text-capitalize">Name</th>
                            <th class="text-capitalize">Price</th>
                            <th class="text-capitalize">Size</th>
                            <th class="text-capitalize">Size Number</th>
                            <th class="text-capitalize">Descriptions</th>
                            <th class="text-capitalize">Status</th>
                            <th class="text-capitalize">Actions</th>
                        </tr>
                    </thead>
                    <tbody v-if="lists && lists.length">
                        <tr v-for="(list, index) in lists" :key="index">
                            <td>
                                <b-form-checkbox
                                    @change="selectCheckBox(list.id, !list.is_selected  )"
                                    v-model="list.is_selected"
                                >{{ ((page * limit) - (limit - (index + 1)) ) }}</b-form-checkbox>
                            </td>

                            <td>
                                <img
                                    v-if="list.product_detail.image && list.product_detail.image.length && list.product_detail.image[0]"
                                    multiple
                                    v-bind:src=" list.product_detail.image[0]"
                                    v-bind:alt="list.product_detail.name"
                                    height="150"
                                    width="150"
                                    class="img-fluid"
                                />
                            </td>
                            <td>
                                <small
                                    class="font-bold"
                                >{{ list.product_detail.category.name || '-' }}</small>
                            </td>
                            <td>
                                <small class="font-bold">{{ list.product_detail.name || '-' }}</small>
                            </td>
                            <td>
                                <small class="font-bold">{{ (list.product_detail.price )|| '-' }}</small>
                            </td>
                            <td>
                                <small class="font-bold">{{ (list.product_detail.size )|| '-' }}</small>
                            </td>
                            <td>
                                <small class="font-bold">{{ (list.product_detail.color )|| '-' }}</small>
                            </td>
                            <td>
                                <small
                                    class="font-bold"
                                >{{ (list.product_detail.description )|| '-' }}</small>
                            </td>
                            <td>
                                <!-- @click="statusChange('is_active', !list.product_detail.is_active, list.id)" -->

                                <span class="p-0 m-0">
                                    <switches
                                        v-model="list.product_detail.is_active"
                                        v-bind:label="(!!list.product_detail.is_active) ? 'Active' : 'Deactive'"
                                        theme="bulma"
                                        color="green"
                                        type-bold="false"
                                    />
                                </span>
                            </td>

                            <td>
                                <a
                                    v-b-tooltip.hover.left="'Edit ' + list.product_detail.name"
                                    class="text-primary p-0"
                                    @click="getDetails(list.id)"
                                >
                                    <i class="fa fa-edit" />
                                </a>

                                <a
                                    v-b-tooltip.hover.left="'Delete ' + list.product_detail.name"
                                    class="link text-danger p-0 ml-1"
                                    @click="deleteConfirmation(list)"
                                >
                                    <i class="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="col-md-12">
                    <span class="col-xl-4 col-sm-4 col-md-4 col-xs-4 pull-left">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <b>Limit:</b>
                                </span>
                            </div>
                            <select
                                class="form-control col-md-4 col-lg-4 col-sm-4"
                                @change="changePageLimits($event)"
                                v-model="limit"
                            >
                                <option
                                    v-for="(limit, index) in pageLimits"
                                    :key="index"
                                    :value="limit.value"
                                    v-show="(totalCount >=  limit.value)"
                                >
                                    {{limit.key}}
                                    <!-- -- {{totalCount }} - {{ limit.value}} -->
                                </option>
                                <option :value="totalCount">
                                    All
                                    <!-- {{ totalCount }} -- {{ limit.value}} -->
                                </option>
                            </select>
                        </div>
                    </span>
                    <span class="col-xl-4 col-sm-4 col-md-4 col-xs-4">
                        Showing
                        <span class="text-primary">{{ ((page * limit) - (limit - 1) ) }}</span>
                        to
                        <b>
                            {{ (totalCount >= ((page * limit)) ? ((page * limit)) : totalCount ) }}
                            <!-- {{ limit >= totalCount ? totalCount : limit }} -->
                        </b> of
                        <span class="text-primary">{{ totalCount }}</span>
                        entries
                    </span>
                    <div class="pull-right">
                        <b-pagination
                            class="col-xl-4 col-sm-4 col-md-4 col-xs-4"
                            v-model="page"
                            :total-rows="totalCount"
                            :per-page="limit"
                            aria-controls="my-table"
                        />
                    </div>
                </div>
            </div>
            <div
                class="no-data-found mt-5 col-md-12 display-4 text-center text-danger"
                v-if="!lists || lists.length == 0"
            >
                <i class="fa fa-warning mr-3"></i>No Data Found
            </div>
        </div>

        <b-modal
            size="lg"
            id="modal-lg"
            :title="((  detail &&  detail.id  ) ? 'Edit ' : 'Add '  )  + $route.name   "
            v-model="showModal"
            okTitle="Save"
            name="addEditForm"
            :okDisabled="!!errors.any()"
            :noCloseOnEsc="true"
            :noCloseOnBackdrop="true"
            @close="clearAllData(); showModal = false"
            @ok="submitData"
        >
            <form
                method="post"
                enctype="multipart/form-data"
                novalidate
                name="addEditForm"
                class="row"
            >
                <div class="input-group mb-3 col-md-12">
                    <label for="product" class="text-capitalize ml-3">
                        products
                        <small
                            :class="!detail.product_id || errors.has('product') ? 'text-danger' : 'text-success' "
                        >*</small>
                    </label>
                    <div class="input-group">
                        <!--  @change="changePageLimits($event)" -->
                        <select class="form-control" v-model="detail.product_id">
                            <!-- <option
                                :selected="!detail.product_id"
                            >Select Any Prodduct to add in feature list</option>-->
                            <option
                                v-show="products_list && products_list.length"
                                v-for="(list, index) in products_list"
                                :key="index"
                                :value="list.id"
                            >{{list.product_detail.name}}</option>

                            <option
                                selected="true"
                                v-if="!products_list || !products_list.length"
                            >No any products found</option>
                        </select>
                    </div>
                    <small
                        v-if="errors.has('product')"
                        class="text-danger mt-1"
                    >{{ errors.first('product') }}</small>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import Services from "../../../../Services/apiServices";
import { ApiCollections, LIMITS, baseURL } from "../../../../config/config";
import Switches from "vue-switches";
import PageHeader from "../../../../components/custom/PageHeader";
import { async } from "q";
import apiServices from "../../../../Services/apiServices";

import VueUploadMultipleImage from "vue-upload-multiple-image";

export default {
    name: "Feature Product",
    components: {
        Switches,
        VueUploadMultipleImage,
        PageHeader
    },
    data: function() {
        return {
            baseURL: baseURL,
            allSelectedData: false,
            selectedIds: [],
            products_list: [],
            pageLimits: [],
            detail: {
                product_id: null
            },
            search: PageHeader.data.search,
            showModal: false,
            totalCount: 0,
            page: 1,
            limit: 10,
            lists: []
        };
    },
    mounted() {
        this.getCategoryList(); // categories_list
    },
    beforeMount() {
        this.limit = LIMITS[0].value;
        this.pageLimits = LIMITS;
        this.getAllList();
    },
    computed: {},
    // computed
    methods: {
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
            var r = confirm("remove image");
            if (r == true) {
                done();
            } else {
            }
        },
        editImage(formData, index, fileList) {
            console.log("edit data", formData, index, fileList);
        },
        async deleteAllFn() {
            var request = {
                ids: this.selectedIds
            };

            this.$swal
                .fire({
                    title: "Are you sure?",
                    text:
                        "You want to delete selected(" +
                        this.selectedIds.length +
                        ") record!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                })
                .then(async result => {
                    if (result.value) {
                        if (this.selectedIds && this.selectedIds.length) {
                            let res = await Services.call(
                                ApiCollections.feature_product_delete_multiple
                            ).deleteMany(request);

                            /**
                             * Check Response
                             */
                            if (res && res.success && res.success == true) {
                                this.$Progress.finish();
                                this.selectedIds = [];
                                this.allSelectedData = false;
                                this.getAllList();

                                Services.notify("s", res.message);
                            } else {
                                this.$Progress.fail();
                                Services.notify("e", res.message);
                            }
                        }
                    }
                });
        },

        async getCategoryList() {
            let res = await Services.call(ApiCollections.products_list).post({
                is_active: true
            });

            if (res && res.success == true) {
                this.products_list = res.data.list;
            } else {
                this.products_list = [];
            }
        },

        changePageLimits(event) {
            this.limit = event.target.value;
            this.selectedIds = [];
            this.allSelectedData = false;
            this.getAllList();
        },
        /**
         * Set to All Check Box true or false
         */
        selectedAllRecords(allSelectedData) {
            var selIds = [];
            if (allSelectedData == true) {
                this.$_.map(this.lists, function(list) {
                    list.is_selected = allSelectedData;
                    selIds.push(list.id);
                });
                this.selectedIds = selIds;
            } else {
                this.$_.map(this.lists, function(list) {
                    list.is_selected = allSelectedData;
                });
                this.selectedIds = [];
            }
        },

        /**
         * Select single record check box
         */
        selectCheckBox(id, value) {
            if (id) {
                var index = this.$_.findIndex(this.lists, { id: id });
                var data = this.$_.findWhere(this.lists, { id: id });

                if (!data) {
                    Services.notify("e", "Records not found");
                    return false;
                }
                /** set list check box to check or uncheck */
                data.is_selected = value;
                /** refresh selected object */
                this.lists.splice(index, 1, data);
                if (value == false) {
                    /** remove id from all selected ids array */
                    if (this.selectedIds && this.selectedIds.length) {
                        this.selectedIds = _.reject(this.selectedIds, function(
                            num
                        ) {
                            return num == id;
                        });
                    }
                    this.allSelectedData = false;
                } else if (value == true) {
                    this.selectedIds.push(id);

                    /** check for all selected count and total count */
                    if (
                        this.selectedIds &&
                        this.selectedIds.length == this.lists.length
                    ) {
                        this.allSelectedData = true;
                    }
                }
            } else {
                Services.notify("e", "Records not found");
                return false;
            }
        },

        /** get details by id */
        async getDetails(id) {
            let res = await Services.call(
                ApiCollections.feature_product_get
            ).getOne(id);

            if (res && res.success && res.success == true) {
                this.detail = res.data;
                let imageUrls = res.data.image;

                if (imageUrls && imageUrls.length > 0) {
                    this.detail.images = [];
                    imageUrls.forEach((imageUrl, index) => {
                        this.detail.images[index] = {
                            name: `image${index}.png`,
                            // name: "vrushik1.png",
                            path: imageUrl,
                            highlight: 1,
                            default: 1
                        };
                    });
                }
                console.log("Details", this.detail);

                this.$Progress.finish();
                // Services.notify("s", res.message);
                this.showModal = true;
            } else {
                this.$Progress.fail();
                Services.notify("e", res.message);
            }
        },

        /**
         * Delete Confirmation
         */
        deleteConfirmation(list) {
            //   this.$swal("Hello Vue world!!!");
            // title: "",
            //
            this.$swal
                .fire({
                    title: "Are you sure?",
                    text:
                        "You want to delete " +
                        list.product_detail.name +
                        " record!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                })
                .then(result => {
                    if (result.value) {
                        this.deleteRecord(list);
                    }
                });
            /** if yes then call false */
            //   this.deleteRecord(id);
        },

        /** delete record from list by id  */
        async deleteRecord(list) {
            if (!list.id) {
                Services.notify("e", "Record details not found");
                return false;
            }
            let res = await Services.call(
                ApiCollections.feature_product_delete
            ).delete(list.id);
            if (res && res.success && res.success == true) {
                var index = this.$_.findIndex(this.lists, { id: list.id });

                /** stop loader */
                this.$Progress.finish();
                if (index == -1) {
                    Services.notify("e", "Record not found in listing");
                    return false;
                }
                this.lists.splice(index, 1);
                this.totalCount--;
                this.$swal.fire(
                    "Deleted!",
                    list.product_detail.name + " record has been deleted.",
                    "success"
                );
            } else {
                Services.notify("e", res.message);
            }
        },
        clearAllData() {
            this.detail = {
                product_id: "",
                is_active: true
            };
        },
        // handleFileUpload(e) {
        //     let input = event.target;
        //     if (input.files && input.files[0]) {
        //         var reader = new FileReader();
        //         reader.onload = e => {
        //             this.detail.image = e.target.result;
        //             this.selectedFile = input.files[0];
        //         };
        //         reader.readAsDataURL(input.files[0]);
        //     }
        // },
        async submitData() {
            let formData = new FormData();

            formData.append("product_id", this.detail.product_id);

            this.$Progress.start();
            if (this.detail && this.detail.id) {
                var apiObject = this.$_.clone(
                    ApiCollections.feature_product_update
                );
                apiObject.url += this.detail.id;

                let res = await Services.call(apiObject).post(formData);

                /** set update data  */
                if (res && res.success && res.success == true) {
                    var index = this.$_.findIndex(this.lists, {
                        id: this.detail.id
                    });

                    /** stop loader */
                    this.$Progress.finish();
                    if (index == -1) {
                        Services.notify("e", "Record not found in listing");
                        return false;
                    }
                    // this.lists.slice(index, 1, this.$_.clone(res.data));

                    this.lists[index] = this.$_.clone(res.data);

                    Services.notify("s", res.message);
                    this.showModal = false;
                    this.detail = {};
                } else {
                    this.$Progress.fail();
                    Services.notify("e", res.message);
                }
            } else {
                /** create data */
                let res = await Services.call(
                    ApiCollections.feature_product_create
                ).post(formData);
                /** set data  */
                if (res && res.success && res.success == true) {
                    this.lists.unshift(res.data);
                    this.totalCount++;
                    this.$Progress.finish();
                    Services.notify("s", res.message);
                    this.showModal = false;
                    this.detail = {};
                } else {
                    this.$Progress.fail();
                    Services.notify("e", res.message);
                }
            }
        },
        clearSearch(value) {},
        pageChangeFn(page = 1) {
            this.selectedIds = [];
            this.allSelectedData = false;
            this.getAllList();
        },

        /**
         * Get All Listing
         */
        async getAllList(search = "") {
            /** make common request */
            var request = {
                page: this.page,
                limit: this.limit,
                relation: [
                    "product_detail",
                    "product_detail.category",
                    "product_detail.customer_rating"
                ]
                // products_list: ["id", "name"]
            };

            /** if search found then send to request */
            if (search && search.length > 0) {
                request.search = search;
            } else if (this.search && this.search.length > 0) {
                request.search = this.search;
            }

            /** start progress here */
            this.$Progress.start();

            let res = await Services.call(
                // ApiCollections.training_activities_listing
                ApiCollections.feature_product_list
            ).post(request);

            /** check error or success response */
            if (res && res.success && res.success === true) {
                this.lists = res.data;

                this.totalCount = parseInt(this.lists.length);
                // this.totalCount = parseInt(res.data.count);

                if (this.lists && this.lists.length) {
                    /** to set default check box is false */
                    this.$_.each(this.lists, function(value, key) {
                        value.is_selected = false;
                    });
                }

                this.$Progress.finish();
            } else {
                this.lists = [];
                this.totalCount = 0;
                this.$Progress.fail();
                // Services.notify("e", res.message);
            }
        },
        async statusChange(key, value, id) {
            let request = {
                id: id
            };
            if (key === "is_active") {
                request.is_active = value;
            }

            let res = await Services.call(
                ApiCollections.feature_product_update_status_change
            ).post(request);

            /** set update data  */
            if (res && res.success && res.success === true) {
                let index = this.$_.findIndex(this.lists, { id: id });

                /** stop loader */
                this.$Progress.finish();
                if (index === -1) {
                    Services.notify("e", "Record not found in listing");
                    return false;
                }
                this.lists.slice(index, 1, res.data);

                Services.notify("s", res.message);
            } else {
                this.$Progress.fail();
                Services.notify("e", res.message);
            }
        },
        getImageLoaded(url) {
            return baseURL + url;
            return false;
            // ApiCollections.getImage.url += url;
            let requestData = ApiCollections.getImage;
            let mainURL = requestData.url + url;
            requestData.url = mainURL;
            // console.log(
            //   "Check Url ",
            //   requestData
            //   // mainURL
            //   // await Services.call(ApiCollections.getImage).get()
            // );

            // return await Services.call(requestData).get();
        }
    },
    watch: {
        // "detail.name"(newVal) {
        //     if (newVal) {
        //         this.detail.code = this.$_.clone(
        //             newVal.replace(/ /g, "_").toUpperCase()
        //         );
        //     }
        // },
        page: function(val) {
            this.pageChangeFn(parseInt(val));
        }
    }
};
</script>

<style scope="">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
