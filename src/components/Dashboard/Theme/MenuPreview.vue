<template>
  <div class="menu-preview-wrapper">
    <div class="menu-preview" :style="styles.menu">
      <b-navbar>
        <b-container>
          <b-navbar-brand tag="span" class="text-big font-weight-bolder line-height-1 text-expanded py-3">
            <b-img v-if="this.logo" :src="this.logo" class="menu-logo" fluid />
          </b-navbar-brand>
          <b-navbar-nav class="ml-auto">
            <div>
              <button :style="styles.languageCurrency" class="btn btn-sm dropdown-toggle mr-2" type="button">₺</button>
            </div>
            <div>
              <button :style="styles.languageCurrency" class="btn btn-sm dropdown-toggle" type="button">TR</button>
            </div>
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
          <h6 :style="styles.text">{{ $t("dashboard.themeView.previewCategoryName") }}</h6>
          <p :style="styles.category.description">{{ $t("dashboard.themeView.previewCategoryDescription") }}</p>
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
            <span :style="styles.text" class="font-weight-bolder">DIGITAL MENU</span>
            <span :style="styles.text" class="align-top">©</span>
          </div>
          <hr class="mb-4" />
          <b-row>
            <div class="col pb-4">
              <div :style="styles.text" class="font-secondary font-weight-bold mb-3">{{ $t("dashboard.themeView.previewFooterWhoAreAre").toLocaleUpperCase() }}</div>
              <span :style="styles.link" class="d-block small pb-2">{{ $t("dashboard.themeView.previewFooterAboutUs") }}</span>
              <span :style="styles.link" class="d-block small pb-2">{{ $t("dashboard.themeView.previewFooterOurStory") }}</span>
              <span :style="styles.link" class="d-block small pb-2">{{ $t("dashboard.themeView.previewFooterCrew") }}</span>
            </div>
            <div class="col pb-4">
              <div :style="styles.text" class="font-secondary font-weight-bold mb-3">{{ $t("dashboard.themeView.previewFooterSupport").toLocaleUpperCase() }}</div>
              <span :style="styles.link" class="d-block small pb-2">{{ $t("dashboard.themeView.previewFooterFaq").toLocaleUpperCase() }}</span>
              <span :style="styles.link" class="d-block small pb-2">{{ $t("dashboard.themeView.previewFooterprivacyPolicy") }}</span>
              <span :style="styles.link" class="d-block small pb-2">{{ $t("dashboard.themeView.previewFooterContact") }}</span>
            </div>
          </b-row>
          <b-row>
            <div class="col pb-4">
              <div :style="styles.text" class="font-secondary font-weight-bold mb-3">{{ $t("dashboard.themeView.previewFooterSocialMedia").toLocaleUpperCase() }}</div>
              <span :style="styles.link" class="d-block small pb-2" target="_blank"> &nbsp;Twitter</span>
              <span :style="styles.link" class="d-block small pb-2" target="_blank"> &nbsp;Facebook</span>
              <span :style="styles.link" class="d-block small pb-2" target="_blank"> &nbsp;Instagram</span>
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
        { name: this.$t("dashboard.themeView.previewCategory1"), imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: this.$t("dashboard.themeView.previewCategory2"), imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: this.$t("dashboard.themeView.previewCategory3"), imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: this.$t("dashboard.themeView.previewCategory4"), imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: this.$t("dashboard.themeView.previewCategory5"), imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
      ],

      previewProducts: [
        { name: this.$t("dashboard.themeView.previewProduct1"), price: 2, imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: this.$t("dashboard.themeView.previewProduct2"), price: 5, imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: this.$t("dashboard.themeView.previewProduct3"), price: 4, imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: this.$t("dashboard.themeView.previewProduct4"), price: 4, imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
        { name: this.$t("dashboard.themeView.previewProduct5"), price: 10, imagePath: "https://cdn.mos.cms.futurecdn.net/QRMF2ZxVFShdqoxh5gxUQ8-768-80.jpg" },
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