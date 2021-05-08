<template>
  <div :style="styles.menu">
    <menu-navbar :styles="styles" :logo="this.logoPath" v-on:languageChanged="refreshMenu" v-on:currencyChanged="refreshMenu" />
    <b-container>
      <category-swiper :styles="styles" :categories="categories" :selectedCategoryId="selectedCategoryId" v-on:categorySwitched="switchCategory" />
      <div class="selected-category-overview">
        <h6 :style="styles.text">{{ selectedCategoryName }}</h6>
        <p :style="styles.category.description" v-if="selectedCategoryDescription">{{ selectedCategoryDescription }}</p>
      </div>
      <b-row>
        <b-col cols="12" md="4" v-for="product in products" :key="product.id" class="p-md-0 mr-md-3">
          <product :styles="styles" :product="product" />
        </b-col>
      </b-row>
    </b-container>
    <menu-footer :styles="styles" />
  </div>
</template>

<script>
import menuService from "@/services/menuService";
import MenuNavbar from "@/components/Menu/MenuNavbar.vue";
import Product from "@/components/Menu/Product.vue";
import CategorySwiper from "@/components/Menu/CategorySwiper.vue";
import MenuFooter from "@/components/Menu/MenuFooter.vue";

export default {
  components: { MenuNavbar, Product, CategorySwiper, MenuFooter },
  data() {
    return {
      categories: [],
      products: [],
      selectedCategoryId: "",
      selectedCategoryName: "",
      selectedCategoryDescription: "",
      logoPath: null,

      styles: {
        menu: {
          backgroundColor: "#F5F5F5",
        },
        text: {
          color: "#3B3E42",
        },
        link: {
          color: "#4e5155",
        },
        price: {
          color: "#3AB5A1",
        },
        product: {
          backgroundColor: "#F5F5F5",
        },
        languageCurrency: {
          backgroundColor: "#3AB5A1",
          color: "#3AB5A1",
        },
        category: {
          description: {
            color: "#C1C1C1",
          },
          border: {
            borderBottom: "2px solid",
            borderColor: "#3AB5A1",
          },
        },
      },
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
        this.styles = {
          menu: {
            backgroundColor: menu.data.backgroundColor,
          },
          text: {
            color: menu.data.textColor,
          },
          link: {
            color: menu.data.linkColor,
          },
          price: {
            color: menu.data.priceColor,
          },
          product: {
            backgroundColor: menu.data.productBackgroundColor,
          },
          languageCurrency: {
            backgroundColor: menu.data.languageCurrencyBackgroundColor,
            color: menu.data.languageCurrencyTextColor,
          },
          category: {
            description: {
              color: menu.data.categoryDescriptionColor,
            },
            border: {
              borderBottom: "2px solid",
              borderColor: menu.data.selectedCategoryBorderColor,
            },
          },
        };
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