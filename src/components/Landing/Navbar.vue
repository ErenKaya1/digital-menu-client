<template>
  <b-navbar class="landing-navbar" toggleable="lg" type="dark" fixed="top">
    <b-container fluid class="px-3">
      <b-navbar-brand to="/" class="text-big font-weight-bolder line-height-1 text-expanded py-3"> <img id="navbar-logo" src="/img/logo-white.svg" /></b-navbar-brand>
      <b-navbar-toggle target="landing-navbar-collapse" @click="navbarToggle"></b-navbar-toggle>
      <b-collapse id="landing-navbar-collapse" is-nav>
        <b-navbar-nav class="align-items-lg-center ml-auto">
          <b-nav-item href="#features" is="a" class="anchor-link nav-link nav-item">{{ $t("landingView.navbar.features") }}</b-nav-item>
          <b-nav-item href="#screenshots" is="a" class="anchor-link nav-link nav-item">{{ $t("landingView.navbar.screenshots") }}</b-nav-item>
          <b-nav-item href="#pricing" is="a" class="anchor-link nav-link nav-item">{{ $t("landingView.navbar.pricing") }}</b-nav-item>
          <language-switcher v-on:languageChanged="handleLanguageChange" variant="outline-light" />
          <b-nav-item is="div" class="nav-item py-3 py-lg-0 ml-lg-4" v-if="isUserLoggedIn">
            <b-link to="/dashboard" class="btn-dashboard anchor-link btn btn-outline-light rounded-pill text-expanded ml-1">
              <small>{{ $t("landingView.navbar.dashboard") }}</small>
            </b-link>
            <b-button @click="logout" variant="outline-light" class="btn-logout rounded-pill anchor-link btn text-expanded ml-1">
              <small>{{ $t("landingView.navbar.logout") }}</small>
            </b-button>
          </b-nav-item>
          <b-nav-item is="div" class="nav-item py-3 py-lg-0 ml-lg-4" v-else>
            <b-link to="/login" class="btn-login anchor-link btn btn-outline-light rounded-pill text-expanded ml-1">
              <small>{{ $t("landingView.navbar.login") }}</small>
            </b-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import LanguageSwitcher from "./LanguageSwitcher.vue";
