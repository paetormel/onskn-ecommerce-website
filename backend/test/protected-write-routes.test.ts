import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import { after, before, test } from "node:test";

process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??=
  "postgresql://postgres:postgres@127.0.0.1:5432/ecommerce_test";
process.env.JWT_SECRET ??= "test-secret";
process.env.CORS_ORIGIN ??= "http://localhost:5173";
process.env.CLOUDINARY_NAME ??= "";
process.env.CLOUDINARY_KEY ??= "";
process.env.CLOUDINARY_SECRET ??= "";

const { default: app } = await import("../app/app.js");
const authService = (await import("../modules/auth/auth.service.js")).default;
const { signAccessToken } = await import("../modules/auth/auth.token.js");

let server: Server;
let baseUrl = "";

before(async () => {
  server = createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Failed to start test server");
  }

  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
});

test("anonymous POST /api/v1/products is rejected", async () => {
  const response = await fetch(`${baseUrl}/api/v1/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  assert.equal(response.status, 401);

  const payload = (await response.json()) as { success?: boolean };
  assert.equal(payload.success, false);
});

test("anonymous POST /api/v1/uploads is rejected", async () => {
  const response = await fetch(`${baseUrl}/api/v1/uploads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  assert.equal(response.status, 401);

  const payload = (await response.json()) as { success?: boolean };
  assert.equal(payload.success, false);
});

test("non-admin POST /api/v1/products is forbidden", async () => {
  const customerUser = {
    id: "11111111-1111-1111-1111-111111111111",
    fullName: "Customer One",
    email: "customer1@example.com",
    passwordHash: null,
    provider: "local",
    googleId: null,
    avatarUrl: null,
    role: "customer",
    status: "active",
    emailVerifiedAt: null,
    deletedAt: null,
    createdAt: new Date(),
  };

  const originalFindById = authService.findById;
  authService.findById = async () => customerUser;

  try {
    const token = signAccessToken({
      id: customerUser.id,
      role: customerUser.role,
    });

    const response = await fetch(`${baseUrl}/api/v1/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    assert.equal(response.status, 403);

    const payload = (await response.json()) as { success?: boolean };
    assert.equal(payload.success, false);
  } finally {
    authService.findById = originalFindById;
  }
});
