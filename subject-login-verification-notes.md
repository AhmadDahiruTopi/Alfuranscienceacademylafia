# Subject-account login verification

Date: 2026-08-25

The active subject account `AFS-90010` was checked against the live database. The account is active, has the Staff/teacher role, and its linked user row is correct. The stored initial password is `6AX8GBF61D`; the previously tested value `6AX8GBF61` was missing the final `D`, which caused the `Invalid username or password` response.

A direct database hash check confirmed that the complete stored password matches the linked user hash. The portal Staff login was then tested end to end with `AFS-90010` and `6AX8GBF61D`; the request succeeded and routed to the staff dashboard. The dashboard displayed the expected class/subject selectors, blank upload workbook action, completed-score upload control, and Save scores action.

No application-code credential fix was required because the authentication path was functioning correctly. The issue was an incomplete password entry. The complete password should be copied from the administrator subject-account workspace or its export rather than typed from a truncated display.

## Screenshot-specific AFS-300014 verification

- The exact screenshot username was checked against the live subject-account row; its account is active, linked to the Staff role, and has assigned SSS classes and a subject.
- The server-level `auth.staffLogin` reproduction accepted the supplied credential pair and set a session cookie.
- The live browser Staff login accepted the same pair and routed to the Staff dashboard. The dashboard exposed the expected session, term, assigned classes, bilingual subject, blank workbook, completed-score upload, and save controls.
- No application-code authentication change was required; the earlier failure was caused by the credential being entered incompletely or from a stale/incorrect copy. Plaintext passwords are intentionally not stored in this additional note.
