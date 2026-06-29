import { api } from "~/shared/lib/axios";
import type {
  AuthMeResponse,
  GoogleAuthPayload,
  LoginPayload,
  RegisterPayload,
} from "~/features/auth/types/auth.type";

export type {
  AuthUser,
  GoogleAuthPayload,
  LoginPayload,
  RegisterPayload,
} from "~/features/auth/types/auth.type";

export async function loginRequest(payload: LoginPayload) {
  const response = await api.post(`/auth/login`, payload);
  return response.data;
}

export async function logoutRequest() {
  return await api.post("/auth/logout");
}

export async function registerRequest(payload: RegisterPayload) {
  const response = await api.post(`/auth/register`, payload);
  return response.data;
}

export async function googleAuthRequest(payload: GoogleAuthPayload) {
  const response = await api.post("/auth/google", payload);
  return response.data;
}

export async function authMe() {
  const response = await api.get<AuthMeResponse>("/auth/me");
  return response.data.data;
}
