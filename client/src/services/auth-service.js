import * as moment from "moment";
import jwt from "jsonwebtoken";
class AuthService {
  key_token = "auth_token";
  getToken() {
    return localStorage.getItem(this.key_token);
  }
  saveToken(token) {
    localStorage.setItem(this.key_token, token);
  }
  decode(token) {
    return jwt.decode(token);
  }
  invalidateUser() {
    return localStorage.removeItem(this.key_token);
  }
  getExpiration(token) {
    const exp = this.decode(token).exp;
    return moment.unix(exp);
  }
  isValid(token) {
    return moment().isBefore(this.getExpiration(token));
  }
  isAuthenticated() {
    const token = this.getToken();
    return token && this.isValid(token) ? true : false;
  }
}
export default new AuthService();
