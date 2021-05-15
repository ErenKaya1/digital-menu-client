<template>
  <table-loader v-if="!isLoaded" />
  <div v-else>
    <b-table :items="products" :fields="fields" thead-class="table-header" bordered hover head-variant="dark" v-if="products.length > 0" class="dashboard-table">
      <template #cell(nameTR)="row">{{ row.value }}</template>
      <template #cell(nameEN)="row">{{ row.value }}</template>
      <template #cell(price)="row">{{ row.value }}</template>
      <template #cell(actions)="row">
        <b-button size="sm" variant="info" @click="$router.push(`/dashboard/product/edit/${row.item.id}`)" class="mr-1">{{ $t("dashboard.productsView.editProductButtonText") }}</b-button>
        <b-button size="sm" variant="danger" @click="deleteProduct(row.item)" class="mr-1">{{ $t("dashboard.productsView.deleteProductButtonText") }}</b-button>
      </template>
    </b-table>
    <b-alert variant="warning" show v-else>{{ $t("dashboard.productsView.messages.noProductAdded") }}</b-alert>
  </div>
</template>

<script>
import productService from "@/services/productService";
import TableLoader from "@/components/TableLoader.vue";

export default {
  components: { TableLoader },
  data() {
    return {
      products: [],
      fields: [
        { key: "nameTR", label: this.$t("dashboard.productsView.tableFields.productNameTR"), sortable: true },
        { key: "nameEN", label: this.$t("dashboard.productsView.tableFields.productNameEN"), sortable: true },
        { key: "price", label: this.$t("dashboard.productsView.tableFields.price"), sortable: true },
        { key: "actions", label: this.$t("dashboard.productsView.tableFields.options"), tdClass: "options-column", thClass: "options-column" },
      ],
      isLoaded: false,
    };
  },

  async mounted() {
    await this.fetchProducts();

    this.$root.$on("refreshProducts", async () => {
      this.isLoaded = false;
      await this.fetchProducts();
    });
  },

  methods: {
    async fetchProducts() {
      const data = await productService.getAllProducts(this.$store.state.user.userId);
      if (data.code === 200) {
        this.products = data.data;
      }

      this.isLoaded = true;
    },

    async refreshProducts() {
      await this.fetchProducts();
    },

    async deleteProduct(product) {
      this.$bvModal
        .msgBoxConfirm(this.$t("dashboard.productsView.messages.confirmDeleteProduct"), {
          title: this.$t("dashboard.productsView.messages.confirmDeleteProductTitle"),
          centered: true,
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("common.yes").toUpperCase(),
          cancelTitle: this.$t("common.no").toUpperCase(),
          cancelVariant: "dark",
        })
        .then(async (value) => {
          if (value) {
            const response = await productService.deleteProduct(this.$store.state.user.userId, product.id);
            if (response.code === 200) {
              this.$notify({
                group: "notify-top-right",
                text: this.$t("dashboard.productsView.messages.productDeletedSuccessfully"),
                duration: 5000,
                type: "info",
              });

              this.refreshProducts();
            }
          }
        });
    },
  },
};
</script>