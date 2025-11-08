import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import type { InternalAxiosRequestConfig } from "axios";
import { apiClient } from "@/api/clients";
import { getCurrentUser, refreshToken } from "@/api/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";

export type AuthContextType = {
  user: User | undefined;
  token: string | null;
  isUserLoading: boolean;
  checkedAuth: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const refresh = async () => {
      const { success, data: accessToken } = await refreshToken();
      if (success && accessToken) {
        setToken(accessToken);
      }
      setCheckedAuth(true);
    };

    refresh();
  }, []);

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["me", token],
    queryFn: getCurrentUser,
    enabled: !!token,
    retry: false,
  });

  useLayoutEffect(() => {
    const authInterceptor = apiClient.interceptors.request.use(
      (config: CustomAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (!config._retry && token) config.headers.Authorization = `Bearer ${token}`;

        return config;
      }
    );
    return () => apiClient.interceptors.request.eject(authInterceptor);
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url?.includes("/auth/refresh-token")) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const { success, data: accessToken } = await refreshToken();
          if (success && accessToken) {
            setToken(accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return apiClient(originalRequest);
          } else {
            setToken(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => apiClient.interceptors.response.eject(refreshInterceptor);
  }, []);

  if (!checkedAuth) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setToken, token, isUserLoading, checkedAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
