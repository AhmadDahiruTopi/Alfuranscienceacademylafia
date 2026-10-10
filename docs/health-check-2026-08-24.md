# Alfurqan Science Academy Lafia — Portal Health Check

**Date:** 24 August 2026

## Scope and safety

This check used read-only queries against the live database, source-level contract review, runtime-log inspection, the automated test suite, TypeScript validation, and a production build. No existing student, result, payment, JAMB, or media records were deleted or rewritten. The only implementation changes in this check harden future writes and imports.

## Overall status

The portal is operational at the application level. The development server is running, database connectivity is healthy, authentication is responding, and the production build succeeds. The automated suite contains 171 passing tests across 17 test files.

| Area | Status | Finding |
|---|---|---|
| Authentication and role model | Healthy with legacy inactive links | Active admin, teacher, accountant, and student accounts are present. Thirty-three inactive student user accounts retain links to student IDs that no longer exist; no active account was identified in that anomaly group. |
| Students and classes | Needs data cleanup approval | 918 student rows and 28 classes exist. One legacy student row uses `Dahiru Topi` as its class name, which is not a current class. |
| Staff directory | Expected-empty but operational | The dedicated `staff` table currently has 0 rows. Teacher access is currently represented through user and subject-account records, so the staff directory will remain empty until administrator-managed staff profiles are created. |
| Subjects and assignments | Operational with legacy artifacts | 56 subjects, 380 class-subject assignments, 56 subject accounts, and 380 subject-class permissions exist. Two old class-subject rows have teacher IDs that do not resolve in the dedicated `staff` table; the current application joins assignment teachers to `users`, so these require review rather than automatic deletion. |
| Results and reports | Needs data cleanup approval | 81 result entries exist. Four legacy rows reference missing student IDs, and one exact header-shaped row is present from an earlier import. One termly report exists and has no missing student reference. |
| Fees and payments | Operational | One invoice and one payment exist, and no orphan student or invoice references were found. Payment status remains subject to the configured verification workflow. |
| Attendance and assignments | Expected-empty/low-volume | Attendance has 0 rows, assignment submissions have 0 rows, and one assignment exists. These are valid empty states until staff begin recording activity. |
| JAMB | Operational with legacy header artifacts | Six JAMB subjects, 10 exam sets, 265 questions, 10 attempts, 38 answers, and 6 monitoring events exist. The latest monitored attempt has persisted one video and one audio recording, and the recording rows resolve to the same student and attempt. Older header-shaped rows exist in attempt/event history and should not be deleted automatically. |
| Notifications and PWA | Operational | Three public announcements and five gallery images exist. The PWA manifest, service worker, install/update controls, notification center, and policy-gated push behavior are covered by tests. |

## Safeguards added

Student CSV import now requires `name` and `parentPhone` columns, rejects header-like data rows, and reports a clear validation error. Server-side student creation and updates now reject unknown or inactive classes. Class-subject creation now rejects unknown or inactive class IDs. These protections prevent future malformed imports and orphan class references without changing existing data.

## Recommended data cleanup

The malformed legacy rows should be reviewed in the administrator workspace before deletion. The safest next step is to add a reviewed data-quality quarantine workflow that lists exact anomalies, shows the affected records and dependencies, and requires explicit administrator confirmation before permanent removal. The 33 inactive user links should be reconciled separately because they may represent historical accounts created before student records were removed.

## Verification result

The final verification completed with 171 passing Vitest tests, TypeScript validation, and a successful production build. Existing historical log entries include transient sandbox proxy failures and old HMR reload warnings; no current server startup failure was observed after the latest restart.
