<template>
  <b-navbar class="landing-navbar" type="light" fixed="top">
    <b-container fluid class="px-3">
      <b-navbar-brand to="/" class="text-big font-weight-bolder line-height-1 text-expanded py-3">DIGITAL MENU</b-navbar-brand>
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
};
</script>

<style>
.landing-navbar {
  background-color: var(--color-white);
}
</style>