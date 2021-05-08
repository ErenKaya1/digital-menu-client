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
  async updateCategory(userId, category) {
    const response = await client.put(`/category/${userId}/update`, category);
    return response.data;
  },
  async deleteCategory(userId, categoryId) {
    const response = await client.delete(`/category/${userId}/${categoryId}`);
    return response.data;
  },
  async getById(userId, categoryId) {
    const response = await client.get(`/category/${userId}/${categoryId}`);
    return response.data;
  },
};
