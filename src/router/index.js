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
    path: "/dashboard",
    component: Layout,
    children: [
      {
        path: "/",
        component: Dashboard,
      },
      {
        path: "/account",
        component: () => import(/* webpackChunkName: "account" */ "@/views/Dashboard/Account.vue"),
      },
      {
        path: "/categories",
        component: () => import(/* webpackChunkName: "categories" */ "@/views/Dashboard/Categories.vue"),
      },
      {
        path: "/products",
        component: () => import(/* webpackChunkName: "products" */ "@/views/Dashboard/Products.vue"),
      },
      {
        path: "/product-groups",
        component: () => import(/* webpackChunkName: "product-groups" */ "@/views/Dashboard/ProductGroups.vue"),
      },
      {
        path: "/qr",
        component: () => import(/* webpackChunkName: "qr" */ "@/views/Dashboard/Qr.vue"),
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
