<template>
  <footer class="footer pt-4">
    <b-container class="text-center py-4">
      <div class="pb-3">
        <span :style="styles.text" class="font-weight-bolder">LANDING</span>
        <span :style="styles.text" class="align-top">©</span>
      </div>
      <hr class="mb-4" />
      <b-row>
        <div class="col-6 col-sm pb-4">
          <div :style="styles.text" class="font-secondary font-weight-bold mb-3">{{ $t("footer.whoWeAre").toLocaleUpperCase() }}</div>
          <b-link :style="styles.link" to="/about" class="d-block small pb-2">{{ $t("footer.aboutus") }}</b-link>
          <b-link :style="styles.link" to="/ourstory" class="d-block small pb-2">{{ $t("footer.ourstory") }}</b-link>
          <b-link :style="styles.link" to="/crew" class="d-block small pb-2">{{ $t("footer.crew") }}</b-link>
        </div>
        <div class="col-6 col-sm pb-4">
          <div :style="styles.text" class="font-secondary font-weight-bold mb-3">{{ $t("footer.support").toLocaleUpperCase() }}</div>
          <b-link :style="styles.link" to="/faq" class="d-block small pb-2">{{ $t("footer.faq").toLocaleUpperCase() }}</b-link>
          <b-link :style="styles.link" to="/policy" class="d-block small pb-2">{{ $t("footer.privacyPolicy") }}</b-link>
          <b-link :style="styles.link" to="/contact" class="d-block small pb-2">{{ $t("footer.contact") }}</b-link>
        </div>
        <div :style="styles.text" class="col-6 offset-3 offset-sm-0 col-sm pb-4">
          <div class="font-secondary font-weight-bold mb-3">{{ $t("footer.socialMedia").toLocaleUpperCase() }}</div>
          <a href="#" :style="styles.link" class="d-block small pb-2" target="_blank"> &nbsp;Twitter</a>
          <a href="#" :style="styles.link" class="d-block small pb-2" target="_blank"> &nbsp;Facebook</a>
          <a href="#" :style="styles.link" class="d-block small pb-2" target="_blank"> &nbsp;Instagram</a>
        </div>
      </b-row>
    </b-container>
  </footer>
</template>


<script>
export default {
  props: ["styles"],
};
</script>
