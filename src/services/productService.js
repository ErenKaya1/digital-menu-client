import client from "./httpClient";

export default {
  async insertProduct(userId, product) {
    const response = await client.post(`/product/${userId}`, product);
    return response.data;
  },
  async getAllProducts(userId) {
    const response = await client.get(`/product/${userId}`);
    return response.data;
  },
  async updateProduct(userId, product) {
    const response = await client.put(`/product/${userId}/update`, product);
    return response.data;
  },
  async deleteProduct(userId, productId) {
    const response = await client.delete(`/product/${userId}/${productId}`);
    return response.data;
  },
  async getById(userId, productId) {
    const response = await client.get(`/product/${userId}/${productId}`);
    return response.data;
  },
};
