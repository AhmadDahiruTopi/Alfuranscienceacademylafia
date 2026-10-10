# Examination-card content regression — 26 August 2026

## Findings

The examination-card renderer now uses the explicitly selected student ID rather than silently falling back to the first student when a stale selection exists. Each printable portrait carries the selected student ID and admission number as data attributes, uses the persisted profile-image key through `resolveStoredImageUrl`, and is eager-loaded before print.

The print stylesheet explicitly keeps the examination-card source, rules block, signature block, and portrait visible and opaque. The rules and signature are protected from page splitting, and the card no longer clips the lower content with `overflow: hidden` during print. The browser print trigger waits for the card images and fonts before opening the native print dialog.

## Verification

The live database record for student `180001` is Ahmad Dahiru Topi, admission number `2026/AFSAL/SSS/002`, class `SSS 1A`, with stored portrait key `student-profiles/1470001/1787697792450-1000000575-portrait_2bdb2f57.jpg`. The same-origin application path resolves successfully to `HTTP 200 image/jpeg` after redirect. The examination-card print source contains the rules heading, manual Exam Officer Signature markup, and the selected-student portrait binding.

Focused examination-card and print UI tests pass 19/19. The full suite passes 208/208. TypeScript validation and the production build pass. No database records were modified.

## Remaining user-side check

The final Android Save as PDF screen should be checked once more with the selected SSS 1A student. Confirm that the native PDF preview shows the rules, the manual signature line, and Ahmad Dahiru Topi’s portrait before saving.
