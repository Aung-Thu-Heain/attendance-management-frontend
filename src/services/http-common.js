import axios from 'axios';
import { useLoginStore } from '@/stores/auth';

const baseUrl = import.meta.env.VITE_BASE_URL;

axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use((config) => {
  const loginStore = useLoginStore();
  // Default Content-Type
  let contentType = 'application/json';

  // Check if the config specifies a different content type
  if (config.headers && config.headers['Custom-Content-Type']) {
    contentType = config.headers['Custom-Content-Type'];
    delete config.headers['Custom-Content-Type'];
  }
  config.headers['Content-Type'] = contentType;
  config.headers['Accept'] = 'application/json';
  config.headers['Authorization'] = loginStore.getToken;

  return config;
});

//For Unauthorized response handler
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized. Logging out...');

      // For example, log out the user
      const loginStore = useLoginStore();
      loginStore.unAuthorizedLogout();
    }

    return Promise.reject(error);
  }
);

export const HTTP = axios;
