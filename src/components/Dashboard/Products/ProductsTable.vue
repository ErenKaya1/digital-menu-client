<template>
  <div>
    <b-table :items="products" :fields="fields" thead-class="table-header" bordered hover head-variant="dark" v-if="products.length > 0" class="dashboard-table">
      <template #cell(nameTR)="row">{{ row.value }}</template>
      <template #cell(nameEN)="row">{{ row.value }}</template>
      <template #cell(price)="row">{{ row.value }}</template>
      <template #cell(actions)="row">
        <product-details-button v-on:productUpdated="refreshProducts" :product="row.item" />
        <b-button size="sm" variant="danger" @click="deleteProduct(row.item)" class="mr-1">Sil</b-button>
      </template>
    </b-table>
    <b-alert variant="warning" show v-else>Henüz ürün eklemediniz.</b-alert>
  </div>
</template>

<script>
import ProductDetailsButton from "@/components/Dashboard/Products/ProductDetailsButton.vue";
import productService from "@/services/productService";

export default {
  components: { ProductDetailsButton },
  data() {
    return {
      products: [],
      fields: [
        { key: "nameTR", label: "Ürün Adı (TR)", sortable: true },
        { key: "nameEN", label: "Ürün Adı (EN)", sortable: true },
        { key: "price", label: "Fiyat", sortable: true },
        { key: "actions", label: "Seçenekler", tdClass: "options-column", thClass: "options-column" },
      ],
    };
  },

  async mounted() {
    await this.fetchProducts();

    this.$root.$on("refreshProducts", async () => {
      await this.fetchProducts();
    });
  },

  methods: {
    async fetchProducts() {
      const data = await productService.getAllProducts(this.$store.state.user.userId);
      if (data.code === 200) {
        this.products = data.data;
      }
    },

    async refreshProducts() {
      await this.fetchProducts();
    },

    async deleteProduct(product) {
      this.$bvModal
        .msgBoxConfirm("Bu ürün silinecektir.", {
          title: "Emin misiniz?",
          centered: true,
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "EVET",
          cancelTitle: "HAYIR",
          cancelVariant: "dark",
        })
        .then(async (value) => {
          if (value) {
            const response = await productService.deleteProduct(this.$store.state.user.userId, product.id);
            if (response.code === 200) {
              this.$notify({
                group: "notify-top-right",
                text: "Ürün başarıyla silindi.",
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