<template>
  <div>
    <b-row no-gutters class="text-center pt-4">
      <b-col md="4" class="d-flex flex-column py-4" :class="index != 2 ? 'pricing-bordered' : ''" v-for="(type, index) in subscriptionTypes" :key="type.id">
        <h5 class="m-0">{{ type.title }}</h5>
        <div class="flex-grow-1">
          <div class="py-4 my-2">
            <span class="d-inline-block text-muted text-big align-middle mr-2">₺</span>
            <span class="display-3 d-inline-block font-weight-bold align-middle pricing-price">{{ type.price }}</span>
            <span class="d-inline-block text-muted text-big align-middle ml-2">/ mo</span>
          </div>
          <div class="pb-5">
            <p class="mb-2" v-for="(feature, index) in type.features" :key="index">
              {{ feature.isUnlimited ? $t("landingView.pricing.unlimited") : feature.totalValue }} {{ feature.name }}
            </p>
          </div>
        </div>
      </b-col>
    </b-row>

    <div class="text-center pt-4">
      <b-link class="btn btn-landing-primary btn-lg" to="/register">{{ $t("landingView.pricing.freeTrialButtonText") }}</b-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["subscriptionTypes"],
};
</script>

<style scoped>
.pricing-bordered {
  border-right: 1px solid var(--color-muted);
}

h5 {
  font-weight: 500;
  color: var(--color-footer-text);
}

.pricing-price {
  font-weight: 700;
  color: var(--color-footer-text);
}
</style>
