<template>
  <div>
    <subscription-status />
    <h1>Digital Menu</h1>
  </div>
</template>

<script>
import SubscriptionStatus from "@/components/Dashboard/Home/SubscriptionStatus.vue";

export default {
  components: { SubscriptionStatus },

  mounted() {
    this.$title = this.$t("dashboard.homeView.tabTitle");
  },
};
</script>