export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string | null;
  provider: "local" | "google" | string;
  googleId: string | null;
  avatarUrl: string | null;
  role: string;
  status: string;
  emailVerifiedAt?: Date | null;
  deletedAt?: Date | null;
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
  passwordHash?: string | null;
  role?: string;
  status?: string;
  provider?: "local" | "google" | string;
  googleId?: string | null;
  avatarUrl?: string | null;
  emailVerifiedAt?: Date | null;
}

export interface GoogleProfileInput {
  googleId: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  emailVerifiedAt?: Date | null;
}
