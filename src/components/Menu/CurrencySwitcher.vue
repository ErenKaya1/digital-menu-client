<template>
  <div>
    <div class="dropdown menuCurrencySwitcher">
      <button :style="styles.languageCurrency" id="menuCurrencySwitcher" :class="switcherClasses" class="btn dropdown-toggle mr-2" type="button" data-toggle="dropdown">{{ selectedCurrency.symbol }}</button>
      <div class="dropdown-menu" aria-labelledby="menuCurrencySwitcher">
        <b-button class="dropdown-item" v-for="(currency, index) in currencies" :key="index" @click="setCurrency(currency)">{{ currency.symbol }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["variant", "size", "styles"],

  data() {
    return {
      currencies: [
        { name: "try", symbol: "₺" },
        { name: "eur", symbol: "€" },
        { name: "usd", symbol: "$" },
      ],

      selectedCurrency: { name: "try", symbol: "₺" },
    };
  },

  computed: {
    switcherClasses() {
      const size = window.outerWidth;
      return size >= 768 ? "btn-md" : "btn-sm";
    },
  },

  mounted() {
    const cookie = this.$cookie.get("currency");
    this.selectedCurrency = cookie ? this.currencies.find((x) => x.name === cookie) : this.currencies.find((x) => x.name === "try");
  },

  methods: {
    setCurrency(currency) {
      this.$cookie.set("currency", currency.name, { expires: 365 });
      this.selectedCurrency = currency;
      this.$emit("currencyChanged");
    },
  },
};
</script>

<style>
.menuCurrencySwitcher .dropdown-menu .dropdown-item:active {
  background-color: var(--color-landing-secondary) !important;
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  #currencySwitcher .dropdown-menu {
    min-width: 50px !important;
  }
}
</style>