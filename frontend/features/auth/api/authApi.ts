import { api } from "~/shared/lib/axios";


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

export async function loginRequest(payload: LoginPayload) {
  const response = await api.post(`/auth/login`, payload);
  return response.data;
}

export async function logoutRequest() {
  return await api.post('/auth/logout')
}

export async function registerRequest(payload: RegisterPayload) {
  const response = await api.post(`/auth/register`, payload);
  return response.data;
}

export const authMe = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};