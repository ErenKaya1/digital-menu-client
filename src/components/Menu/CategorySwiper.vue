<template>
  <swiper class="swiper" :options="swiperOptions">
    <swiper-slide v-for="category in categories" :key="category.id" class="category-slide" :style="selectedCategoryId === category.id ? styles.category.border : null">
      <div @click="$emit('categorySwitched', category.id)">
        <b-img :src="category.imagePath" fluid />
        <span :style="styles.text">{{ category.name }}</span>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.min.css";
export default {
  components: { Swiper, SwiperSlide },
  props: ["categories", "selectedCategoryId", "styles"],
  data() {
    return {
      swiperOptions: {
        lazy: true,
        slidesPerView: 3,
        spaceBetween: 10,

        breakpoints: {
          1024: {
            slidesPerView: 8,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        },
      },
    };
  },
};
</script>

<style>
.category-slide {
  cursor: pointer;
}

.category-slide img {
  height: 80px;
  border-radius: 10px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.category-slide span {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 14px;
}

.category-slide.active {
  border-bottom: 2px solid var(--color-landing-primary);
}
</style>