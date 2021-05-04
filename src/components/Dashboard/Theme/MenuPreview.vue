<template>
  <div class="menu-preview-wrapper">
    <div class="menu-preview" :style="styles.menu">
      <b-navbar>
        <b-container>
          <b-navbar-brand tag="span" class="text-big font-weight-bolder line-height-1 text-expanded py-3">
            <b-img v-if="this.logo" :src="this.logo" class="menu-logo" fluid />
          </b-navbar-brand>
          <b-navbar-nav class="ml-auto">
            <currency-switcher variant="landing-primary" size="sm" />
            <b-dropdown variant="landing-primary" :style="styles.languageCurrency" text="TR" size="sm">
              <b-dropdown-item>TR</b-dropdown-item>
            </b-dropdown>
          </b-navbar-nav>
        </b-container>
      </b-navbar>
      <b-container>
        <swiper class="swiper" :options="swiperOptions">
          <swiper-slide :style="index === 0 ? styles.category.border : null" v-for="(category, index) in previewCategories" :key="index" class="category-slide">
            <div>
              <b-img :src="category.imagePath" />
              <span :style="styles.text">{{ category.name }}</span>
            </div>
          </swiper-slide>
        </swiper>
        <div class="selected-category-overview">
          <h6 :style="styles.text">İçecek</h6>
          <p :style="styles.category.description">Birbirinden Güzel İçecekler</p>
        </div>
        <b-row>
          <b-col v-for="(product, index) in previewProducts" :key="index" cols="12" class="p-md-0 mr-md-3">
            <div :style="styles.product" class="product">
              <div class="product-image">
                <b-img :src="product.imagePath" :alt="product.imagePath" fluid />
              </div>
              <div class="product-details">
                <p :style="styles.text" class="name">{{ product.name }}</p>
                <p :style="styles.price" class="price">{{ product.price }} ₺</p>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <footer class="footer pt-4">
        <b-container class="text-center py-4">
          <div class="pb-3">
            <span :style="styles.text" class="font-weight-bolder">LANDING</span>
            <span :style="styles.text" class="align-top">©</span>
          </div>
          <hr class="mb-4" />
          <b-row>
            <div class="col pb-4">
              <div :style="styles.text" class="font-secondary font-weight-bold mb-3">{{ $t("footer.whoWeAre").toLocaleUpperCase() }}</div>
              <b-link :style="styles.link" to="/about" class="d-block small pb-2">{{ $t("footer.aboutus") }}</b-link>
              <b-link :style="styles.link" to="/ourstory" class="d-block small pb-2">{{ $t("footer.ourstory") }}</b-link>
              <b-link :style="styles.link" to="/crew" class="d-block small pb-2">{{ $t("footer.crew") }}</b-link>
            </div>
            <div class="col pb-4">
              <div :style="styles.text" class="font-secondary font-weight-bold mb-3">{{ $t("footer.support").toLocaleUpperCase() }}</div>
              <b-link :style="styles.link" to="/faq" class="d-block small pb-2">{{ $t("footer.faq").toLocaleUpperCase() }}</b-link>
              <b-link :style="styles.link" to="/policy" class="d-block small pb-2">{{ $t("footer.privacyPolicy") }}</b-link>
              <b-link :style="styles.link" to="/contact" class="d-block small pb-2">{{ $t("footer.contact") }}</b-link>
            </div>
          </b-row>
          <b-row>
            <div class="col pb-4">
              <div :style="styles.text" class="font-secondary font-weight-bold mb-3">{{ $t("footer.socialMedia").toLocaleUpperCase() }}</div>
              <a href="#" :style="styles.link" class="d-block small pb-2" target="_blank"> &nbsp;Twitter</a>
              <a href="#" :style="styles.link" class="d-block small pb-2" target="_blank"> &nbsp;Facebook</a>
              <a href="#" :style="styles.link" class="d-block small pb-2" target="_blank"> &nbsp;Instagram</a>
            </div>
          </b-row>
        </b-container>
      </footer>
    </div>
  </div>
</template>

<script>
import accountService from "@/services/accountService";
import LanguageSwitcher from "@/components/Landing/LanguageSwitcher.vue";
import CurrencySwitcher from "@/components/Menu/CurrencySwitcher.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.min.css";

export default {
  props: ["styles"],

  components: { LanguageSwitcher, CurrencySwitcher, Swiper, SwiperSlide },

  data() {
    return {
      logo: null,

      swiperOptions: {
        lazy: true,
        slidesPerView: 3,
        spaceBetween: 10,
      },

      previewCategories: [
        { name: "Başlangıç", imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: "Ara Sıcak", imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: "Ana Yemek", imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: "İçecek", imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: "Tatlı", imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
      ],

      previewProducts: [
        { name: "Su", price: 2, imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: "Kola", price: 5, imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: "Ayran", price: 4, imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: "Ice Tea", price: 4, imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: "Portakal Suyu", price: 10, imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
      ],
    };
  },

  async mounted() {
    const companyResult = await accountService.getCompany(this.$store.state.user.userId);
    if (companyResult.success) {
      this.logo = companyResult.data.logoName;
    }
  },
};
</script>

<style>
.menu-preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.menu-preview-wrapper .menu-preview {
  width: 360px;
  height: 600px;
  border: 1px solid var(--color-muted);
  overflow-y: scroll;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.menu-preview-wrapper .navbar-brand img {
  height: 60px !important;
}

.menu-preview-wrapper .category-slide {
  cursor: pointer;
}

.menu-preview-wrapper .category-slide img {
  height: 80px;
  border-radius: 10px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.menu-preview-wrapper .category-slide span {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 14px;
}

.menu-preview-wrapper .selected-category-overview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
}

.menu-preview-wrapper .selected-category-overview p {
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.2px;
}

.menu-preview-wrapper .product {
  display: flex;
  flex-direction: row;
  height: 90px;
  margin-bottom: 15px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0px 0px 3px 0px rgba(163, 164, 166, 1);
}

.menu-preview-wrapper .product .product-image {
  width: 35%;
}

.menu-preview-wrapper .product .product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.menu-preview-wrapper .product .product-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  padding-top: 10px;
}

.menu-preview-wrapper .product .product-details .price {
  font-size: 18px;
  font-weight: bold;
}

.menu-preview-wrapper .product .product-details .name {
  font-size: 14px;
  margin-bottom: 8px;
}
</style>