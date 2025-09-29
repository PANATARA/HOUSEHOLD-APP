import { getAccessToken, getRefreshToken, saveAccessToken } from "@/core/secureStorage";
import axios from "axios";

export const backendURL = "http://192.168.0.90:8000/api";

export const api = axios.create({
  baseURL: backendURL,
});

export async function refreshAccessToken(): Promise<void> {
  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      throw new Error("Refresh token отсутствует");
    }

    const response = await axios.post("http://192.168.0.90:8000/api/login/refresh", {
      refresh_token: refreshToken,
    });

    const accessToken = response.data?.access_token;

    if (accessToken) {
      await saveAccessToken(accessToken);
    } else {
      throw new Error("The server did not return the token.");
    }
  } catch (error: any) {
    throw new Error(error?.message || "Unknown Erorr");
  }
}

{
  /*Adding an Access Token to the Request Header*/
}
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token && config.headers) {
    config.headers.set?.("Authorization", `Bearer ${token}`);
  }
  return config;
});

{
  /* In case of error 401, update the access token and repeat the request */
}
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("DEBUG: 401 ошибка, обновление токена");
      originalRequest._retry = true; // The _retry field was added to avoid cycles

      try {
        await refreshAccessToken();
        const newAccessToken = await getAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log("DEBUG: Токен обновлен, повтор запроса");
        return api(originalRequest);
      } catch (e) {
        console.warn("Token error:", e);
        return Promise.reject(e);
      }
    } else if (error.response?.status === 500) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("Network error:", error.message);
    } else {
      console.error("Unexpected error:", error.message);
    }

    return Promise.reject(error);
  },
);
