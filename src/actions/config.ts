"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { configRepo } from "@/src/lib/repositories";

export async function getPublicConfig() {
  return configRepo.getPublic();
}

export async function updateThemeSetting(
  userId: string,
  input: string | FormData,
) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  if (session.user.role !== "member") return null;

  const theme =
    typeof input === "string" ? input : String(input.get("theme") ?? "system");
  return configRepo.updateTheme(userId, theme);
}
