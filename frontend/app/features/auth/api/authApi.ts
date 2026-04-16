import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

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
  const response = await axios.post(`${API_BASE_URL}/v1/auth/login`, payload);
  return response.data;
}

export async function registerRequest(payload: RegisterPayload) {
  const response = await axios.post(`${API_BASE_URL}/v1/auth/register`, payload);
  return response.data;
}
