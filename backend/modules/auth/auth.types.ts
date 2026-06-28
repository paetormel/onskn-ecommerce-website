export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  passwordHash?: string;
  role: string;
  status: string;
  createdAt?: Date;
}

export interface AccessTokenPayload {
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  passwordHash: string;
  role?: string;
  status?: string;
}
