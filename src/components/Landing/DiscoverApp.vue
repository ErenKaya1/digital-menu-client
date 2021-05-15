<template>
  <div>
    <b-container class="px-3">
      <div class="text-center text-small font-weight-bold mb-3 custom-text-muted">{{ $t("landingView.screenshots.title").toLocaleUpperCase() }}</div>
      <h1 class="display-5 font-secondary text-center font-weight-semibold">{{ $t("landingView.screenshots.subTitle") }}</h1>
    </b-container>
    <hr class="landing-separator border-landing-primary mx-auto mt-5 mb-4" />
    <div class="app-preview-slider-wrapper">
      <swiper class="swiper app-preview-slider" :options="swiperOptions">
        <swiper-slide>
          <img src="@/assets/landing-img.png" alt="" class="img-fluid cursor-pointer" />
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/landing-img.png" alt="" class="img-fluid cursor-pointer" />
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/landing-img.png" alt="" class="img-fluid cursor-pointer" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.min.css";
export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      },
    };
  },
};
</script>

<style scoped>
.app-preview-slider {
  padding-top: 3rem !important;
  padding-bottom: 5rem !important;
}

.app-preview-slider-wrapper {
  padding: 0 1rem;
}

.app-preview-slider .swiper-slide {
  text-align: center;
}

.app-preview-slider .swiper-slide img {
  opacity: 0.5;
  transition: all 0.4s;
}

.app-preview-slider .swiper-slide-active img {
  opacity: 1;
}

@media (min-width: 992px) {
  .app-preview-slider-wrapper {
    padding: 0;
  }
  .app-preview-slider .swiper-slide img {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }
  .app-preview-slider .swiper-slide-active img {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
</style>
