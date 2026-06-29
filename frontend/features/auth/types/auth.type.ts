import type { ApiResponse } from "~/shared/types/api.types";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type GoogleAuthPayload = {
  credential: string;
};

export type AuthMeResponse = ApiResponse<AuthUser>;
