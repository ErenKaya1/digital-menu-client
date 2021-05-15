<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-button to="/dashboard/product/new" variant="landing-secondary">{{ $t("dashboard.productsView.newProductButtonText") }}</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="12">
        <products-table />
      </b-col>
    </b-row>
    <router-view />
  </div>
</template>

<script>
import ProductsTable from "../../components/Dashboard/Products/ProductsTable.vue";
export default {
  components: { ProductsTable },

  mounted() {
    this.$title = this.$t("dashboard.productsView.tabTitle");
  },
};
</script>

<style>
</style>