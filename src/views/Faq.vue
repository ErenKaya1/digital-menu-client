<template>
  <div>
    <common-navbar />
    <div class="faq">
      <div class="faq-content">
        <h1 class="display-4 text-center pb-2 mb-5">Sık Sorulan Sorular</h1>
        <div class="faq-answers">
          <div class="accordion answer" role="tablist" v-for="(question, index) of $t('faqView.questions')" :key="index">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="div" class="p-1" role="tab">
                <span block v-b-toggle="`question-${index}`">
                  {{ question.question }}
                  <i class="collapse-icon"></i>
                </span>
              </b-card-header>
              <b-collapse :id="`question-${index}`" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <p class="text-muted">{{ question.answer }}</p>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import CommonNavbar from "@/components/Common/Navbar.vue";
import AppFooter from "@/components/Landing/Footer.vue";

export default {
  components: { CommonNavbar, AppFooter },

  mounted() {
    this.$title = this.$t("faqView.tabTitle");
  },
};
</script>

<style>
@import "../../node_modules/@fontsource/comfortaa/700.css";

.faq {
  margin-top: 90px;
}

.faq-content {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.faq-content h1 {
  color: var(--color-landing-primary);
  font-family: "Comfortaa";
}

.faq-content .faq-answers {
  width: 60%;
}

.faq-content .faq-answers .answer .card {
  border-radius: 10px;
}

.faq-content .faq-answers .card-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: none;
  background-color: var(--color-white);
}

.faq-content .faq-answers .answer .card-body {
  padding: 16px;
}

.faq-content .faq-answers .answer .card-body p {
  text-align: justify;
}

.faq-content .faq-answers .card-header span {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: var(--color-footer-text);
  padding: 8px;
}

@media (max-width: 768px) {
  .faq-content h1 {
    font-size: 36px;
  }

  .faq-content .faq-answers {
    width: 80%;
  }
}

@media (max-width: 512px) {
  .faq-content .faq-answers {
    width: 90%;
  }
}
</style>