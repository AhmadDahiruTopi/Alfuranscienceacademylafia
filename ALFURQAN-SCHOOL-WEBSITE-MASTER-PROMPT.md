# Master Prompt: Modern Multi-School SaaS Management System

Copy and paste the following prompt into an AI software-building assistant when requesting the complete school portal.

---

## Project instruction

Build a modern, production-ready, responsive, secure **multi-school SaaS school-management platform** based on the complete functionality, workflow quality, visual style, and print standards of the reference school portal. Do not hardcode the reference school’s name, logo, address, phone number, colors, admission prefix, or other identity. Every school must configure its own branding and school information during onboarding. The application must support Nursery, Primary, Junior Secondary, and Senior Secondary sections and must use live database records rather than hardcoded demo data.

The platform must be multi-tenant from the beginning. Each registered school is an isolated tenant with its own administrators, staff, students, parents, classes, subjects, sessions, terms, results, payments, examination cards, ID cards, CBT records, announcements, files, branding, and settings. A Super Admin may manage the platform and schools, while each School Admin can manage only the tenant assigned to that school. The product must be suitable for onboarding many schools without one school ever seeing or modifying another school’s information.

Use the reference portal’s premium academic dashboard style: deep indigo, royal purple, white, soft lavender panels, restrained gold accents, rounded cards, readable typography, clear status badges, responsive sidebars, polished empty states, strong print layouts, and mobile-friendly interactions.

Use a premium, clean, academic visual style with deep indigo, royal purple, white, soft lavender, and restrained gold accents. The interface should be professional, readable, mobile-friendly, and suitable for school administrators, teachers, subject accounts, accountants, parents, and students. Use accessible labels, visible focus states, responsive layouts, loading states, empty states, error messages, success notifications, and confirmation dialogs for destructive or important actions.

## Recommended technical foundation

Use React 19 with TypeScript, Tailwind CSS 4, tRPC 11, Drizzle ORM, and a MySQL-compatible database. Use a component-based dashboard layout with a persistent responsive sidebar for internal workspaces. Use server-side authorization for every protected operation. Use Vitest for regression tests, TypeScript validation, and production-build verification.

Use object storage for photos, signatures if ever needed for non-student purposes, documents, audio, and video. Store only file metadata and storage references in the database. Do not store large binary files directly in database columns. Do not place large media files inside the frontend public directory.

Never invent fake customer reviews, ratings, testimonials, payment confirmations, examination results, student records, or demo users in the production experience. If test data is needed during development, label it clearly and remove it before release.

## Roles and access control

Implement these roles with separate dashboards and permissions:

1. **Platform Super Administrator**, with access to platform-level school onboarding, tenant management, subscription plans, feature entitlements, platform analytics, support tools, and system configuration. This role must not expose one school’s private academic or financial records to another school except through explicitly authorized support tools.
2. **School Administrator**, with full access only to the records belonging to the administrator’s selected school tenant.
3. **Principal**, with school-level academic and operational access according to configured permissions.
4. **Teacher or Staff**, with access to assigned classes, subjects, attendance, assignments, and result-entry workspaces.
5. **Subject Account**, a separate username/password account dedicated to one subject and its assigned classes.
6. **Accountant**, focused on fees, invoices, payments, verification, balances, and receipts.
7. **Parent**, linked only to the parent’s children and permitted school information.
8. **Student**, linked only to the student’s own academic and personal records.

Every server procedure must verify authentication, role, school identity, and record ownership or assignment scope. Never rely only on hidden frontend buttons for security.

## Authentication and account security

Provide local username/password login and the configured school authentication provider where available. Include session persistence, secure logout, password hashing, account activation/deactivation, credential reset, and clear invalid-credential messages.

Students must use their admission number as their username. New student accounts should receive the school’s configured initial password and must be required to change it after the first successful login. Administrators must have a reset-password action in the student profile.

