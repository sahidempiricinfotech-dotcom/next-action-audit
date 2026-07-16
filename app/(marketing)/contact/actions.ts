"use server";

import { contactRepo } from "@/src/lib/repositories";

export async function submitContactForm(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const message = String(formData.get("message") ?? "");
  return contactRepo.submit(email, message);
}
