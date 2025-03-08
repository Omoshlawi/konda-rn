import axios from "axios";
import { TokenPair, useSessionStore } from "../global-store";

const httpClient = axios.create({
  baseURL: `https://konda.onrender.com/api`,
  // baseURL: `http://192.168.162.81:5000/api`,
});

httpClient.interceptors.request.use(
  // set access token if not set
  async function (config) {
    try {
      const token = useSessionStore.getState().session?.token;
      if (token && !config.headers?.get("x-access-token")) {
        config.headers.set("x-access-token", token.accessToken); // Use set method to conform to InternalAxiosHeaders
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  function (error) {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
httpClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      const sessionStore = useSessionStore.getState();
      const { token } = sessionStore.session;
      if (token?.refreshToken) {
        try {
          // Attempt to refresh the token
          const refreshResponse = await axios.get<TokenPair>(
            `${httpClient.defaults.baseURL}/auth/refresh-token`,
            { headers: { "x-refresh-token": token.refreshToken } }
          );
          const newToken = refreshResponse.data;
          sessionStore.setSessionToken(newToken); // Update session with new token
          sessionStore.cacheSession?.({ token: newToken }); // Update cache
          // Retry the original request with the new token
          originalRequest.headers["x-access-token"] = newToken.accessToken;
          return httpClient(originalRequest);
        } catch (refreshError) {
          // Clear session if refresh fails
          console.error("Token refresh failed:", refreshError);
          sessionStore.clearSession();
          sessionStore.clearCache?.();
        }
      } else {
        // Clear session if no refreshToken is available
        sessionStore.clearSession();
        sessionStore.clearCache?.();
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
