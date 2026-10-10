# Overall Website Health Check

**Project:** Alfurqan Science Academy Lafia School Management System  
**Audit date:** 25 August 2026  
**Audit type:** Non-destructive application, runtime, database, dependency, and visual health check

## Executive summary

The application is currently running and the main automated quality gates pass. The complete Vitest suite passed with **201 tests across 19 test files**. TypeScript validation passed, and the production build completed successfully. Desktop and mobile dashboard previews rendered without visible layout overflow or a blank root page.

The audit identified several follow-up items. The dependency scan returned unresolved advisories, the production bundle contains a large JavaScript chunk, four orphan result rows remain in the database, the live `staff` table currently contains zero rows, and no CBT recordings are currently stored. These observations were not modified during this audit.

> **Overall status: Operational with follow-up items. No destructive database action was taken.**

## Verification results

| Area | Result | Evidence or observation |
|---|---|---|
| Automated tests | Passed | 201 tests passed across 19 files |
| TypeScript | Passed | `pnpm exec tsc --noEmit` completed without compiler errors |
| Production build | Passed | Vite frontend and server bundle completed successfully |
| Development server | Running | Managed server remained available on port 3000 during checks |
| Desktop rendering | Passed | 1280 × 720 dashboard preview rendered correctly |
| Mobile rendering | Passed | 390 × 844 dashboard preview rendered responsively without visible horizontal overflow |
| Database connection | Passed | Live database connection succeeded for read-only checks |
| Active session and term | Consistent | One active academic session and one active academic term found |
| Duplicate admission numbers | Clear | No duplicate admission-number groups found |
| Duplicate usernames | Clear | No duplicate username groups found in the earlier audit |
| Duplicate class names | Clear | No duplicate class names found |
| Duplicate subject names | Clear | No duplicate subject names found |
| Result-key duplication | Clear | No duplicate student/session/term/class/subject combinations found |
| Class-subject references | Clear | No class-subject rows pointed to missing classes |
| Subject-account user links | Clear | No subject-account rows pointed to missing users |

## Live database snapshot

| Entity | Total records | Notable status count |
|---|---:|---:|
| Students | 918 | 918 active |
| Users | 1,012 | 979 active |
| Staff profile rows | 0 | No staff profile rows currently present |
| Academy classes | 28 | 28 active |
| Class-subject assignments | 380 | 380 active |
| Examination cards | 472 | 472 issued |
| Result entries | 85 | No published entries in the current snapshot |
| Invoices | 1 | 1 unpaid |
| Payments | 1 | 1 verified |
| CBT examinations | 12 | No active examination in the snapshot |
| CBT attempts | 17 | Attempt history exists |
| CBT monitoring events | 8 | Monitoring events exist |
| CBT recordings | 0 | No stored recordings currently available |
| Gallery images | 5 | Records exist |
| Public announcements | 3 | Records exist |

The earlier audit also recorded 951 student-role accounts, 28 active classes, one active session, one examination card at that earlier point in time, and 81 result rows. The latest read-only counts show subsequent examination-card and result-entry activity.

## Data-integrity observations

The primary student-linked cleanup checks were clear for examination cards, invoices, payments, attendance, termly reports, enrollments, promotions, alumni, CBT attempts, monitoring events, and recordings. Four orphan rows remain in `resultEntries`; they reference student IDs that no longer exist. These are legacy alignment exceptions and should be reviewed before any cleanup is attempted.

The earlier audit also found one active student record, ID 1 (`Ahmad`, admission number `2026/AFSAL/SSS/001`), whose `className` was set to `Dahiru Topi`, which is not an active class. It also found 33 inactive orphan student login accounts referencing removed student IDs. These records were not deleted because database deletion is irreversible and the intended replacement or retention decision requires administrator confirmation.

The `staff` table currently contains zero profile rows even though the `users` table contains active accounts. This may reflect the current account model, but it should be confirmed because the administrator staff directory depends on whether staff identity is stored in `users`, `staff`, or both.

The database does not currently contain a school/tenant identity on the core tables inspected. Therefore, the live application remains a **single-school portal**. The multi-school SaaS master prompt is documentation only; multi-school runtime isolation has not been implemented in the current website.

## Runtime and browser observations

The latest browser-console entries show normal Vite connection messages and no current React exception, warning, or application error after the desktop and mobile captures. The network log contains successful requests as well as expected authorization responses from prior role-boundary and invalid-credential checks.

The latest sampled network status counts were 134 responses with status 200, 16 batched 207 responses, 2 historical 401 invalid-credential responses, and 48 historical 403 forbidden responses. The 401 and 403 responses are consistent with deliberate invalid-login and role-scope tests rather than evidence of a server crash. No current 5xx response was observed in the sampled logs.

One earlier Vite server-connection-loss message was followed by successful reconnection. The current managed development server is running normally.

## Build and dependency observations

The production build completed, but Vite reported that a JavaScript chunk is larger than 500 kB after minification. This does not currently prevent deployment, but route-level code splitting or dynamic imports would improve first-load performance, especially on Android devices.

The package manager reports that the `pnpm` field in `package.json` is no longer read by the installed pnpm version. The dependency advisory scan exited with findings: **1 critical, 23 high, 49 moderate, and 10 low** advisory records in the production dependency tree. Reported affected areas include Axios, DOMPurify, Mermaid, body-parser, form-data, nanoid, Drizzle ORM, spreadsheet tooling, and transitive dependencies. No upgrade was applied during this health check because several fixes require coordinated dependency changes and compatibility testing.

## Coverage and limitations

Existing regression coverage includes authentication and logout, role isolation, student and staff management, subject accounts, results, attendance, payments, assignments, CBT, student identity, examination cards, PWA behavior, printing, and workflow procedures. This audit confirmed the automated suite, compiler, build, database connection, runtime logs, and root-page visual behavior.

This audit did not perform an interactive login for every role or execute every authenticated workflow end to end during this pass. The examination-card preview and PDF workflow were covered by the existing 201-test suite and prior dedicated verification. A future acceptance pass should include administrator, subject-account, teacher, accountant, parent, and student click-throughs using administrator-approved credentials.

No fresh recording was created during this audit, so the CBT recording path could not be proven end to end from a new browser session. The database currently has monitoring events but zero stored recordings, which requires focused investigation.

## What was not changed

This was a read-only health audit. No student, staff, result, payment, examination-card, CBT, recording, or configuration record was inserted, deleted, or edited. No dependency upgrade was applied. No production feature behavior was changed.

## Recommended follow-up

1. Review the four orphan result rows and the 33 inactive orphan student accounts. Confirm whether they should be archived or permanently removed.
2. Confirm the correct active class for Ahmad before repairing the invalid class value.
3. Confirm why the staff profile table is empty while active user accounts exist, and align the staff directory data model if necessary.
4. Investigate why no CBT recordings are currently stored even though monitoring events exist; verify browser permissions, storage upload, metadata persistence, and retention cleanup.
5. Plan a dependency-security upgrade with package-by-package regression testing, prioritizing the critical and high findings and evaluating a maintained spreadsheet-library replacement for `xlsx` if still affected.
6. Reduce the initial JavaScript bundle through route-level code splitting.
7. If multi-school operation is desired, create a separate migration plan to add a tenant identity to every school-owned table, file, export, notification, and authorization path. Do not treat the current single-school database as multi-school safe until that migration is complete.
8. Run a full authenticated acceptance test with administrator-approved credentials before making further production changes.
