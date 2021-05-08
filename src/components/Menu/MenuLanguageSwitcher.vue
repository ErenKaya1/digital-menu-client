<template>
  <div class="dropdown menuLanguageSwitcher">
    <button :style="styles.languageCurrency" id="menuLanguageSwitcher" :class="switcherClasses" class="btn dropdown-toggle" type="button" data-toggle="dropdown">{{ selectedLang }}</button>
    <div class="dropdown-menu" aria-labelledby="menuLanguageSwitcher">
      <b-button class="dropdown-item" v-for="(lang, index) in langs" :key="index" @click="setLocale(lang)">{{ lang }}</b-button>
    </div>
  </div>
</template>

<script>
import i18n from "../../i18n";
import "jquery/dist/jquery.slim";
import "bootstrap/js/dist/dropdown";
export default {
  props: ["size", "styles"],

  data() {
    return {
      langs: ["EN", "TR"],
      selectedLang: i18n.locale.toUpperCase(),
    };
  },

  computed: {
    switcherClasses() {
      const size = window.outerWidth;
      return size >= 768 ? "btn-md" : "btn-sm";
    },
  },

  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.selectedLang = locale.toUpperCase();
      this.$cookie.set("lang", locale, { expires: 365 });

      this.$emit("languageChanged");
    },
  },

  mounted() {
    if (this.$cookie.get("lang")) {
      let lang = this.$cookie.get("lang");
      i18n.locale = lang;
      this.selectedLang = lang.toUpperCase();
    }

    console.log(this.styles);
  },
};
</script>

<style>
.menuLanguageSwitcher .dropdown-menu .dropdown-item:active {
  background-color: var(--color-landing-secondary) !important;
}
</style>