import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "dj-rest-auth/registration/";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password1: user.password1,
    password2: user.password2,
  });
}
