"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { settingsRepo } from "@/src/lib/repositories";

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  return settingsRepo.updateProfile(
    session.user.id,
    String(formData.get("name") ?? ""),
  );
}

export async function updateEmailPreferences(formData: FormData) {
  const userId = String(formData.get("userId") ?? "");
  return settingsRepo.updateEmailPreferences(
    userId,
    formData.get("newsletter") === "on",
    formData.get("productUpdates") === "on",
  );
}
