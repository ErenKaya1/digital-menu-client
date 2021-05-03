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
};
