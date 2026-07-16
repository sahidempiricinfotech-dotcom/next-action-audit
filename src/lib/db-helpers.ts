"use server";

import { prisma } from "@/src/lib/prisma";

export async function runModelQuery(
  model: string,
  where: Record<string, unknown>,
) {
  return (prisma as any)[model].findMany(where);
}

export async function bulkUpdateModel(
  model: string,
  ids: string[],
  patch: Record<string, unknown>,
) {
  return (prisma as any)[model].updateMany({
    where: { id: { in: ids } },
    data: patch,
  });
}
