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

const isLoggedIn = async () => {
  let val = false;

  try {
    await http.post(apiEndpoint + "token/verify/", {});
    val = true; // access token is valid
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      // access token expired, needs to be refreshed
      try {
        await http.post(apiEndpoint + "token/refresh/", {});
        val = true;
      } catch (ex) {}
    }
  }

  return val;
};

const auth = {
  login,
  logout,
  isLoggedIn,
};

export default auth;
