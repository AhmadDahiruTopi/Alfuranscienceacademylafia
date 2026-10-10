export type PaymentMethod = "Bank Transfer" | "Paystack";

export function validatePaymentReference(method: PaymentMethod, reference: string) {
  const normalized = reference.trim().toUpperCase();
  const valid = method === "Bank Transfer" ? /^TRF-[A-Z0-9-]{6,}$/.test(normalized) : /^PAYSTACK-[A-Z0-9-]{4,}$/.test(normalized);
  return { valid, normalized };
}
