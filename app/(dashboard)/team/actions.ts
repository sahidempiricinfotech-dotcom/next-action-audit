"use server";

import { teamRepo } from "@/src/lib/repositories";

export async function inviteTeamMember(formData: FormData) {
  return teamRepo.invite(
    String(formData.get("email") ?? ""),
    String(formData.get("invitedById") ?? ""),
  );
}
