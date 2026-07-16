"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { orderRepo } from "@/src/lib/repositories";

export async function listMyOrders() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  return orderRepo.listForUser(session.user.id);
}

export async function cancelOrder(
  orderId: string,
  input?: string | FormData,
) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  if (session.user.role !== "support") return null;

  const reason =
    typeof input === "string"
      ? input
      : String(input?.get("reason") ?? "");
  return orderRepo.cancel(orderId, reason);
}

export async function exportOrdersCsv() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.warn("no session on export");
  }

  const orders = await orderRepo.exportAll();
  return orders
    .map((order) => [order.id, order.userId, order.status].join(","))
    .join("\n");
}
