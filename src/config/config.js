require("dotenv");

/**
 * Route prefix
 */
export const route_prefix = "/admin/";
export const dashboardURL = "dashboard";
/**
 * Set Default route
 */
export const default_route = route_prefix + dashboardURL;

/**
 * Base URL
 * api prefix
 */

// export const baseURL =
//   process.env.API_URL ||
//   "http://127.0.0.1:8000";

export const baseURL = "http://localhost:1001";
// export const baseURL = "http://comedyclassroom.com";
export const api_prefix = baseURL + route_prefix;

/**
 * For Listing Dynamically pagination list drop-down
 */
export const LIMITS = [
  {key: "10", value: 10},
  {key: "25", value: 25},
  {key: "50", value: 50},
  {key: "100", value: 100},
  {key: "150", value: 150},
  {key: "300", value: 300},
  {key: "500", value: 500}
];

/**
 * All Module APi Collections
 */
export const ApiCollections = {
  getImage: {method: "get", url: baseURL},

  login: {method: "POST", url: api_prefix + "login"},
  forgotPassword: {method: "POST", url: api_prefix + "forgot-password"},
  changePassword: {method: "POST", url: api_prefix + "change-possword"},

  shopper_listing: {method: "GET", url: api_prefix + "shopper-list"},
  shopper_status_change: {method: "delete", url: api_prefix + "shopper-status-change"},


  users_listing: {method: "GET", url: api_prefix + "users-list"},
  getUserById: {method: "GET", url: api_prefix + "user/"},
  update_user: {
    method: "post",
    url: api_prefix + "user-update",
    headers: {headers: {"content-type": "multipart/form-data"}}
  },
  update_profile: {method: "post", url: api_prefix + "user-profile"},
  upload_image: {
    method: "post",
    url: api_prefix + "upload",
    headers: {headers: {"Content-Type": "multipart/form-data"}}
  },
  users_status_change: {method: "delete", url: api_prefix + "users-status-change"},
  get_users_count_by_type: {method: "get", url: api_prefix + "get-user-count-by-type"},
  /** Masters Countries countries */
  countries_listing: {method: "POST", url: api_prefix + "countries-list"},
  create_countries: {method: "POST", url: api_prefix + "countries-create"},
  update_countries: {method: "put", url: api_prefix + "countries-update/"},
  get_countries: {method: "GET", url: api_prefix + "countries-show/"},
  delete_countries: {method: "delete", url: api_prefix + "countries-delete/"},
  countries_status_change: {method: "delete", url: api_prefix + "countries-status-change"},
  countries_delete_multiple: {
    method: "POST",
    url: api_prefix + "countries-status-delete-many"
  },


  /** Masters Complaint categories */
  complaint_category_listing: {method: "POST", url: api_prefix + "complaint-category-list"},
  create_complaint_category: {method: "POST", url: api_prefix + "complaint-category-create"},
  update_complaint_category: {method: "put", url: api_prefix + "complaint-category-update/"},
  get_complaint_category: {method: "GET", url: api_prefix + "complaint-category-show/"},
  delete_complaint_category: {method: "delete", url: api_prefix + "complaint-category-delete/"},
  complaint_category_status_change: {
    method: "delete",
    url: api_prefix + "complaint-category-status-change"
  },
  complaint_category_delete_multiple: {
    method: "POST",
    url: api_prefix + "complaint-category-delete-multiple"
  },

  /** Categories Apis */
  category_list: {method: "POST", url: api_prefix + "category-list"},
  category_create: {method: "POST", url: api_prefix + "category-create"},
  category_get: {method: "GET", url: api_prefix + "category-show/"},
  category_update: {method: "POST", url: api_prefix + "category-update/"},
  category_delete_multiple: {method: "delete", url: api_prefix + "category-delete-multiple"},
  category_delete: {method: "get", url: api_prefix + "category-delete/"},
  category_update_status_change: {method: "POST", url: api_prefix + "category-status-change"},

  /** categories api */
  categories_list: {method: "POST", url: api_prefix + "categories-list"},

  /**
   * Feature Products List
   */
  feature_product_list: {method: "POST", url: api_prefix + "feature-product-list"},
  feature_product_create: {method: "POST", url: api_prefix + "feature-product-create"},
  feature_product_get: {method: "GET", url: api_prefix + "feature-product-show/"},
  feature_product_update: {method: "POST", url: api_prefix + "feature-product-update/"},
  feature_product_delete_multiple: {method: "delete", url: api_prefix + "feature-product-delete-multiple"},
  feature_product_delete: {method: "get", url: api_prefix + "feature-product-delete/"},
  feature_product_update_status_change: {method: "POST", url: api_prefix + "feature-product-status-change"},

  /**
   * Product Common Attribute APIs
   */
  common_products_attributes_list: {method: "POST", url: api_prefix + "common-products-attributes-list"},
 

  /** products apis */
  products_list: {method: "POST", url: api_prefix + "products-list"},
  products_create: {method: "POST", url: api_prefix + "products-create"},
  products_get: {method: "GET", url: api_prefix + "products-show/"},
  products_update: {method: "POST", url: api_prefix + "products-update/"},
  products_delete_multiple: {method: "delete", url: api_prefix + "products-delete-multiple"},
  products_delete: {method: "get", url: api_prefix + "products-delete/"},
  products_update_status_change: {method: "POST", url: api_prefix + "products-status-change"},

  /**
   * Offer Modules
   */

  /** offers apis */
  offers_list: {method: "POST", url: api_prefix + "offers-list"},
  offers_create: {method: "POST", url: api_prefix + "offers-create"},
  offers_get: {method: "GET", url: api_prefix + "offers-show/"},
  offers_update: {method: "POST", url: api_prefix + "offers-update/"},
  offers_delete_multiple: {
    method: "delete",
    url: api_prefix + "offers-delete-multiple"
  },
  offers_delete: {
    method: "get",
    url: api_prefix + "offers-delete/"
  },
  offers_update_status_change: {
    method: "POST",
    url: api_prefix + "offers-status-change"
  }


};
