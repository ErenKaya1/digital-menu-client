<template>
  <sidebar-menu :menu="sidenavOptions.menu" :relative="false" :width="sidenavOptions.width" :hideToggle="sidenavOptions.hideToggle" :collapsed="sidenavOptions.collapsed" />
</template>

<script>
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import { SidebarMenu } from "vue-sidebar-menu";
import authService from "@/services/authService";
import "@fortawesome/fontawesome-free/css/all.min.css"
export default {
  components: {
    SidebarMenu,
  },
  data() {
    return {
      sidenavOptions: {
        menu: [
          {
            header: true,
            title: "Digital Menu",
            hiddenOnCollapse: true,
          },
          {
            href: "/dashboard",
            title: "Anasayfa",
            icon: "lnr lnr-home",
          },
          {
            href: "/dashboard/products",
            title: "Ürünler",
            icon: "fas fa-utensils",
          },
          {
            href: "/dashboard/product-groups",
            title: "Ürün Grupları",
            icon: "fas fa-utensils",
          },
          {
            href: "/dashboard/categories",
            title: "Kategoriler",
            icon: "fas fa-layer-group",
          },
          {
            href: "/dashboard/qr",
            title: "QR Kod",
            icon: "fas fa-qrcode",
          },
          {
            href: "/dashboard/account",
            title: "Profil",
            icon: "lnr lnr-user",
          },
          {
            class: "logout",
            title: "Çıkış Yap",
            icon: "lnr lnr-exit",
          },
        ],
        isRelative: false,
        width: "15%",
        hideToggle: true,
        collapsed: window.outerWidth < 768,
      },
    };
  },
  mounted() {
    window.addEventListener("resize", this.withChanged, false);
    var logoutBtn = document.getElementsByClassName("logout")[0];
    logoutBtn.addEventListener("click", this.logout);
  },
  methods: {
    withChanged(event) {
      this.sidenavOptions.collapsed = event.target.outerWidth < 768;
    },
    async logout() {
      const userId = this.$store.state.user.userId;
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setToken", null);
      await authService.logout(userId);
      this.$router.push("/");
    },
  },
};
</script>

<style>
.v-sidebar-menu {
  background-color: var(--color-landing-secondary);
}
.v-sidebar-menu .vsm--icon {
  background-color: var(--color-landing-secondary) !important;
}

.v-sidebar-menu .vsm--link.vsm--link_hover {
  background-color: var(--color-landing-secondary-hover) !important;
}
</style>