import authService from "@/services/authService";
export default {
  components: { LanguageSwitcher },
  data() {
    return {
      isUserLoggedIn: this.$store.state.isUserLoggedIn,
    };
  },

  created() {
    document.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    async logout() {
      const userId = this.$store.state.user.userId;
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setToken", null);
      await authService.logout(userId);
      this.isUserLoggedIn = false;
    },
    handleLanguageChange() {
      this.$emit("changePricingLang");
    },
    handleScroll() {
      const navbar = document.getElementsByClassName("landing-navbar")[0];
      const navbarCollapse = document.getElementById("landing-navbar-collapse");
      const container = navbar.getElementsByTagName("div")[0];
      const loginBtn = document.getElementsByClassName("btn-login")[0];
      const dashboardBtn = document.getElementsByClassName("btn-dashboard")[0];
      const logoutBtn = document.getElementsByClassName("btn-logout")[0];
      const languageSwitcher = document.querySelector("#languageSwitcher button");
      const navbarLogo = document.getElementById("navbar-logo");
      const navbarScrollThreshold = 20;
      const navbarBreakPoint = 992;
      const navbarCustomClasses = {
        default: {
          variant: "navbar-dark",
        },
        alt: {
          navbar: "navbar-light",
          variant: "bg-white",
          classes: "py-1",
        },
      };

      const scrollTop = window.scrollY;
      if (scrollTop > navbarScrollThreshold && !navbar.classList.contains("landing-navbar-alt")) {
        navbar.classList.add("landing-navbar-alt");
        navbar.classList.remove(navbarCustomClasses.default.variant);
        navbar.classList.add(navbarCustomClasses.alt.variant);
        navbar.classList.add(navbarCustomClasses.alt.classes);
        navbar.classList.add(navbarCustomClasses.alt.navbar);
        container.classList.remove("container-fluid");
        container.classList.add("container");
        if (loginBtn) {
          loginBtn.classList.add("btn-landing-primary");
          loginBtn.classList.remove("btn-outline-light");
        }
        if (dashboardBtn) {
          dashboardBtn.classList.add("btn-landing-primary");
          dashboardBtn.classList.remove("btn-outline-light");
        }
        if (logoutBtn) {
          logoutBtn.classList.add("btn-landing-primary");
          logoutBtn.classList.remove("btn-outline-light");
        }

        languageSwitcher.classList.add("btn-landing-primary");
        languageSwitcher.classList.remove("btn-outline-light");
        navbarLogo.setAttribute("src", "/img/logo-green-blue.svg");
      } else if (scrollTop <= navbarScrollThreshold && navbar.classList.contains("landing-navbar-alt")) {
        navbar.classList.remove("landing-navbar-alt");
        navbar.classList.add(navbarCustomClasses.default.variant);
        navbar.classList.remove(navbarCustomClasses.alt.classes);
        navbar.classList.remove(navbarCustomClasses.alt.variant);
        container.classList.remove("container");
        container.classList.add("container-fluid");
        if (loginBtn) {
          loginBtn.classList.add("btn-outline-light");
          loginBtn.classList.remove("btn-landing-primary");
        }
        if (dashboardBtn) {
          dashboardBtn.classList.add("btn-outline-light");
          dashboardBtn.classList.remove("btn-landing-primary");
        }
        if (logoutBtn) {
          logoutBtn.classList.add("btn-outline-light");
          logoutBtn.classList.remove("btn-landing-primary");
        }

        languageSwitcher.classList.add("btn-outline-light");
        languageSwitcher.classList.remove("btn-landing-primary");

        if (window.outerWidth >= navbarBreakPoint || navbarCollapse.classList.contains("show")) {
          navbar.classList.remove(navbarCustomClasses.alt.variant);
        }

        navbarLogo.setAttribute("src", "/img/logo-white.svg");
      }
    },
    navbarToggle() {
      const navbar = document.getElementsByClassName("landing-navbar")[0];
      const navbarCollapse = document.getElementById("landing-navbar-collapse");
      const loginBtn = document.getElementsByClassName("btn-login")[0];
      const dashboardBtn = document.getElementsByClassName("btn-dashboard")[0];
      const logoutBtn = document.getElementsByClassName("btn-logout")[0];
      const languageSwitcher = document.querySelector("#languageSwitcher button");
      const navbarLogo = document.getElementById("navbar-logo");
      const navbarScrollThreshold = 20;

      // kapalı => açık
      if (!navbarCollapse.classList.contains("show") && window.outerWidth < 992) {
        navbar.classList.add("bg-white");
        navbar.classList.add("navbar-light");
        navbar.classList.remove("navbar-dark");
        if (loginBtn) {
          loginBtn.classList.add("btn-landing-primary");
          loginBtn.classList.remove("btn-outline-light");
        }
        if (dashboardBtn) {
          dashboardBtn.classList.add("btn-landing-primary");
          dashboardBtn.classList.remove("btn-outline-light");
        }
        if (logoutBtn) {
          logoutBtn.classList.add("btn-landing-primary");
          logoutBtn.classList.remove("btn-outline-light");
        }

        languageSwitcher.classList.add("btn-landing-primary");
        languageSwitcher.classList.remove("btn-outline-light");
        navbarLogo.setAttribute("src", "/img/logo-green-blue.svg");
      }
      // açık => kapalı
      else if (navbarCollapse.classList.contains("show") && window.scrollY <= navbarScrollThreshold) {
        navbar.classList.remove("bg-white");
        navbar.classList.remove("navbar-light");
        navbar.classList.add("navbar-dark");
        navbarLogo.setAttribute("src", "/img/logo-white.svg");
      }
    },
  },
};
</script>

<style>
.landing-navbar {
  transition: all 0.2s;
}

.landing-navbar .nav-link {
  font-size: var(--navbar-link);
}

.landing-navbar-alt .nav-link {
  color: var(--color-black-opacity);
}

.landing-navbar-alt .navbar-brand {
  color: var(--color-black-brand);
}

.landing .landing-navbar-alt {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(24, 28, 33, 0.04) !important;
}

.bg-light .navbar-toggler-icon {
  background-image: var(--navbar-toggler-dark);
}

.navbar-brand img {
  transition: height 0.2;
}

.landing-navbar .navbar-brand img {
  height: 70px;
}

.landing-navbar-alt .navbar-brand img {
  height: 50px;
}

@media (max-width: 992px) {
  .landing-navbar .navbar-brand img {
    height: 50px;
  }

  .landing-navbar-alt .navbar-brand img {
    height: 40px;
  }
}

@media (max-width: 568px) {
  .landing-navbar .navbar-brand img {
    height: 40px;
  }

  .landing-navbar-alt .navbar-brand img {
    height: 35px;
  }
}
</style>
