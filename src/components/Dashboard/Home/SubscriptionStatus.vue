<template>
  <div>
    <b-alert variant="danger" show v-if="subscriptionStatus === 'Expired'">
      {{ $t("dashboard.homeView.subscriptionExpiredFirst") }}<b-link to="/dashboard/renew-subscription">{{ $t("dashboard.homeView.subscriptionExpiredSecond") }}</b-link>
    </b-alert>
    <b-alert variant="danger" show v-else-if="subscriptionStatus === 'Suspended'">{{ $t("dashboard.homeView.subscriptionSuspended") }}</b-alert>
  </div>
</template>

<script>
import subscriptionService from "@/services/subscriptionService";

export default {
  data() {
    return {
      subscriptionStatus: "",
    };
  },

  async mounted() {
    const response = await subscriptionService.checkSubscriptionStatus(this.$store.state.user.userId);
    if (response.success) {
      // Active, Expired, Suspended
      this.subscriptionStatus = response.message;
    }
  },
};
</script>