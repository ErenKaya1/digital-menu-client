import client from "./httpClient";

export default {
  async getMenu(companySlug) {
    const response = await client.get(`/menu/${companySlug}`);
    return response.data;
  },

  async updateMenuTheme(userId, themeModel) {
    const response = await client.put(`/menu/theme/${userId}`, themeModel);
    return response.data;
  },

  async getMenuTheme(userId) {
    const response = await client.get(`/menu/theme/${userId}`);
    return response.data;
  },
};
