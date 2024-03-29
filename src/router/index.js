import Vue from "vue";
import Router from "vue-router";
// const store = () => import('@store/index')
import store from "../store"; // your vuex store
// import Login from '../views/admin/auth/LoginComponent'
import ForgotPassword from "../views/admin/auth/ForgotPasswordComponent";
import ChangePassword from "../views/admin/auth/ChangePasswordComponent";
import Full from "../containers/Full";

import Users from "../views/Users/Index";
import EditUsers from "../views/Users/Edit";

import Shopper from "../views/Shopper/";
// Views
import Profile from "../views/admin/auth/Profile";
/** Masters Components */
import Countries from "../views/admin/Masters/Countries";
import ComplaintCategories from "../views/admin/Masters/ComplaintCategories";
import ApproveAddress from "../views/admin/Masters/ApproveAddress";
import Products from "../views/admin/Masters/Products";
import FeatureProducts from "../views/admin/Masters/FeatureProducts";
import Offers from "../views/admin/Masters/Offers";
import Category from "../views/admin/Masters/Category";
import AddProduct from "../views/admin/Masters/Products/AddProduct";
import EditProduct from "../views/admin/Masters/Products/EditProduct";

Vue.use(Router);

// const Login = () => import('@/views/pages/Login')
// import EditUsers from "../views/Users/Edit";
// import TrainingActivities from "../views/admin/Masters/TrainingActivities";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

// Views
const Dashboard1 = () => import("@/views/DashboardComponent");

// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/views/admin/auth/LoginComponent");
// const Login = () => import('@/views/pages/Login')
const Register = () => import("@/views/pages/Register");
// const ShiporderLogin = () => import("@/views/admin/ShiporderLogin/Login");
// require('@/views/admin/ShiporderLogin/Login')

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/dashboard");
};
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode   //  hash   // history
  // base: process.env.BASE_URL,
  // linkActiveClass: 'open active',
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      name: "Home",
      component: DefaultContainer,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: "users",
          name: "Users",
          component: Users
        },
        {
          path: "shopper",
          name: "Shopper",
          component: Shopper,
          beforeEnter: ifAuthenticated
        },
        {
          path: "category",
          name: "Category",
          component: Category,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/countries", // route_prefix +
          name: "Countries",
          component: Countries,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/complaint-categories", // route_prefix +
          name: "Complaint Categories",
          component: ComplaintCategories,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/approve-address", // route_prefix +
          name: "Approve Address",
          component: ApproveAddress,
          beforeEnter: ifAuthenticated
        },

        {
          path: "/products", // route_prefix +
          name: "Products",
          component: Products,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/shopper/products", // route_prefix +
          name: "Products",
          component: Products,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/add-product", // route_prefix +
          name: "AddProducts",
          component: AddProduct,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/edit-product/:id", // route_prefix +
          name: "EditProducts",
          component: EditProduct,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/feature-products", // route_prefix +
          name: "Feature Products",
          component: FeatureProducts,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/offers", // route_prefix +
          name: "Offers",
          component: Offers,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/shiporder-login", // route_prefix +
          name: "ShiporderLogin",
          component: () => import("@/views/admin/ShiporderLogin/Login"),
          beforeEnter: ifAuthenticated
        },
        // {
        //   path: "/training-activities", // route_prefix +
        //   name: "Training Activities",
        //   component: TrainingActivities,
        //   beforeEnter: ifAuthenticated
        // },
        {
          path: "/profile",
          name: "profile",
          component: Profile,
          beforeEnter: ifAuthenticated
        }
      ]
    },
    // {
    //   path: "/user",
    //   name: "Users",
    //   component: Users,
    //   beforeEnter: ifNotAuthenticated
    // },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        }
      },
      children: [
        {
          path: "404",
          name: "Page404",
          component: Page404
        },
        {
          path: "500",
          name: "Page500",
          component: Page500
        },
        {
          path: "login",
          name: "Login",
          component: Login
        },
        {
          path: "register",
          name: "Register",
          component: Register
        }
      ]
    },
    {
      path: "/app",
      redirect: "users", // route_prefix +
      name: "Home1",
      beforeEnter: ifAuthenticated,
      component: Full,
      children: [
        // {
        //   path: "/dashboard", // route_prefix +
        //   name: "Dashboard",
        //   component: Dashboard,
        //   beforeEnter: ifAuthenticated,
        // },
        {
          path: "/users", // route_prefix +
          name: "Users",
          component: Users,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/user/:id/edit", // route_prefix +
          name: "Edit user",
          component: EditUsers,
          beforeEnter: ifAuthenticated
        }

        // {
        //   path: '/charts',
        //   name: 'Charts',
        //   component: Charts
        // },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/change-password/:email/:token",
      name: "change-password",
      component: ChangePassword,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "*", // set default fou7te
      component: null,
      redirect: "/users",
      beforeEnter: ifAuthenticated
    }
  ]
});
