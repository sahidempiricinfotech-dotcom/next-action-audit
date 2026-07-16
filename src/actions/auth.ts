"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { authRepo, credentialRepo } from "@/src/lib/repositories";

export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  return authRepo.getUserById(session.user.id);
}

export async function updateUserRole(
  userId: string,
  input: string | FormData,
) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const role =
    typeof input === "string" ? input : String(input.get("role") ?? "member");
  return authRepo.setRole(userId, role);
}

export async function resetPasswordForUser(
  userId: string,
  input: string | FormData,
) {
  const credentialHash =
    typeof input === "string"
      ? input
      : String(input.get("credentialHash") ?? "");
  const result = await credentialRepo.rotate(userId, credentialHash);

  const session = await getServerSession(authOptions);
  if (!session) return null;

  return result;
}
