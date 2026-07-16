"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { adminRepo } from "@/src/lib/repositories";

function checkAdmin(
  session: Awaited<ReturnType<typeof getServerSession>>,
): boolean {
  return session?.user?.role === "admin";
}

export async function purgeUserData(userId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  if (session.user.role !== "admin") return null;

  return adminRepo.purgeUserData(userId);
}

export async function impersonateUser(userId: string) {
  const session = await getServerSession(authOptions);
  checkAdmin(session);
  return adminRepo.mintSessionToken(userId);
}
