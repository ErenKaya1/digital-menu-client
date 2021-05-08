<template>
  <b-navbar>
    <b-container>
      <b-navbar-brand to="/" class="text-big font-weight-bolder line-height-1 text-expanded py-3">
        <b-img v-if="this.logo" :src="this.logo" class="menu-logo" fluid />
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <currency-switcher :styles="styles" v-on:currencyChanged="$emit('currencyChanged')" :size="switcherSizes" />
        <menu-language-switcher :styles="styles" v-on:languageChanged="$emit('languageChanged')" :size="switcherSizes" />
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script>
import MenuLanguageSwitcher from "../Menu/MenuLanguageSwitcher.vue";
import CurrencySwitcher from "./CurrencySwitcher.vue";

export default {
  components: { MenuLanguageSwitcher, CurrencySwitcher },
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