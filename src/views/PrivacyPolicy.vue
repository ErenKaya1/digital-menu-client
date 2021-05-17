<template>
  <div>
    <common-navbar />
    <div class="privacy-policy">
      <div class="privacy-policy-content">
        <h1 class="display-4 text-center pb-2 mb-5">{{ $t("privacyPolicyView.pageTitle") }}</h1>
        <div class="policies">
          <div class="policy" v-for="(policy, index) in policies" :key="index">
            <p class="title">{{ index + 1 }}. {{ policy.title }}</p>
            <p class="content">{{ policy.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <app-navbar />
  </div>
</template>

<script>
import CommonNavbar from "@/components/Common/Navbar.vue";
import AppNavbar from "@/components/Landing/Footer.vue";

export default {
  components: { CommonNavbar, AppNavbar },

  data() {
    return {
      policies: this.$t("privacyPolicyView.policies"),
    };
  },

  mounted() {
    this.$title = this.$t("privacyPolicyView.tabTitle");
  },
};
</script>

<style>
@import "../../node_modules/@fontsource/comfortaa/700.css";

.privacy-policy {
  margin-top: 90px;
  width: 100%;
}

.privacy-policy-content {
  padding-top: 50px;
  width: 60%;
  margin: auto;
}

.privacy-policy-content h1 {
  color: var(--color-landing-primary);
  font-family: "Comfortaa";
}

.privacy-policy-content .policy {
  margin-bottom: 40px;
}

.privacy-policy-content .policy .title {
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 22px;
}

.privacy-policy-content .policy .content {
  font-size: 18px;
  letter-spacing: 0.1px;
  color: var(--color-bold-muted);
  line-height: 1.5;
  text-align: justify;
}

@media (max-width: 768px) {
  .privacy-policy-content h1 {
    font-size: 36px;
  }

  .privacy-policy-content {
    width: 80%;
  }

  .privacy-policy-content .policy .title {
    font-size: 18px;
  }

  .privacy-policy-content .policy .content {
    font-size: 16px;
  }
}

@media (max-width: 512px) {
  .privacy-policy-content .policy .title {
    font-size: 16px;
  }

  .privacy-policy-content .policy .content {
    font-size: 14px;
  }
}
</style>