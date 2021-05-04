import client from "./httpClient";

export default {
  async getSubscriptionTypes() {
    const response = await client.get("/subscription/types");
    return response.data;
  },

  async checkSubscriptionStatus(userId) {
    const response = await client.get(`/subscription/check/${userId}`);
    return response.data;
  },

  async renewSubscription(userId, subscriptionModel) {
    const response = await client.post(`subscription/${userId}`, subscriptionModel);
    return response.data;
  },
};
