import client from "./httpClient";

export default {
  // 200 => OK, 400 => username or email already taken
  async register(credentials) {
    const response = await client.post("/user", credentials);
    return response.data;
  },
  // 200 => OK, 404 => username or password incorrect
  async authenticate(credentials) {
    const response = await client.post("/user/authenticate", credentials);
    return response.data;
  },
  async forgotPassword(credentials) {
    const response = await client.post("/user/forgot-password", credentials);
    return response.data;
  },
  async logout(userId) {
    const response = await client.delete(`/user/logout/${userId}`);
    return response.data;
  },
  async resetPassword(credentials) {
    const response = await client.post("/user/reset-password", credentials);
    return response.data;
  },
};