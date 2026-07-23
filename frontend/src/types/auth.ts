export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

export type ResetPasswordRequest = {
  token: string;
  new_password: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};
