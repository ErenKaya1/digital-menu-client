import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing.vue";
import Dashboard from "../views/Dashboard/Dashboard.vue";
import Layout from "../components/Dashboard/Layout.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "register" */ "@/views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import(/* webpackChunkName: "forgot-password" */ "@/views/ForgotPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import(/* webpackChunkName: "reset-password" */ "@/views/ResetPassword.vue"),
  },
  {
    path: "/dashboard",
    component: Layout,
    children: [
      {
        path: "/",
        component: Dashboard,
      },
      {
        path: "/dashboard/account",
        component: () => import(/* webpackChunkName: "account" */ "@/views/Dashboard/Account.vue"),
      },
      {
        path: "/dashboard/categories",
        component: () => import(/* webpackChunkName: "categories" */ "@/views/Dashboard/Categories.vue"),
        children: [
          {
            path: "/dashboard/category/new",
            component: () => import(/* webpackChunkName: "new-category" */ "@/views/Dashboard/NewCategory.vue"),
          },
          {
            path: "/dashboard/category/edit/:id",
            component: () => import(/* webpackChunkName: "edit-category" */ "@/views/Dashboard/EditCategory.vue"),
          },
        ],
      },
      {
        path: "/dashboard/products",
        component: () => import(/* webpackChunkName: "products" */ "@/views/Dashboard/Products.vue"),
        children: [
          {
            path: "/dashboard/product/new",
            component: () => import(/* webpackChunkName: "new-product" */ "@/views/Dashboard/NewProduct.vue"),
          },
          {
            path: "/dashboard/product/edit/:id",
            component: () => import(/* webpackChunkName: "edit-product" */ "@/views/Dashboard/EditProduct.vue"),
          },
        ],
      },
      {
        path: "/dashboard/qr",
        component: () => import(/* webpackChunkName: "qr" */ "@/views/Dashboard/Qr.vue"),
      },
      {
        path: "/dashboard/renew-subscription",
        component: () => import(/* webpackChunkName: "renew-subscription" */ "@/views/Dashboard/RenewSubscription.vue"),
      },
      {
        path: "/dashboard/theme",
        component: () => import(/* webpackChunkName: "theme" */ "@/views/Dashboard/Theme.vue"),
      },
    ],
  },
  {
    path: "/menu/:companySlug",
    name: "Menu",
    component: () => import(/* webpackChunkName: "menu" */ "@/views/Menu.vue"),
  },
  {
    path: "/menu-error",
    name: "MenuError",
    component: () => import(/* webpackChunkName: "menu-error" */ "@/views/MenuError.vue"),
  },
  {
    path: "/about-us",
    component: () => import(/* webpackChunkName: "about-us" */ "@/views/AboutUs.vue"),
  },
  {
    path: "/contact",
    component: () => import(/* webpackChunkName: "contact" */ "@/views/Contact.vue"),
  },
  {
    path: "/faq",
    component: () => import(/* webpackChunkName: "faq" */ "@/views/Faq.vue"),
  },
  {
    path: "/privacy-policy",
    component: () => import(/* webpackChunkName: "privacy-policy" */ "@/views/PrivacyPolicy.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
  },
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
