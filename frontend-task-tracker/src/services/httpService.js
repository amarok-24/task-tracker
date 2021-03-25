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

  if (error.response.status === 401) {
    // Unauthorized, MIGHT need to refresh token
    try {
      await refreshToken();
      return axios(error.config); // try the request again after refreshing the access token
    } catch (ex) {
      if (ex.response.status === 400) {
        // No refresh token available, already logged out
        window.location = "/auth";

        // No code below this will be executed
      }
    }
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
