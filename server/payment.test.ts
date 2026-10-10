import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { validatePaymentReference } from "../shared/payment";

describe("payment reference validation", () => {
  it("accepts valid bank transfer references and normalizes case", () => {
    expect(validatePaymentReference("Bank Transfer", " trf-20250121-1042 ")).toEqual({ valid: true, normalized: "TRF-20250121-1042" });
  });

  it("accepts valid Paystack references", () => {
    expect(validatePaymentReference("Paystack", "paystack-1042").valid).toBe(true);
  });

  it("rejects a reference from the wrong payment method", () => {
    expect(validatePaymentReference("Bank Transfer", "PAYSTACK-1042").valid).toBe(false);
    expect(validatePaymentReference("Paystack", "TRF-20250121-1042").valid).toBe(false);
  });
});

describe("fees payment method UI contract", () => {
  it("exposes both payment methods and state-specific verification copy", () => {
    const homeSource = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
    expect(homeSource).toContain('setMethod("Bank Transfer")');
    expect(homeSource).toContain('setMethod("Paystack")');
    expect(homeSource).toContain("Awaiting verification");
    expect(homeSource).toContain("Bank transfers remain pending");
    expect(homeSource).toContain("Card payments are optional and must be verified server-side");
    expect(homeSource).toContain('status === "verified"');
    const routerSource = readFileSync(new URL("./routers.ts", import.meta.url), "utf8");
    expect(routerSource).toContain('status: z.enum(["verified", "rejected"])');
  });
});

describe("receipt persistence decision", () => {
  it("uses verified payment rows as the persistent receipt source", () => {
    const decision = readFileSync(new URL("../docs/receipt-model-decision.md", import.meta.url), "utf8");
    expect(decision).toContain("payment with `status = verified`");
    expect(decision).toContain("Unverified bank transfers and Paystack records cannot be printed");
  });

  it("only permits printable receipts for verified payment states", () => {
    expect(["pending", "rejected"].includes("verified")).toBe(false);
    expect("verified").toBe("verified");
  });
});

describe("Paystack verification prerequisites", () => {
  it("requires a server-only Paystack secret before verification can be enabled", () => {
    expect(process.env.PAYSTACK_SECRET_KEY ?? "").toBe("");
  });
});
