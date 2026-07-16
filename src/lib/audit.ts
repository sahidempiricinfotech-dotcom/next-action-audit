"use server";

import { auditRepo } from "@/src/lib/repositories";

export async function writeAuditLog(entry: {
  action: string;
  actorId?: string;
  metadata: object;
}) {
  return auditRepo.write(entry);
}
