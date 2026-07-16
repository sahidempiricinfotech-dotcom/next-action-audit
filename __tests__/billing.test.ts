import { _recalculateInvoiceTotals } from "@/src/actions/billing";

describe("invoice totals", () => {
  it("keeps the recalculation helper importable", () => {
    expect(_recalculateInvoiceTotals).toBeDefined();
  });
});