Normalize accidental whitespace in usernames during login to accommodate mobile typing and copied credential sheets, while keeping passwords exact and case-sensitive. Subject accounts must have independent credentials and must not be treated as ordinary staff logins.

## School settings and branding

Create a per-school onboarding and School Settings workspace containing:

- Configurable school name in English.
- Configurable school name in Arabic where applicable.
- School logo and crest.
- School address and phone number.
- Official school colors and typography preferences.
- Dashboard greeting text.
- Active academic session and term.
- Term ending and next-term beginning dates.
- Examination rules and regulations.
- Receipt heading, footer, and receipt-number prefix.
- Optional school-specific terminology overrides.
- Tenant subdomain or school workspace identifier.
- Subscription tier and enabled feature entitlements.
- School timezone, locale, and data-retention settings.
- School-specific notification and privacy policy settings.

Do not require an uploaded exam-officer signature for student examination cards. Examination cards must provide a blank **Exam Officer** signature line for manual signing after the student prints the card.

## Academic structure

Support the following sections:

- Nursery.
- Primary.
- Junior Secondary School, abbreviated JSS.
- Senior Secondary School, abbreviated SSS.

Support classes such as Nursery 1A, Nursery 1B, Primary 1A, Primary 1B, JSS 1A, JSS 1B, JSS 2A, JSS 2B, JSS 3A, JSS 3B, SSS 1A, SSS 1B, SSS 2A, SSS 2B, SSS 3A, and SSS 3B. Allow administrators to add other valid classes without changing application code.

Provide class creation, editing, activation/deactivation, section assignment, class rosters, academic sessions, academic terms, and session-specific enrollment. New students must be synchronized into the active session roster automatically.

Provide subject creation as a simple form that asks for the subject’s English name and Arabic name. Do not require class selection when creating a subject. After creation, allow administrators to assign subjects to teachers, subject accounts, classes, sections, sessions, and terms.

Support subject editing, archiving, bilingual display, missing-Arabic-name translation assistance, a review/confidence indicator before saving AI-assisted translations, and terminology overrides for Qur’an, Islamic Studies, and local curriculum subjects.

## Student and staff management

Create a student directory with:

- Add student.
- Edit student.
- Delete student.
- Bulk delete with confirmation.
- Bulk CSV import.
- Downloadable CSV import template.
- CSV export.
- Search.
- Filters for session, section, class, gender, and account status.
- Single-student class transfer.
- Bulk class transfer.
- Student profile view.
- Student photo upload, crop, replacement, and removal.
- Photo-change audit history.
- Student account creation and reset.
- Linked parent information where available.

Generate admission numbers automatically in uppercase using each school’s configurable prefix and this pattern:

`<YEAR>/<SCHOOL_CODE>/NUR/001`

`<YEAR>/<SCHOOL_CODE>/PRI/001`

`<YEAR>/<SCHOOL_CODE>/JSS/001`

`<YEAR>/<SCHOOL_CODE>/SSS/001`

Use the active academic year and section code dynamically. Number students sequentially within the relevant class or configured school scope, using three digits from 001 onward. Do not duplicate admission numbers.

Create a staff directory with staff profiles, roles, departments, contact information, account status, photo upload/cropping/replacement/removal, password reset, and audit history. Ensure staff records never appear in student-only listings and student records never appear in staff-only listings.

## Teacher and subject-account portal

Create a clear teacher workspace showing:

- The logged-in person or subject account.
- Assigned section.
- Assigned class.
- Assigned subject.
- Academic session and term.
- Pending or incomplete uploads.
- Last update time.
- Save status.

A subject account must see only its assigned subject and assigned classes. It must not view or edit another subject, class, section, or student outside the permitted scope. Attempted out-of-scope reads, saves, and submissions must be rejected server-side.

Provide subject-account credential generation, credential reset, section filtering, printable credential sheets, CSV export, Excel-compatible export, and logout.

## Result entry and grading

Implement score entry for the four school sections using these exact grading rules:

