<template>
  <b-navbar>
    <b-container>
      <b-navbar-brand to="/" class="text-big font-weight-bolder line-height-1 text-expanded py-3">
        <b-img v-if="this.logo" :src="this.logo" class="menu-logo" fluid />
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <currency-switcher variant="landing-primary" v-on:currencyChanged="$emit('currencyChanged')" :size="switcherSizes"/>
        <language-switcher variant="landing-primary" v-on:languageChanged="$emit('languageChanged')" :size="switcherSizes" />
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script>
import LanguageSwitcher from "../Landing/LanguageSwitcher.vue";
import CurrencySwitcher from "../Menu/CurrencySwitcher.vue";

export default {
  components: { LanguageSwitcher, CurrencySwitcher },
  props: ["logo", "styles"],

  computed: {
    switcherSizes() {
      const size = window.outerWidth;
      return size >= 768 ? "md" : "sm";
    },
  },
};
</script>

<style>
.menu-logo {
  height: 60px !important;
}
</style>