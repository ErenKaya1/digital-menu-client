<template>
  <div>
    <app-navbar :logo="this.logoPath" v-on:languageChanged="refreshMenu" v-on:currencyChanged="refreshMenu" />
    <b-container>
      <category-swiper :categories="categories" :selectedCategoryId="selectedCategoryId" v-on:categorySwitched="switchCategory" />
      <div class="selected-category-overview">
        <h6>{{ selectedCategoryName }}</h6>
        <p v-if="selectedCategoryDescription" class="custom-text-muted">{{ selectedCategoryDescription }}</p>
      </div>
      <b-row>
        <b-col cols="12" md="4" v-for="product in products" :key="product.id" class="p-md-0 mr-md-3">
          <product :product="product" />
        </b-col>
      </b-row>
    </b-container>
    <app-footer />
  </div>
</template>

<script>
import menuService from "@/services/menuService";
import AppNavbar from "@/components/Menu/Navbar.vue";
import Product from "@/components/Menu/Product.vue";
import CategorySwiper from "@/components/Menu/CategorySwiper.vue";
import AppFooter from "@/components/Landing/Footer.vue";

export default {
  components: { AppNavbar, Product, CategorySwiper, AppFooter },
  data() {
    return {
      categories: [],
      products: [],
      selectedCategoryId: "",
      selectedCategoryName: "",
      selectedCategoryDescription: "",
      logoPath: null,
    };
  },

  async mounted() {
    await this.fetchMenu();
  },

  methods: {
    switchCategory(categoryId) {
      this.selectedCategoryId = categoryId;
      const selectedCategory = this.categories.find((category) => category.id === this.selectedCategoryId);
      this.selectedCategoryName = selectedCategory.name;
      this.selectedCategoryDescription = selectedCategory.description;
      this.products = selectedCategory.products;
    },

    async refreshMenu() {
      await this.fetchMenu();
    },

    async fetchMenu() {
      const companySlug = this.$route.params.companySlug;
      const menu = await menuService.getMenu(companySlug);
      if (menu.success) {
        this.categories = menu.data.categories;
        this.logoPath = menu.data.companyLogo || null;
        this.selectedCategoryId = this.categories[0].id;
        this.selectedCategoryName = this.categories[0].name;
        this.selectedCategoryDescription = this.categories[0].description;
        this.products = this.categories.find((category) => category.id === this.selectedCategoryId).products;
      } else {
        this.$router.push("/menu-error");
      }
    },
  },
};
</script>

<style>
.selected-category-overview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
}

.selected-category-overview p {
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.2px;
}
</style>