| Section | First CA | Second CA | Third CA | Examination | Total |
|---|---:|---:|---:|---:|---:|
| Nursery and Primary | 20 | 20 | 20 | 40 | 100 |
| Junior and Senior | 10 | 10 | 10 | 70 | 100 |

Validate every field on the client and server. Do not allow CA or examination values outside the configured maximum. Teachers must see blank score-entry fields when starting an upload, while the system must calculate totals, grades, averages, and positions after values are saved.

When a teacher saves scores, update the database immediately without an administrator approval queue. Show a loading spinner, confirmation dialog before saving, success notification, error notification, and last-updated timestamp. Scores must flow automatically into the CA Sheet, result sheet, report card, student dashboard, and relevant administrator progress views.

## CA Sheet

Keep the CA Sheet separate from the result/report-card workflow. The CA Sheet is an administrator-only workspace.

Provide:

- Session selector.
- Term selector.
- Section selector.
- Class selector.
- Live class roster.
- Student admission numbers and names.
- Blank score columns for manual completion or later upload.
- Subject and bilingual headings where required.
- Last-updated timestamp.
- Dedicated preview modal.
- A4 print output.
- PDF save workflow.
- Batch print for all subjects in the selected class.
- Pagination that includes every student without overlap or missing names.
- Navigation/sidebar/admin-menu hiding during print.

The first page may contain the school branding and headings. Continuation pages should continue the remaining student rows cleanly without forcing an unnecessary repeated logo or letterhead unless explicitly configured.

## Result sheets and report cards

Create distinct layouts for Nursery, Primary, Junior, and Senior. Nursery and Primary can share the same academic structure while retaining visibly different designs. Junior and Senior must have appropriate secondary-school layouts.

Include English and Arabic subject names, automatic totals, grades, averages, class positions, attendance totals, configured automatic comments, teacher/coordinator comment fields where required, and a manual class-teacher signature line.

Provide:

- Student result preview.
- Whole-class result preview.
- Section-specific layout selection.
- A4 result printing.
- PDF preview before printing.
- Batch export of reports for all students in a selected class.
- Loading spinner and status message while reports mount before printing.
- Page-break protection so comments, signature lines, and result content do not split incorrectly.
- Responsive preview that does not become blank on mobile or desktop PDF saving.

The deleted Result Template Studio must not be recreated unless explicitly requested again.

## Student and staff identity cards

Create a portrait-oriented student ID card, not a landscape card. The student card should include the school logo, school name, address, phone number, student portrait, student name, class, admission number, and a QR code on the reverse side.

Provide a staff ID-card option with appropriate staff fields.

Create an editable ID-card designer with:

- Separate front and back previews.
- Drag-and-drop field positioning.
- Corner resize handles for logo, photo, QR code, and text.
- Font family, font weight, alignment, and line-height controls.
- Editable text fields.
- Named design presets.
- Undo and redo history.
- Photo crop before upload.
- PDF preview and download.
- Non-blank print output.

Use the same stored student photo in the student profile, ID card, examination card, and other authorized workflows.

## Examination cards

Create a professional one-page A4 portrait examination card for secondary students. It must support JSS1–JSS3 and SSS1–SSS3 classes.

The examination card must include:

- Student name.
- Admission/candidate number.
- Passport photo.
- Class.
- Section.
- Gender.
- Academic session.
- Term.
- Examination title.
- Examination date.
- Venue.
- Subject timetable.
- English subject names.
- Arabic subject names.
- Examination rules and regulations.
- Blank manual Exam Officer signature line.

Provide an administrator workspace with session, term, class, and student selectors. Provide per-subject date and time fields in the timetable. Save the timetable and card record in the database. Allow single-student issue, class-wide issue, section-wide issue, preview, and batch print.

Show issued cards automatically on the linked student dashboard according to the current school policy. Provide Preview and Download as PDF actions. Subjects must rehydrate from the current class assignments so adding or removing a class subject is reflected in newly rendered cards.

