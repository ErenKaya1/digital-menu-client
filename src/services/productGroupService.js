import client from "./httpClient";

export default {
  async insertProductGroup(userId, productGroup) {
    const response = await client.post(`/productGroup/${userId}`, productGroup);
    return response.data;
  },
};
