<template>
  <div>
    <b-alert variant="danger" show v-if="subscriptionStatus === 'Expired'">
        Üyeliğiniz bitti.
        Üyeliğinizi yenilemek için <a href="#">tıklayınız.</a>
    </b-alert>
    <b-alert variant="danger" show v-else-if="subscriptionStatus === 'Suspended'">Üyeliğiniz askıya alındı.</b-alert>
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