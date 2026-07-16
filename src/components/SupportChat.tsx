"use client";

import { ticketRepo } from "@/src/lib/repositories";

export function SupportChat() {
  async function attachFileToTicket(formData: FormData) {
    "use server";

    return ticketRepo.attach(
      String(formData.get("ticketId") ?? ""),
      String(formData.get("url") ?? ""),
    );
  }

  return (
    <form action={attachFileToTicket}>
      <input name="ticketId" aria-label="Ticket ID" />
      <input name="url" aria-label="Attachment URL" />
      <button type="submit">Attach file</button>
    </form>
  );
}
