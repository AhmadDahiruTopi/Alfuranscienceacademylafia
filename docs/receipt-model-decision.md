# Receipt model decision

The school system intentionally treats a payment with `status = verified` as the persistent receipt record. The payment row stores the immutable receipt reference, amount, method, student, invoice link, verifier, and timestamp. The printable receipt action is a read-only rendering derived from that verified payment and does not create a second mutable receipt row.

Unverified bank transfers and Paystack records cannot be printed as receipts. This preserves the existing audit trail and prevents a receipt from being issued before an authorized verification decision. If the academy later requires receipt numbering, reprints, voids, or tax metadata independent of payments, a dedicated `receipts` table can be added through a schema migration without changing the current payment verification contract.
