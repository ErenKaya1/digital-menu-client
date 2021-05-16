<template>
  <b-navbar class="common-navbar" type="light" fixed="top">
    <b-container fluid class="px-3">
      <b-navbar-brand to="/" class="text-big font-weight-bolder line-height-1 text-expanded py-3"><img id="navbar-logo" src="/img/logo-green-blue.svg" /></b-navbar-brand>
      <b-navbar-nav class="align-items-lg-center ml-auto">
        <language-switcher :size="switcherSize" variant="landing-primary" />
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script>
import LanguageSwitcher from "@/components/Landing/LanguageSwitcher.vue";

export default {
  components: { LanguageSwitcher },

  computed: {
    switcherSize() {
      const size = window.outerWidth;
      return size >= 768 ? "md" : "sm";
    },
  },

  created() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      const navbar = document.getElementsByClassName("navbar-light")[0];

      if (window.scrollY > 20) {
        navbar.classList.remove("common-navbar");
        navbar.classList.add("common-navbar-alt");
      } else {
        navbar.classList.remove("common-navbar-alt");
        navbar.classList.add("common-navbar");
      }
    },
  },
};
</script>

<style>
.common-navbar {
  background-color: var(--color-white);
}

.common-navbar-alt {
  background-color: var(--color-white);
}

.navbar-brand img {
  transition: height 0.2s;
}

.common-navbar .navbar-brand img {
  height: 70px;
}

.common-navbar-alt .navbar-brand img {
  height: 50px;
}

@media (max-width: 992px) {
  .common-navbar .navbar-brand img {
    height: 50px;
  }

  .common-navbar-alt .navbar-brand img {
    height: 40px;
  }
}

@media (max-width: 992px) {
  .common-navbar .navbar-brand img {
    height: 40px;
  }

  .common-navbar-alt .navbar-brand img {
    height: 35px;
  }
}
</style>