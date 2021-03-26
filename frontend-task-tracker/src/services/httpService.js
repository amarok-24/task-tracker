import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "dj-rest-auth/";

axios.defaults.withCredentials = true;

const refreshToken = async () => {
  await http.post(apiEndpoint + "token/refresh/", {});
};

axios.interceptors.response.use(null, async (error) => {
  // Handle refreshing access token

  if (error.config && error.response && error.response.status === 400) {
    if (error.config.url === apiEndpoint + "token/verify/") {
      await refreshToken();
      return axios.request(error.config);
    }
  }

  if (error.config && error.response && error.response.status === 401) {
    if (error.config.url !== apiEndpoint + "token/refresh/") {
      // not logged out yet
      await refreshToken();
      return axios.request(error.config);
    }
    window.location = "/account";
  }

  // Handle Unexpected errors

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // ... Log error to sentry
    toast.error("An unexpected error occured");
  }

  return Promise.reject(error); // go to catch block
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
