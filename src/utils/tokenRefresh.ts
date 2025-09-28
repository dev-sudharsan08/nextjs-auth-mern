import axios from 'axios';

export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await axios.post('/api/users/refresh-token', {}, {
      withCredentials: true
    });

    if (response.data.success) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};

export const setupAxiosInterceptors = () => {
  // Request interceptor to add auth header
  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle token refresh
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshSuccess = await refreshAccessToken();

        if (refreshSuccess) {
          // Retry the original request
          return axios(originalRequest);
        } else {
          // Refresh failed, redirect to login
          window.location.href = '/login';
        }
      }

      return Promise.reject(error);
    }
  );
};
