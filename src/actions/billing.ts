"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { billingRepo } from "@/src/lib/repositories";

export async function getBillingProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  return billingRepo.findByUserId(session.user.id);
}

export async function updateBillingProfile(input: {
  userId: string;
  displayName: string;
  address?: string;
}) {
  return billingRepo.saveProfile(
    input.userId,
    input.displayName,
    input.address,
  );
}

// exported for tests
export async function _recalculateInvoiceTotals(invoiceId: string) {
  return billingRepo.recalculateInvoiceTotals(invoiceId);
}
