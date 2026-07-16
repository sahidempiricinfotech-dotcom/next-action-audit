"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { userRepo } from "@/src/lib/repositories";

export async function deleteUser(userId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  if (session.user.role !== "admin") return null;

  return userRepo.delete(userId);
}