Use fixed A4 portrait geometry, wait for logo and student-photo assets to load before printing, prevent blank PDF output, and preserve the card as a single page. Center the English and Arabic school names, use bold readable branding, enlarge the school logo appropriately, use modestly tall timetable rows, position the rules beside the timetable where possible, and leave a blank manual signature area. Do not render an uploaded exam-officer signature image.

## Attendance

Provide class-based attendance with live rosters, multi-student marking, attendance totals, attendance history, and role-aware visibility. Do not include unnecessary Present/Absent/Late fields in result layouts when the configured school result design does not require them.

## Assignments

Allow authorized teachers to create assignments with class, subject, title, instructions, due date, marks, and optional attachments. Allow students to view relevant assignments and submit work. Allow teachers to review submissions and record grades. Enforce linked-student ownership on submissions.

## Finance and accountant workspace

Create a finance module with:

- Fee structures.
- Student invoices.
- Student balances.
- Payment recording.
- Payment references.
- Proof notes.
- Bank-transfer records.
- Optional card-payment integration when valid credentials are configured.
- Payment verification and rejection.
- Receipt numbering.
- Branded receipt header and footer.
- Downloadable and printable receipts.
- Student dashboard fee display.
- Accountant dashboard focused on financial data.

Do not claim a payment succeeded unless the configured payment provider or administrator verification confirms it. If an external payment secret is not configured, show a clear setup state rather than a fake payment success.

## CBT and JAMB practice

Create a computer-based testing module. Administrators must be able to create question sets for Mathematics, Physics, Chemistry, Biology, Use of English, Literature in English, and other configured subjects.

Provide:

- AI-assisted question generation.
- Optional syllabus topics.
- Optional prescribed textbook guidance.
- Question count selection.
- A–D answer options.
- Manual question editing and review.
- Draft, Published, and Active status badges.
- Publishing controls.
- Timed examinations.
- Individual subject selection so a student may take one subject at a time.
- Score display.
- Correct-answer review.
- Explanations for missed questions.
- Past attempt history.
- Subject, class, date, session, and attempt analytics.
- Aggregate ranking by class.
- Overall winner report.
- Winner badge showing exact score and date achieved.

Use the exact scoring model of **50 marks per subject**. If five subjects are aggregated, the maximum is **250 marks**. Explain this model clearly before the student begins an examination. Do not use the old 500-mark model.

Provide a calculator for Mathematics and Chemistry examinations, but keep it simple and do not add scientific mode unless explicitly requested later.

Implement examination integrity controls with clear privacy notices and consent-aware browser permissions:

- Camera status indicator.
- Microphone status indicator.
- Connection-quality indicator.
- Fullscreen option.
- Warning banner after each monitoring violation.
- Monitoring warning log for administrators.
- Automatic termination after the configured violation threshold.
- Termination when the student minimizes or leaves the examination where browser detection supports it.
- Administrator filter for terminated examinations.
- Administrator playback modal for stored monitoring media.
- Recording-management workspace for deleting old video/audio files to save storage.

Do not pretend to record or monitor a device when permission was denied or the browser does not support the capability. Display the actual connection and permission state.

## Announcements and notifications

Provide school announcements, publishing controls, recent alerts, an in-app notification center, a bell icon, read/unread status, and filtering between read and unread notifications. Push notifications should be implemented only after the school’s notification policy is confirmed and the required permissions are obtained.

## Progressive Web App and mobile experience

Make the portal responsive for desktop, tablet, and Android screens. Provide a valid PWA manifest, mobile icons, splash-screen artwork, an install button or install guidance when supported by the browser, and clear update behavior so installed users can receive newer versions.

Ensure sidebars and overlays do not cover exam-card previews, CBT video players, audio players, or important mobile controls. Use A4 print settings for print workflows and show a reminder to select A4 rather than Letter when the device print dialog provides that choice.

## Multi-school SaaS operations

