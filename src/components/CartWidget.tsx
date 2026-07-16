"use client";

import { cartRepo } from "@/src/lib/repositories";

export function CartWidget() {
  async function applyPromoCode(formData: FormData) {
    "use server";

    return cartRepo.applyPromo(
      String(formData.get("userId") ?? ""),
      String(formData.get("code") ?? ""),
    );
  }

  return (
    <form action={applyPromoCode}>
      <input name="userId" defaultValue="guest-cart" hidden />
      <input name="code" aria-label="Promo code" />
      <button type="submit">Apply promo</button>
    </form>
  );
}
