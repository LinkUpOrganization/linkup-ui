import { apiClient } from "./clients";

export const refreshToken = async (): Promise<ApiResponse<string>> => {
  try {
    const response = await apiClient.post("/auth/refresh-token");
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data,
    };
  }
};

export const resendVerification = async (): Promise<ApiResponse<void>> => {
  try {
    await apiClient.post("/auth/resend-verification");
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data,
    };
  }
};

export const confirmEmail = async (token: string): Promise<ApiResponse<void>> => {
  try {
    await apiClient.post("/auth/confirm-email", { verificationToken: token });
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data,
    };
  }
};

export const verificationCooldown = async (): Promise<ApiResponse<number>> => {
  try {
    const response = await apiClient.get("/auth/verification-cooldown");
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data,
    };
  }
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

export async function register(data: RegisterPayload): Promise<string> {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
}

export async function login(data: LoginPayload): Promise<string> {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
}
