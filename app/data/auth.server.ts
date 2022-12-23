import { hash, compare } from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import createError from "http-errors";
import type { Role } from "@prisma/client";

import { db } from "./db.server";

const SESSION_SECRET = process.env.SESSION_SECRET || "supersecret";

export interface UserInterface {
  id: string;
  name: string;
  role: Role;
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

async function createUserSession(user: UserInterface, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", user.id);
  session.set("userName", user.name);
  session.set("userRole", user.role);

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const userId = session.get("userId");
  const userName = session.get("userName");
  const userRole = session.get("userRole");

  if (!userId) {
    return null;
  }

  return {
    id: userId,
    name: userName,
    role: userRole,
  };
}

export async function destroyUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request: Request) {
  const user = await getUserFromSession(request);

  if (!user) {
    throw redirect("/auth/login");
  }

  return user;
}

export async function signup({
  name,
  password,
}: {
  name: string;
  password: string;
}) {
  const existingUser = await db.user.findFirst({ where: { name } });

  if (existingUser) {
    throw createError(
      422,
      "A user with the provided email address exists already."
    );
  }

  const passwordHash = await hash(password, 12);

  const user = await db.user.create({
    data: { name, passwordHash },
  });
  return createUserSession(user, "/expenses");
}

export async function login({
  name,
  password,
}: {
  name: string;
  password: string;
}) {
  const existingUser = await db.user.findFirst({ where: { name } });

  if (!existingUser) {
    throw createError(
      401,
      "Could not log you in, please check the provided credentials."
    );
  }

  const passwordCorrect = await compare(password, existingUser.passwordHash);

  if (!passwordCorrect) {
    throw createError(
      401,
      "Could not log you in, please check the provided credentials."
    );
  }

  return createUserSession(existingUser, "/");
}
