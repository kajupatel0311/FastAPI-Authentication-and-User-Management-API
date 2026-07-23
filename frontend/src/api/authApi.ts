import api from "./axios";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/auth";

export async function loginUser(
  data: LoginRequest
): Promise<LoginResponse> {

  const response = await api.post<LoginResponse>(
    "/users/login",
    data
  );

  return response.data;
}

export async function registerUser(
  data: RegisterRequest
): Promise<RegisterResponse> {

  const response = await api.post<RegisterResponse>(
    "/users/register",
    data
  );

  return response.data;
}

export async function forgotPassword(
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {

  const response =
    await api.post<ForgotPasswordResponse>(
      "/users/forgot-password",
      data
    );

  return response.data;
}

export async function resetPassword(
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> {

  const response =
    await api.post<ResetPasswordResponse>(
      "/users/reset-password",
      data
    );

  return response.data;
}