Implement school onboarding, tenant creation, tenant activation/deactivation, school-admin invitation, subscription tiers, feature entitlements, trial status, renewal status, plan limits, usage counters, school-specific subdomains or workspace identifiers, and platform-level audit logs. A school must be able to configure its branding and settings without changing application code.

Provide a Super Admin dashboard with school search, status filters, plan filters, school creation, admin assignment, tenant suspension, usage overview, and support-safe impersonation or read-only diagnostics only when explicitly authorized and audited. School administrators must never access platform-wide records or another school’s private data.

Every school-owned database table, storage object, export, notification, analytics query, print source, and background operation must carry and enforce a `schoolId` or equivalent tenant identifier. Add database indexes and unique constraints that include the school identity where appropriate. Prevent cross-tenant access at the server procedure, query-helper, file-storage, export, and UI levels.

## Data lifecycle, migration, and privacy

Every major database record must be associated with the correct school tenant, session, term, class, or linked person. Deleting a student must remove or safely detach all associated results, reports, payments, invoices, attendance, assignments, exam cards, enrollments, promotions, alumni records, CBT attempts, monitoring records, recordings, user accounts, and photo-audit metadata according to the school’s configured retention policy.

New students must propagate to all appropriate active rosters and authorized workflows. Deleted students must disappear from student directories, class rosters, result previews, CA Sheets, ID cards, examination cards, and dashboards within that school tenant.

The platform must enforce the school filter in every read, write, update, delete, export, print, notification, file-access, analytics, and subscription operation. A future school must be onboarded through tenant creation and configuration, not by copying another school’s private data.

## UX and reliability requirements

Every asynchronous operation must have a loading state. Every mutation must have success and failure handling. Use confirmation dialogs for student deletion, bulk deletion, promotion rollback, score saving where appropriate, and other irreversible actions. Show meaningful empty states when no class, subject, score, payment, exam card, or question set exists.

Prevent blank previews and PDFs by using populated renderers, stable print sources, fixed print geometry, image-load waiting, and page-break rules. Test both desktop and Android-sized layouts. Ensure tables wrap safely and names or admission numbers do not overlap or disappear.

## Verification requirements

Before release, verify:

1. The Platform Super Admin can onboard and manage schools without exposing unauthorized private records.
2. School administrators can see only their own tenant and can configure its branding independently.
3. All roles can log in and log out correctly.
4. Subject accounts can access only their assigned class-subject scopes.
3. Students can view only their own published results and authorized examination cards.
4. New students appear in active rosters, CA Sheets, results, ID cards, and examination-card workflows.
5. Deleted students disappear from all linked workflows and associated records are cleaned up safely.
6. The exact Nursery/Primary and Junior/Senior grading limits are enforced.
7. Teacher score uploads save directly and calculate correctly.
8. CA Sheets contain all selected-class students without missing names or overlap.
9. Nursery, Primary, Junior, and Senior result layouts render correctly.
10. Examination cards display live bilingual subjects, date, time, logo, photo, rules, and manual signature line on one A4 page.
11. Student and staff ID cards render with correct photos and portrait orientation.
12. Receipts show correct verification status, numbering, and branding.
13. CBT scores use 50 marks per subject and 250 marks for five subjects.
14. CBT monitoring states, warnings, termination, and recording management reflect real browser permissions and database records.
15. Notification filters, PWA installation behavior, mobile navigation, and updates work as configured.
16. The complete Vitest suite passes.
17. TypeScript validation passes.
18. The production build passes.
19. No current browser console errors or unexpected HTTP 5xx responses remain.
20. Cross-tenant isolation tests pass for every major module.
21. Subscription plan limits and feature entitlements are enforced.
22. A stable checkpoint is saved before release and after major database migrations.

Deliver a polished, secure, database-backed, multi-tenant SaaS school-management platform that preserves the reference portal’s design language and complete feature set while allowing every school to use its own name, logo, colors, data, users, academic structure, policies, and subscription features. The result must be practical for daily school operations and safe for onboarding many independent schools.

---

## End of master prompt
