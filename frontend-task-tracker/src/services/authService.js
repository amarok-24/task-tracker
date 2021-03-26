import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "dj-rest-auth/";

const login = async (email, password) => {
  await http.post(apiEndpoint + "login/", { email, password });

  // await fetch(apiEndpoint + "login/", {
  //   method: "POST",
  //   headers: { "Content-type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  //   credentials: "include",
  // });
};

const logout = async () => {
  await http.post(apiEndpoint + "logout/", {});
};

const auth = {
  login,
  logout,
};

export default auth;
