import api from "./api";

export default {
  // 200 => OK, 400 => username or email already taken
  async register(credentials) {
    var response = await api().post("/user", credentials);
    return response.data;
  },
  // 200 => OK, 404 => username or password incorrect
  async authenticate(credentials) {
    var response = await api().post("/user/authenticate", credentials);
    return response.data;
  },
  async forgotPassword(credentials) {
    var response = await api().post("/user/forgot-password", credentials);
    return response.data;
  },
  // 200 => OK, 404 => no refresh token found in cookie, 400 => token is not active
  async refreshJwtToken() {
    var response = await api().get("/user/refresh-token");
    return response.data;
  },
};