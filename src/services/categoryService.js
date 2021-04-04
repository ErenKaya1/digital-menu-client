import client from "./httpClient";

export default {
  async insertCategory(userId, category) {
    const response = await client.post(`/category/${userId}`, category);
    return response.data;
  },
  async getAllCategories(userId) {
    const response = await client.get(`/category/${userId}`);
    return response.data;
  },
};
