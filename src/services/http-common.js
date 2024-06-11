import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use((config) => {
  // Default Content-Type
  let contentType = "application/json";

  // Check if the config specifies a different content type
  if (config.headers && config.headers["Custom-Content-Type"]) {
    contentType = config.headers["Custom-Content-Type"];
    delete config.headers["Custom-Content-Type"];
  }
  config.headers["Content-Type"] = contentType;
  config.headers["Accept"] = "application/json";
  config.headers["Authorization"] =
    "2|T8QdxpOaP3Dex9hnLqLOmCT5Vul3KOfAGR8yrncUfb851e28";

  return config;
});

//For Unauthorized response handler
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const HTTP = axios;
