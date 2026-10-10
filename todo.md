# Project TODO

- [x] Build responsive Alfurqan Science Academy Lafia dashboard shell
- [x] Add academy branding, crest, typography, and color system
- [x] Add role-aware navigation for Administrator, Principal, Teacher, Accountant, Parent, and Student
- [x] Add dashboard KPI cards, charts, recent activity, and notifications
- [x] Add student management view
- [x] Add teacher management view
- [x] Add parent management view
- [x] Add classes, subjects, sessions, and terms views
- [x] Add attendance management view
- [x] Add result entry, calculation, review, approval, lock/unlock, and publish views
- [x] Add printable report card view
- [x] Add school fees, invoices, payments, balances, receipts, and finance UI flows
- [x] Defer secure Paystack integration and server-side transaction verification until a secret is supplied, per user request
- [x] Add timetable and assignments views
- [x] Add announcements and notifications view
- [x] Add reports and Excel import/export entry points
- [x] Add users, roles, permissions, and school settings views
- [x] Add responsive sidebar, mobile navigation, search, filters, and polished interactions
- [x] Add Vitest coverage for key school management calculations and UI data helpers
- [x] Run type checks, tests, and visual verification

## Current examination-card refinement

- [x] Add configurable visual Exam Officer and Head of ICT/MIS signature uploads in School Settings
- [x] Persist uploaded examination-card signature URLs and storage keys through admin tRPC procedures
- [x] Render configured examination-card signatures in administrator and student-dashboard previews/PDFs with manual fallback
- [x] Investigate and verify the reported student portrait binding across examination-card outputs
- [x] Add regression tests and complete end-to-end verification for JSS and SSS examination cards

## Follow-up implementation gaps

- [x] Enforce server-side role permissions through shared roleProcedure guards across protected school procedures
- [x] Build dedicated Teacher, Parent, Classes/Subjects, Timetable, Assignments, and Announcements workspaces
- [x] Connect full result-management workflow to persistent database records and approval actions
- [x] Create a printable report-card layout
- [x] Connect fee invoice, payment recording, balance, and verified-payment receipt flows to persistent records with live student/payment controls
- [x] Add Excel-compatible student import and filtered student/staff workbook exports
- [x] Create users and permissions management workspace
- [x] Expand tests to cover newly added academic helper logic

- [x] Implement teacher result-entry interface with session, term, class, and subject selectors
- [x] Add editable score entry with automatic total, grade, average, and position calculations
- [x] Add save draft and submit-for-review interactions for result entry
- [x] Add tests for result-entry calculations and score updates

- [x] Add explicit continuous-assessment, examination, and total columns to the result-entry table
- [x] Track real draft and submitted-for-review state within the result-entry interface
- [x] Expand automated tests for score updates, totals, and ranking changes at the helper level

- [x] Document browser-level workflow tests for score input changes and Draft/Submitted state transitions as future QA follow-up

- [x] Add Bank Transfer and Paystack payment options to the fees workflow
- [x] Add bank-transfer proof/reference submission and verification states
- [x] Add Paystack payment status and server-verification states without exposing secrets
- [x] Test and verify every payment-option interaction available in the interface

- [x] Add bank-transfer proof details submission and verification state
- [x] Defer protected server-side Paystack transaction verification until the secret key is supplied, per user request
- [x] Add automated or browser-level tests for payment method switching and verification states

- [x] Replace toast-only navigation and action buttons with visible working client-side interactions
- [x] Make add, filter, export, report, notification, and settings controls perform observable actions
- [x] Verify primary sidebar and dashboard actions through interaction tests

- [x] Finish student and bank-transfer payment frontend wiring to persistent backend procedures; Paystack remains deferred
- [x] Add core school data tables and apply a safe database migration
- [x] Add protected server procedures for connected workflows under the current admin/user role model
- [x] Wire frontend queries and mutations with loading, success, error, and empty states across implemented workflows
- [x] Add backend tests for connected school workflows

- [x] Add backend procedure validation tests for student, result, and payment inputs
- [x] Add backend authorization tests for result and payment procedure boundaries

- [x] Wire result-entry Save draft to the backend mutation for every student score
- [x] Wire result-entry Submit for review to persist and update result status
- [x] Add persistence and authorization tests for result save/submit flows

- [x] Add router-level invalid-input tests for student and payment procedures
- [x] Add authorization tests for submit-results, payment-list, and create-payment procedures
- [x] Add backend-mocked success-path tests for result save and submit status updates

- [x] Add router-level invalid-input coverage for student creation
- [x] Add unauthenticated submit-results authorization coverage

- [x] Show automatic total, grade, and position updates while entering CA and exam scores
- [x] Add visible saved and submitted confirmation indicators for result actions
- [x] Add tests covering calculation updates and save/submit confirmation states

- [x] Add deterministic result-row and feedback-state tests for live score entry behavior

- [x] Add student database fields for full name, class, student phone, parent phone, and admission number
- [x] Add staff database fields for full name, role, phone, email, and department
- [x] Add validated backend mutations for creating students and staff records
- [x] Build functional student intake form with required fields and success/error states
- [x] Build functional staff intake form with required fields and success/error states
- [x] Add tests for student/staff validation, authorization, and persistence procedure calls

- [x] Use backend-safe admission numbers and refresh the student list after a successful save
- [x] Load staff records from the backend and refresh the staff list after a successful save
- [x] Add staff procedure success, invalid-input, and authorization tests

- [x] Invalidate or update the student query after successful student creation
- [x] Add admin-only create-staff authorization and mocked success-path coverage
- [x] Add staff query loading and error feedback to the workspace

- [x] Add mocked success-path coverage proving createStaff calls persistence and returns the staff record
- [x] Add forbidden-access coverage proving non-admin users cannot call createStaff

- [x] Add protected student and staff search/filter query support
- [x] Add protected edit and delete procedures for students and staff
- [x] Add validated CSV bulk import procedures for students and staff
- [x] Build student search, class filter, edit, delete, and CSV import controls
- [x] Build staff search, role/department filter, edit, delete, and CSV import controls
- [x] Add persistence, authorization, and bulk-import validation tests

- [x] Add search and class/role filter inputs to protected student and staff procedures
- [x] Implement matching database query filters for student and staff directories
- [x] Add invalid-input tests for bulk import, edit, and delete procedures
- [x] Expand success and authorization tests across both student and staff CRUD/import paths

- [x] Add success-path tests for updateStaff, deleteStaff, and bulkImportStudents
- [x] Add forbidden-access tests for deleteStudent, deleteStaff, and bulkImportStaff
- [x] Add authorization coverage for all remaining admin-only student and staff directory mutations

- [x] Add forbidden-access coverage proving non-admin users cannot update student records

- [x] Add server-backed pagination for student and staff lists
- [x] Add detailed student and staff profile views with related records and staff related-record payload
- [x] Add filtered CSV and PDF export for student and staff directories across all matching pages
- [x] Add alphabetically ordered student CA sheet with persisted first CA, second CA, third CA, and exam values
- [x] Add tests for pagination, profile data, exports, and CA-sheet ordering/content

- [x] Include all filtered records across pages in CSV/PDF exports
- [x] Generate a printable filtered directory document rather than printing only the current view
- [x] Add staff-related record payloads to profile responses where applicable
- [x] Store and export real first CA, second CA, third CA, and exam values in the student CA sheet
- [x] Add automated tests for export contents, CA ordering, and profile related-record payloads

- [x] Add real staff profile related details from persistent fields rather than an empty placeholder array
- [x] Verify and align first CA, second CA, and third CA schema/migration and result persistence inputs
- [x] Add tests for profile related payloads and printable export output, including the protected staff profile procedure

- [x] Add administrator-only staff account registration with name, phone, username, and password, including live users.phone persistence
- [x] Securely hash staff account passwords and prevent credential leakage in responses with live persistence verified
- [x] Add staff username/password login and session access flow with session-cookie issuance
- [x] Add tests for staff account authorization, validation, password handling, wrong-password rejection, and login

- [x] Allow administrators to assign an explicit academy role when creating staff logins
- [x] Extend server-side role guards across academic, finance, and family-facing procedures

- [x] Add administrator staff-account dashboard listing existing local staff accounts
- [x] Add administrator edit and deactivate/reactivate controls for staff accounts with live accountStatus persistence
- [x] Add role-based post-login redirection to tailored role dashboards using shared routing helpers
- [x] Add tests for account management authorization, status changes, role redirection, and inactive-login rejection

- [x] Add automated coverage for teacher, accountant, parent, and student role landing destinations in the executed router suite
- [x] Add end-to-end coverage proving deactivated staff accounts cannot log in after status mutation

- [x] Build a modern, school-appropriate public landing page using the academy logo
- [x] Add a prominent top-navigation portal login entry
- [x] Unify staff, accountant, parent, and student login access through one portal
- [x] Add responsive landing-page and portal-login validation coverage

- [x] Keep accountant dashboard enhancements paused, per user request
- [x] Add tailored parent dashboard with child, results, attendance, and fee content from linked student records
- [x] Add tailored student dashboard with results, timetable, assignments, and announcements from linked student records
- [x] Add database-backed public gallery records and secure image upload workflow with administrator upload panel
- [x] Add latest news and announcements records and landing-page display with administrator publishing panel
- [x] Add automated coverage for role dashboards, gallery, and news workflows, including live procedure contracts

- [x] Add optional linked student relationship to parent and student accounts
- [x] Add administrator linked-student selector to staff-account editing
- [x] Populate parent and student dashboards from the linked student record
- [x] Add protected linked-record queries and relationship tests, including protected profile and public content procedure coverage

- [x] Diagnose the non-working public landing page from browser, network, and server evidence
- [x] Fix public landing-page rendering without breaking portal login or authenticated dashboard access
- [x] Verify the landing page and portal entry on desktop and mobile layouts

- [x] Refine the unified portal login modal styling and usability
- [x] Add clearly labeled starter academy news announcements
- [x] Add starter school-facility and event gallery imagery
- [x] Verify admin, accountant, teacher/staff, parent, and student login redirection
- [x] Verify session persistence and logout behavior for every role

- [x] Hide all cross-role navigation and workspace switching for logged-in users
- [x] Give each role an isolated dashboard shell with only its permitted navigation
- [x] Preserve explicit logout access for every role
- [x] Add tests proving role isolation, denied cross-role procedures, login landing, and logout behavior

- [x] Add teacher-only assignment creation with title, class, subject, instructions, due date, and marks
- [x] Add secure assignment attachment upload through project storage
- [x] Add teacher submission review and direct grading workflow
- [x] Add role profile settings for personal information updates
- [x] Add secure password-change flow for every role
- [x] Add tests for assignment authorization, uploads, grading, profile updates, and password changes
- [x] Add learner/parent assignment workspace with live assignment loading and linked-student submission enforcement
- [x] Defer server-side Paystack verification until the secret key is supplied, per user request
- [x] Load persisted result rows and lifecycle status into the result review workspace when records exist
- [x] Prevent lifecycle UI status changes when the database reports zero eligible rows
- [x] Reflect submitted, approved, locked, published, and unlock transitions from backend responses
- [x] Add accountant/admin bank-transfer verification mutation with verifiedBy persistence and family-role denial
- [x] Add invoice persistence and verified-payment receipt issuance UI; dedicated receipt table intentionally deferred by documented design
- [x] Add persistent invoices table and link payments to invoices
- [x] Add role-scoped invoice listing and finance invoice creation form
- [x] Add invoice workflow authorization tests
- [x] Surface persistent invoice counts and due/paid status in parent and student dashboards
- [x] Make the accountant receipt action generate a printable receipt for verified payments only
- [x] Replace overview student, staff, and verified-fee totals with live database metrics
- [x] Replace static attendance chart and activity feed with persistent records
- [x] Add persistent attendance register schema and live attendance query/recording procedures
- [x] Replace attendance placeholder totals with live register counts and empty states
- [x] Add a class roster attendance-entry form for recording multiple students in one action
- [x] Apply a consistent modern SaaS/EdTech visual system across the entire website: purple-indigo gradients, glassmorphism, rounded soft-UI cards, geometric backgrounds, responsive mobile-first layouts, micro-interactions, emoji accents, and professional authentication styling
- [x] Preserve accountant-dashboard scope as paused while applying only shared visual primitives where they do not change its feature behavior
- [x] Add a class selector to the attendance workspace and load only students from the selected class
- [x] Replace the global first-50 student slice with a proper class-scoped roster query and preserve multi-student save in one action
- [x] Add focused tests for attendance roster filtering and multi-student attendance recording behavior
- [x] Recreate the supplied mobile Alfurqan Portal login composition: centered crest and wordmark, ivory/lavender geometric background, rounded glass login card, role tabs, username/password fields, remember-me and SSO actions
- [x] Preserve the existing secure administrator local-login flow and validate it with user-provided credentials later
- [x] Validate the administrator local-login flow with the supplied credentials once the deployed domain serves the portal instead of returning HTTP 500
- [x] Investigate the deployed domain HTTP 500 separately from the locally verified production bundle
- [x] Create the supplied local administrator account `Alfurqan` with a securely hashed password and active status
- [x] Verify the new administrator account can sign in, land in the administrator dashboard, and sign out successfully
- [x] Verify the new local administrator account in the preview: successful sign-in, administrator-only workspace landing, and sign-out return to the public portal
- [x] Diagnose and resolve the deployed domain HTTP 500 response without disturbing the healthy preview
- [x] Verify the supplied administrator account on the deployed public domain after the 500 is resolved
- [x] Add a smooth animated loading indicator to the portal login button during authentication, with disabled repeat submission and accessible busy status
- [x] Add an eye-icon password visibility toggle to the portal login form
- [x] Persist the Remember me choice in the login form and keep the corresponding server session lifetime behavior
- [x] Show a brief successful-login toast before redirecting to the administrator dashboard
- [x] Add a forgot-password request modal with username/email input, clear next-step messaging, and safe non-disclosing response behavior
- [x] Add inline login validation with red field states and specific username, password, and credential error messages
- [x] Add regression coverage for reset-request UI and login validation feedback
- [x] Make the Add student action visible in the mobile Students directory header and keep it connected to the database-backed intake form
- [x] Validate the mobile student-add entry flow with responsive UI checks and tests
- [x] Add administrator CSV bulk import in the Student directory with validation, success/error feedback, and database persistence
- [x] Keep Student directory search and class filtering connected to backend queries and responsive on mobile
- [x] Add student profile-picture upload to the add-student form using project storage and persist its URL/key safely
- [x] Add regression coverage for CSV import, filtering, and profile-picture upload contracts
- [x] Add a detailed student profile modal with saved profile picture, full student information, and related academic, payment, and attendance records
- [x] Add sortable Student directory columns with visible sort direction and stable row ordering
- [x] Preserve and improve Student directory pagination while sorting filtered backend results
- [x] Add regression coverage for student profile modal data and sortable paginated directory behavior
- [x] Verify the supplied administrator account can sign out successfully on the deployed public domain and returns to the public portal
- [x] Add/record a focused deployed-domain administrator login and logout smoke-test result after live authentication succeeds
- [x] Populate StudentDashboard with visible live timetable state and announcement sections, not just shortcut toasts
- [x] Surface linked assignment data alongside student results, attendance, and fees with loading and empty states
- [x] Add regression coverage proving student dashboard source contains linked results, timetable, assignments, announcements, and graceful states
- [x] Add linked-family authorization checks for arbitrary profile IDs, unlinked invoices/attendance, and cross-class assignment submissions
- [x] Deferred by user: implement protected server-side Paystack verification only after a Paystack secret is supplied
- [x] Deferred by user: resume accountant dashboard enhancements, including additional finance actions and live summaries
- [x] Add Excel workbook exports for filtered student and staff directories while retaining CSV and print exports
- [x] Document and test the intentional verified-payment-as-receipt persistence design
- [x] Surface explicit outstanding fee balances using invoice totals minus verified payments
- [x] Add explicit loading, error, empty, and linked-state messaging to family-facing queries where applicable
- [x] Add explicit payment UI contract tests for Bank Transfer/Paystack switching and verified/rejected backend states
- [x] Extend student bulk import to accept `.xlsx` workbooks through the same validated database mutation as CSV imports
- [x] Add persistent class records with administrator-only create, edit, delete, and list procedures
- [x] Add class-management UI with functional create, edit, delete, validation, loading, error, and empty states
- [x] Require selecting an existing class when adding an individual student
- [x] Require selecting an existing class before bulk student import and apply it to imported records
- [x] Add automated coverage for class CRUD authorization and student class-selection workflows
- [x] Add persistent subject records assigned to specific academy classes
- [x] Add administrator-only subject create, edit, and delete procedures with validation
- [x] Add per-class subject management UI inside the Classes & subjects workspace
- [x] Add automated coverage for subject assignment CRUD, authorization, and class isolation
- [x] Add persistent teacher assignment, ordering, and compulsory/elective metadata to class subjects
- [x] Add administrator-only procedures to assign and remove teachers from class subjects
- [x] Add per-class subject controls for teacher assignment, ordering, and compulsory/elective status
- [x] Populate result-entry subject selectors from the selected class’s active subjects
- [x] Add automated coverage for teacher-subject assignment, subject metadata, ordering, and dynamic result selectors
- [x] Add a database-backed teacher workload query listing each teacher’s assigned classes and subjects
- [x] Restrict teacher result save and submit procedures to assigned class subjects while preserving admin/principal access
- [x] Add a teacher workload view showing assigned classes, subjects, types, and ordering
- [x] Add class-selectable CA-sheet preview with alphabetical students, serial numbers, first/second/third CA, exam, and print/PDF action
- [x] Add automated coverage for teacher workload visibility, teacher result authorization, and class CA-sheet preview/export
- [x] Test saving sample CA and exam scores for Sulaiman Ayuba in NURSERY 1A and verify the updated printable CA Sheet
- [x] Replace the Results workspace placeholder roster with live database students for the selected class so imported students can receive scores
- [x] Re-test Sulaiman Ayuba score entry and CA Sheet updates after the live roster fix
- [x] Rebuild the printable CA Sheet to match the supplied Al-Furqan reference layout, including header, teacher/session fields, score table, summary, remarks, and signatures
- [x] Ensure every database student in the selected class automatically appears in the CA Sheet and teacher result roster
- [x] Add section-aware score rules: Nursery/Primary CA1-CA3 max 20 and Exam max 40; Junior/Senior CA1-CA3 max 10 and Exam max 70
- [x] Enforce score limits in both result-entry UI and server-side save/submit validation with clear feedback
- [x] Add regression coverage for roster reflection, section score limits, and reference-style printable CA Sheet output
- [x] Make the CA Sheet template uniform across all classes while loading each selected class’s database-backed student roster
- [x] Restore a visible Add subject control inside Class & Subjects and verify subject persistence per class
- [x] Make the academy logo and full header render in browser print/PDF preview reliably
- [x] Remove class performance and class teacher remark sections from the blank printable CA Sheet
- [x] Keep printable CA Sheet score cells blank while automatically filling class, subject, session, term, and student names
- [x] Add bulk export/print for all subject CA Sheets in a selected class
- [x] Add regression coverage for uniform class rosters, subject creation, logo-safe print output, blank score cells, and bulk subject export
- [x] Fix academy logo rendering in browser print/PDF preview, including a reliable print-safe fallback
- [x] Compact the CA Sheet A4 print layout to target approximately 30 student rows per page while preserving readability
- [x] Add regression coverage for print logo presence, compact row sizing, and A4 print rules
- [x] Replace the CA Sheet crest and watermark with the supplied Al-Furqan Science Academy logo
- [x] Embed the supplied logo directly into the printable source so browser Save as PDF does not lose it
- [x] Verify logo fallback, watermark print styling, A4 layout rules, TypeScript checks, and the current regression suite
- [x] Restore the missing Add student action and any displaced student-directory options after the CA Sheet/logo update
- [x] Verify student creation, search/filter, import, edit/delete, pagination, profile, and export controls remain accessible
- [x] Add regression coverage for the restored student-directory controls
- [x] Add administrator bulk student selection and confirmed multi-record deletion with database persistence
- [x] Verify a newly added student appears immediately in the selected class CA Sheet and teacher result-entry roster
- [x] Ensure teacher score-upload workbooks contain blank score cells while result calculations still work after scores are entered
- [x] Restore and verify a visible database-backed Add subject action in the Classes & subjects workspace
- [x] Add regression coverage for bulk deletion, live roster propagation, blank score workbook, and subject addition
- [x] Make Add subject match Add class with a simple subject-name form, database save, success confirmation, and refresh
- [x] Add administrator session creation and management with database persistence
- [x] Add administrator term creation and management with database persistence
- [x] Connect database sessions and terms to result-entry selectors and preserve current selection behavior
- [x] Add regression coverage for subject creation and session/term management workflows
- [x] Bind the printable CA Sheet header’s academic session and term fields to the selected database-backed values
- [x] Add regression coverage confirming selected session and term appear in the CA Sheet header
- [x] Fix or clarify the mobile bulk student upload flow so the CSV file picker opens reliably after class selection
- [x] Verify CSV header validation, import success/error feedback, and database persistence for bulk student uploads
- [x] Verify the student directory, CA Sheet roster, and teacher result roster refresh after a successful bulk import
- [x] Add regression coverage for the mobile bulk-upload interaction and post-import refresh behavior
- [x] Add a downloadable student CSV template beside the bulk-import controls with supported headers and an example format
- [x] Add regression coverage for the CSV template download content and button visibility
- [x] Replace the existing subject-assignment style with a guided teacher, session, class, and subject form
- [x] Persist guided subject assignments with administrator-only access and success/error feedback
- [x] Generate unique admission numbers automatically for new students and bulk imports
- [x] Update the CSV template and parser so admission number is system-generated rather than required
- [x] Add regression coverage for guided assignment and automatic admission-number behavior
- [x] Fix the downloadable student CSV template so row separators are real line breaks rather than literal \n text
- [x] Verify the corrected template opens with separate headers and example-row columns in mobile spreadsheet apps
- [x] Add regression coverage for clean CSV row formatting
- [x] Show a visible progress indicator while bulk student import is reading and saving records
- [x] Show a clear success message with the imported record count after persistence completes
- [x] Keep bulk-upload controls disabled and prevent duplicate submissions while import is running
- [x] Add regression coverage for import progress, success feedback, and pending-state controls
- [x] Add a dedicated Nursery Termly Report workspace separate from the existing blank CA Sheet
- [x] Model the Nursery report layout with academy header/logo, pupil details, subject scores, totals, average, and position
- [x] Add Nursery behavioral objectives, grading key, comments, coordinator, and signature sections
- [x] Connect the Nursery report to live student, class, session, term, and result data
- [x] Add print/PDF preview and regression coverage for the Nursery report sheet

- [x] Create dedicated Nursery Termly Report workspace matching the supplied Nursery template
- [x] Bind Nursery report selectors, pupil details, subjects, and result values to live database data
- [x] Add behavioral objectives, grading key, comments, signatures, and print/PDF-safe academy branding
- [x] Verify Nursery report rendering, responsive behavior, and regression coverage

- [x] Add database-backed teacher and coordinator comments for Nursery reports
- [x] Add database-backed attendance totals and class position calculation for Nursery reports
- [x] Add batch print for every pupil in a selected Nursery class
- [x] Ensure teacher-uploaded/imported scores persist and immediately display in result entry and reports
- [x] Add tests and verify the new report/result workflows before publishing

- [x] Restore a clearly separate CA Sheet navigation entry and workspace beside Results and Nursery Termly Reports
- [x] Keep CA Sheet printing independent from Nursery Termly Report printing
- [x] Render saved scores for every subject row in each Nursery report
- [x] Add regression tests for CA Sheet visibility and full Nursery subject score rendering

- [x] Store and display English and Arabic subject names for every class subject across database, results, teacher dashboard, and reports
- [x] Remove Present, Absent, and Late fields from Nursery termly report output
- [x] Generate and persist automatic position-based comments for every pupil in the selected class
- [x] Add dedicated CA Sheet preview modal before browser printing
- [x] Add whole-class Nursery result preview modal before browser printing
- [x] Add regression coverage for bilingual subjects, automatic comments, removed attendance fields, and both preview flows

- [x] Verify English and Arabic subject labels in the teacher dashboard and Nursery result sheet
- [x] Verify automatic Nursery class positioning and generated teacher/coordinator comments for the full class
- [x] Test CA Sheet batch print preview and PDF generation
- [x] Test whole-class Nursery result batch preview and PDF generation
- [x] Record verification findings and fix any discovered issues

- [x] Hide CA Sheet and Nursery report preview toolbars until the corresponding preview mode is explicitly opened

- [x] Provide a clear Add subject form with English and Arabic names and a direct save action
- [x] Diagnose and fix the “Could not save the scores. Sign in and try again later.” score-save failure
- [x] Verify subject persistence and score-upload persistence with role-protected tests

- [x] Populate existing Nursery subject records with corresponding Arabic names
- [x] Show a successful subject-added notification and clear all Add subject inputs after save
- [x] Verify Arabic subject propagation and successful form reset with regression tests

- [x] Replace the confusing per-class subject controls with a dedicated session/term-style Add subject form
- [x] Let the administrator select a class and enter only English and Arabic subject names before adding
- [x] Preserve automatic database persistence and propagation to Results, teacher dashboard, reports, and CA Sheet
- [x] Verify the simplified form with success feedback, reset behavior, and regression tests

- [x] Remove class selection from the Add subject form
- [x] Add a global administrator Subject List with English and Arabic names
- [x] Add edit and archive actions for existing catalog subjects
- [x] Keep teacher assignment as teacher → class → subject using the global catalog
- [x] Preserve database propagation to class assignments, Results, teacher dashboard, reports, and CA Sheet
- [x] Add migration, tests, and verification for the subject catalog workflow

- [x] Remove CA Sheet navigation and viewing access from Teacher dashboards
- [x] Enforce administrator-only CA Sheet rendering and access guards
- [x] Add regression coverage for administrator-only CA Sheet visibility

- [x] Remove teacher score submission approval and pending-result workflow
- [x] Make teacher Save/upload persist scores immediately to the database
- [x] Refresh CA Sheet and Nursery result templates automatically after score saves
- [x] Update status messaging, role controls, and regression tests for immediate publishing

- [x] Add a visual loading spinner and success notification while teachers save scores
- [x] Add a teacher confirmation dialog warning about incomplete data before saving
- [x] Display the last-updated timestamp on administrator CA Sheets
- [x] Paginate CA Sheets to a maximum of 30 students per A4 page
- [x] Verify the new save and print behavior with regression tests and visual checks

- [x] Fit up to 33 CA Sheet student rows on the first A4 page
- [x] Continue students after row 33 on subsequent A4 pages without losing numbering or roster entries
- [x] Verify CA Sheet preview and PDF print behavior for exactly 33 and overflow rosters

## Final refinement

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the completed refinement checkpoint

# End of project TODO

# Project TODO

- [x] Hide sidebar, navigation, admin menus, and non-report UI from every print output
- [x] Add administrator-only View student workflow with Session → Section → Class filters
- [x] Add database-backed principal and teacher signature upload records using project storage
- [x] Render uploaded principal and teacher signatures in final-page printed reports
- [x] Add regression tests for signature procedures, role isolation, student filtering, and print contracts
- [x] Run type-check, full Vitest suite, and desktop/mobile visual verification

## PDF defect verification

- [x] Reproduce blank mobile Save as PDF output from the CA Sheet preview
- [x] Fix CA Sheet print/PDF rendering for mobile and desktop browser print flows
- [x] Add regression coverage for non-empty print output and selected class/subject metadata
- [x] Rerun the complete automated test suite and targeted workflow checks across implemented modules
- [x] Save and publish the verified PDF fix checkpoint

## Signature removal and A4 PDF verification

- [x] Remove principal and staff signature settings, uploads, report blocks, and related backend exposure
- [x] Configure the browser print workflow with A4 as the default paper size
- [x] Add regression coverage confirming signatures are absent and A4 print settings remain present
- [x] Test populated-class Save as PDF on desktop browser and Android-sized mobile browser path
- [x] Rerun the complete automated suite and targeted workflow checks
- [x] Save and publish the verified signature-removal checkpoint

## CA Sheet print spacing

- [x] Diagnose the large blank lower-page space in mobile/browser PDF preview
- [x] Adjust CA Sheet print dimensions or pagination to use A4 space efficiently
- [x] Preserve correct 33-row and overflow page-break behavior
- [x] Add regression coverage for page spacing and populated report output
- [x] Rerun tests and verify desktop/mobile print previews
- [x] Save and publish the verified spacing fix

## AI subject translation

- [x] Add administrator-only server-side English-to-Arabic subject translation using the built-in LLM
- [x] Add editable Translate with AI action to the global subject form
- [x] Preserve manual Arabic editing and bilingual persistence in the database
- [x] Add loading, validation, error, and malformed-response handling
- [x] Add regression tests for authorization, translation response handling, and form wiring
- [x] Run TypeScript, full Vitest suite, and visual verification
- [x] Save and publish the AI translation checkpoint

## Subject translation enhancements

- [x] Add batch translation for all active subjects missing Arabic names
- [x] Add confidence and review metadata to AI translation responses
- [x] Add school-specific terminology overrides for Qur’an, Islamic Studies, and local curriculum subjects
- [x] Keep every translated Arabic value editable before persistence
- [x] Add regression tests for batch authorization, overrides, confidence, and persistence
- [x] Run TypeScript, full Vitest suite, and visual verification
- [x] Save and publish the subject-enhancement checkpoint

## Translation response error

- [x] Reproduce and diagnose the invalid Arabic translation response shown in the subject form
- [x] Make the built-in LLM response parser accept the supported content shapes
- [x] Preserve clear validation for malformed or non-Arabic responses
- [x] Verify single translation, Qur’an terminology override, and missing-name batch workflows
- [x] Add regression coverage and rerun TypeScript plus the full Vitest suite
- [x] Save and publish the verified translation-response fix

## Primary report layout

- [x] Keep Primary result calculations and data structure equivalent to Nursery
- [x] Add a distinct Primary printable report design and styling
- [x] Route Primary classes to the Primary layout while keeping Nursery layout unchanged
- [x] Preserve bilingual subjects, grades, positions, and automatic comments
- [x] Add regression coverage for Nursery/Primary layout separation and shared data rules
- [x] Run TypeScript, full Vitest suite, and visual verification
- [x] Save and publish the Primary report-layout checkpoint

## Report preview toggle and blank-output fix
- [x] Diagnose the blank Report Cards preview/PDF flow on mobile and desktop
- [x] Add a quick layout toggle for Primary, Junior, and Senior report previews
- [x] Keep Nursery and Primary on early-section score rules; use 10/10/10/70 for Junior and Senior
- [x] Ensure the selected section/class/pupil produces a visible non-empty report preview
- [x] Add regression coverage for toggle wiring and non-blank preview source rendering
- [x] Run TypeScript, full Vitest suite, and desktop/mobile visual verification
- [x] Save and publish the verified report-preview update

## Cross-section result leakage fix
- [x] Trace why Nursery result scores are visible in Primary, Junior, and Senior reports
- [x] Enforce section and class isolation for report and result data queries
- [x] Ensure switching layouts clears stale students, subjects, and result rows
- [x] Add regression coverage proving scores remain inside their own section/class
- [x] Run TypeScript, full Vitest suite, and four-section verification
- [x] Save and publish the verified section-isolation fix

## Supplied Primary, Junior, and Senior report templates
- [x] Add separate Primary, Junior, and Senior report template themes based on the available references
- [x] Preserve the bilingual subject table, watermark, behavioral objectives, grading system, and automatic comments
- [x] Keep Junior and Senior score headings at 10/10/10/70 and Primary at 20/20/20/40
- [x] Add regression coverage for the three remaining template themes
- [x] Run TypeScript, full Vitest suite, and responsive report verification
- [x] Save and publish the supplied-template implementation

## Report Cards section filter, sample data, and batch PDF export
- [x] Add a clear Nursery, Primary, Junior, and Senior drop-down layout filter in Report Cards
- [x] Create sample Primary, Junior, and Senior classes and dummy students for isolated testing
- [x] Add a class-scoped batch export action that downloads all selected-class reports as one PDF
- [x] Verify section/class/student display and batch export workflow on desktop and mobile
- [x] Add regression coverage for filter state, sample data, and batch export behavior
- [x] Run TypeScript and the complete test suite
- [x] Save and publish the verified Report Cards update

## Demo cleanup after email deferral
- [x] Keep direct parent email delivery deferred until an email provider is configured
- [x] Remove the Create sample classes action and demo-data procedure
- [x] Remove only PRIMARY 4A DEMO, JSS 1A DEMO, and SSS 1A DEMO records and their demo pupils/subjects
- [x] Add regression coverage proving live records are not targeted by demo cleanup
- [x] Run TypeScript, full Vitest suite, and Report Cards verification
- [x] Save and publish the demo cleanup update

## Remove parent-email report feature
- [x] Remove any parent-email report UI, backend hooks, and configuration references
- [x] Preserve Report Cards preview, section filtering, and class batch PDF export
- [x] Add regression coverage proving email controls are absent and PDF controls remain
- [x] Run TypeScript and the complete test suite
- [x] Save and publish the email-feature removal update

## Fix blank Junior and Senior Results layouts
- [x] Diagnose why Junior and Senior Results render blank
- [x] Make Junior and Senior class matching recognize live JSS/SSS section names
- [x] Ensure result rows and score-entry subjects render for selected Junior/Senior classes
- [x] Add regression coverage for visible Junior/Senior Results layouts
- [x] Run TypeScript, full Vitest suite, and desktop/mobile verification
- [x] Save and publish the corrected Results layout update

## Add live JSS and SSS classes
- [x] Add JSS 1A, JSS 1B, JSS 2A, JSS 2B, JSS 3A, and JSS 3B
- [x] Add SSS 1A, SSS 1B, SSS 2A, SSS 2B, SSS 3A, and SSS 3B
- [x] Avoid duplicate class records and keep all new classes active
- [x] Verify the classes appear in portal selectors and Results section filters
- [x] Save and publish the class additions

## Fix missing classes across portal selectors
- [x] Audit database class records and all class-dependent portal selectors
- [x] Use one shared section mapping for Nursery, Primary, Junior/JSS, and Senior/SSS
- [x] Replace hardcoded Attendance class options with live database classes
- [x] Fix Report Cards class matching for JSS and SSS sections
- [x] Add regression coverage for shared selector visibility
- [x] Run TypeScript, full Vitest suite, and desktop/mobile verification
- [x] Save and publish the shared selector fix

## Verify live class selectors and JSS/SSS readiness
- [x] Refresh the portal and inspect the portal workspace state (public landing verified; authenticated click-through requires an admin session)
- [x] Verify JSS and SSS classes appear in Results selectors (database and section-mapping verification complete)
- [x] Verify JSS and SSS classes appear in Report Cards selectors (database and section-mapping verification complete)
- [x] Verify assigned subjects are available for score entry (none are assigned yet, so score entry is correctly gated)
- [x] Record any classes that still need subject assignments (all 12 JSS/SSS classes need subjects)

## Primary 1 bilingual subject setup
- [x] Extract the Primary 1 English and Arabic subject names from the supplied report sample
- [x] Reuse or create the normalized global subject records with Arabic names
- [x] Assign the extracted subjects only to Primary 1A and Primary 1B
- [x] Leave Nursery, other Primary classes, JSS, and SSS assignments unchanged
- [x] Verify the subjects in database, Results, CA Sheet, and Report Cards selectors
- [x] Save and publish the Primary 1 subject setup

## Primary 2, 3, and 5 bilingual subject setup
- [x] Extract the Primary 2/3/5 English and Arabic subject names from the supplied sample
- [x] Confirm PRIMARY 2A/2B, 3A/3B, and 5A/5B exist and exclude all Primary 4 classes
- [x] Reuse or create the normalized global subject records
- [x] Assign the extracted subjects only to Primary 2/3/5 A/B classes
- [x] Verify Primary 4 and all non-target classes remain unchanged
- [x] Save and publish the Primary 2/3/5 subject setup

## Primary 4A and 4B bilingual subject setup
- [x] Extract the Primary 4 English and Arabic subject names from the supplied report sample
- [x] Reuse or create the normalized global subject records, including Basic Digital Literacy
- [x] Assign the extracted subjects only to PRIMARY 4A and PRIMARY 4B
- [x] Leave Primary 1, 2, 3, 5, Nursery, JSS, and SSS assignments unchanged
- [x] Verify the bilingual subjects and ordering in the database and portal workflows
- [x] Save and publish the Primary 4 subject setup

## JSS 1A and 1B bilingual subject setup
- [x] Extract the JSS English and Arabic subject names from the supplied report sample
- [x] Reuse or create the normalized global subject records
- [x] Assign the extracted subjects only to JSS 1A and JSS 1B
- [x] Leave JSS 2/3, SSS, Nursery, and Primary assignments unchanged
- [x] Verify the bilingual subjects and 10/10/10/70 score setup in portal workflows
- [x] Save and publish the JSS 1 subject setup

## JSS 2A/2B and JSS 3A/3B bilingual subject setup
- [x] Extract the JSS 2/3 English and Arabic subject names from the supplied report sample
- [x] Reuse or create the normalized global subject records
- [x] Assign the extracted subjects only to JSS 2A, 2B, 3A, and 3B
- [x] Leave JSS 1, SSS, Nursery, and Primary assignments unchanged
- [x] Verify the bilingual subjects and 10/10/10/70 score setup in portal workflows
- [x] Save and publish the JSS 2/3 subject setup

## SSS 1A and 1B bilingual subject setup
- [x] Extract the SSS English and Arabic subject names from the supplied report sample
- [x] Reuse or create the normalized global subject records
- [x] Assign the extracted subjects only to SSS 1A and SSS 1B
- [x] Leave SSS 2/3, JSS, Nursery, and Primary assignments unchanged
- [x] Verify the bilingual subjects and 10/10/10/70 score setup in portal workflows
- [x] Save and publish the SSS 1 subject setup

## SSS 2A/2B and SSS 3A/3B bilingual subject setup
- [x] Extract the SSS 2/3 English and Arabic subject names from the supplied report sample
- [x] Reuse or create the normalized global subject records
- [x] Assign the extracted subjects only to SSS 2A, 2B, 3A, and 3B
- [x] Leave SSS 1, JSS, Nursery, and Primary assignments unchanged
- [x] Verify the bilingual subjects and 10/10/10/70 score setup in portal workflows
- [x] Save and publish the SSS 2/3 subject setup

## Standardize student admission numbers
- [x] Audit current admission-number values and student record count
- [x] Use the format 2026/AFSAL/ followed by a unique random numeric suffix
- [x] Update existing student records without changing names, classes, scores, or parent details
- [x] Ensure newly added students receive the same format automatically
- [x] Verify uniqueness and display in student lists, profiles, CA Sheet, and reports
- [x] Save and publish the admission-number update

## Fix SectionTermlyReportView React key warning
- [x] Trace every mapped child rendered by SectionTermlyReportView
- [x] Add stable unique keys to the affected report list elements
- [x] Add regression coverage for keyed report rows and cells
- [x] Run TypeScript, full Vitest suite, and browser console verification
- [x] Save and publish the React key-warning fix


## Section-coded student identities and login accounts
- [x] Define section prefixes: NUR, PRI, JSS, and SSS under the 2026/Afsal/ admission-number format
- [x] Migrate existing student admission numbers to section-coded unique values without changing academic records
- [x] Make future student creation generate section-coded admission numbers automatically
- [x] Provision or synchronize each student login username to the student admission number
- [x] Set the initial student password to 12345 with a first-login password-change workflow
- [x] Add student self-service password change with current-password verification
- [x] Add regression coverage for section prefixes, account provisioning, login, and password changes
- [x] Verify all workflows on desktop and mobile and publish the completed feature


## Administrator student credential export
- [x] Add an administrator-only CSV export containing live student admission numbers and initial passwords
- [x] Include student name, class, admission number, login username, and initial password with safe CSV escaping
- [x] Show loading/success feedback and a clear credential-handling warning
- [x] Add regression coverage for export fields, initial password, and admin-only visibility
- [x] Verify the export workflow on desktop and mobile and publish the feature


## Student security, numbering, and result isolation
- [x] Add a first-login password-change flag for student portal accounts
- [x] Force students with the default password to change it before accessing their dashboard
- [x] Add an administrator-only reset-to-default-password action in the student profile view
- [x] Convert admission numbers to uppercase `2026/AFSAL/SECTION/001` format with sequential numbering per class
- [x] Ensure future students receive the next three-digit class sequence and matching uppercase username
- [x] Restrict student result queries and dashboard display to the authenticated linked student only
- [x] Add regression coverage for password enforcement, reset, numbering, and result isolation
- [x] Verify desktop/mobile workflows and publish the completed release


## Student Results navigation fix
- [x] Add a visible Results item to the student sidebar
- [x] Add a dedicated student Results workspace using only the authenticated linked student profile
- [x] Preserve first-login password enforcement and role isolation while adding the Results view
- [x] Add regression coverage and verify the student Results workflow on mobile and desktop
- [x] Save and publish the student Results navigation fix


## Primary and Junior result verification
- [x] Verify Primary and Junior result layout routing and visibility
- [x] Verify live bilingual subject assignments for Primary and Junior classes
- [x] Fix any missing subject or layout reflection without changing score rules
- [x] Add regression coverage and verify selectors and responsive result workflows
- [x] Save and publish the verified result-layout and subject-reflection fix


## Subject upload and result layout verification
- [x] Audit subject upload/assignment reflection and result layout code paths
- [x] Verify live bilingual subjects for Primary, Junior, and Senior classes
- [x] Verify Primary, Junior, and Senior layout templates and score rules
- [x] Run regression and responsive workflow verification
- [x] Report any required fixes and verification results


## Subject-specific portal accounts
- [x] Define one account per unique live subject with a stable username and generated password
- [x] Add database linkage for subject accounts and preserve secure password hashes
- [x] Restrict subject accounts to result entry for their assigned subject and permitted classes
- [x] Add administrator-only subject-account creation/synchronization action
- [x] Add CSV/Excel credential export and printable subject-account credential sheet
- [x] Add regression coverage for provisioning, login, subject boundaries, and exports
- [x] Verify the complete workflow on desktop and mobile and publish the feature
- [x] Synchronize one local subject portal account for every active subject with stable credentials
- [x] Enforce subject-account-only score entry for the linked subject across permitted classes
- [x] Add administrator subject-account workspace with sync, credential table, CSV/Excel export, and printable credential sheet
- [x] Add regression tests for subject provisioning, subject-scoped login boundaries, and export fields
- [x] Verify subject login, score entry, export downloads, TypeScript, Vitest, and responsive UI

## Subject account class restrictions and recovery
- [x] Add persistent subject-account-to-class assignments with unique links
- [x] Restrict subject account workload, class selectors, and score mutations to assigned classes
- [x] Add administrator controls to assign and remove classes from each subject account
- [x] Add administrator reset-to-default-password action for subject accounts
- [x] Add regression tests for class boundaries, assignment mutations, and credential reset
- [x] Verify the updated admin workspace and restricted subject login flow

## Teacher workload visibility and live class synchronization
- [x] Synchronize each subject account to every active class where its subject is assigned
- [x] Make the synchronization safe to repeat without duplicate class links
- [x] Display linked subject, assigned classes, and pending result submissions in the teacher dashboard
- [x] Restrict teacher selectors and result actions to synchronized assigned classes
- [x] Add regression coverage for synchronization and teacher dashboard data
- [x] Verify live assigned-class display and pending-result workflow on desktop and mobile

## Nursery subject catalog and credential refinement
- [x] Add the ten Nursery bilingual subjects from the supplied Nursery template
- [x] Assign the Nursery subjects to the live Nursery classes using the Nursery 20/20/20/40 scoring structure
- [x] Reflect Nursery English and Arabic subject names in teacher result entry and Nursery result layouts
- [x] Replace long subject-account usernames with compact stable subject-based usernames
- [x] Generate random stable initial passwords for subject accounts and preserve them for export/reset
- [x] Verify Nursery class subjects, teacher dashboard reflection, result layout, and credential exports

## Teacher subject-account linkage issue
- [x] Diagnose why the reported teacher login shows Not linked and zero assigned classes
- [x] Ensure subject-account login resolves to its linked subject and saved Nursery class permissions
- [x] Verify the teacher dashboard displays assigned classes and subject-scoped result entry
- [x] Add regression coverage for subject-account login linkage and workload resolution

## All-sections subject credential register
- [x] Ensure one active subject account exists for every active subject across Nursery, Primary, Junior, and Senior
- [x] Derive each subject account’s section coverage from its active class-subject assignments
- [x] Add section filtering for subject credential records in the administrator workspace
- [x] Add section-filtered CSV and Excel credential exports
- [x] Add section-filtered printable credential sheets showing English/Arabic subject, username, password, section, and classes
- [x] Add regression tests and verify all four section credential workflows

## Term dates and result-sheet display
- [x] Add term ending date and next-term beginning date fields to the academic-term schema
- [x] Apply the safe database migration for the new term date fields
- [x] Add validated administrator procedures to create and update term dates
- [x] Add editable term date controls to School settings
- [x] Display saved term ending and next-term beginning dates on result sheets
- [x] Add regression tests and verify the complete term-date workflow

## Student promotion and class migration
- [x] Add persistent student promotion history with source class, target class, actor, and timestamp
- [x] Add an administrator-only transactional batch promotion operation
- [x] Preserve admission numbers, login usernames, credentials, and historical results during promotion
- [x] Add source-class and target-class selection with preview and student selection
- [x] Add confirmation, success/error feedback, and promotion-history visibility
- [x] Add regression tests for same-section and cross-section migrations, authorization, and identity preservation
- [x] Verify Nursery, Primary, JSS, and SSS promotion workflows in the portal

## CA printing, migration rollback, and graduation
- [x] Increase CA sheet row height and cell box sizing to fill printable A4 space without excessive blank area
- [x] Add administrator rollback action for accidental student promotions
- [x] Add persistent alumni records and final-year graduation workflow
- [x] Preserve student identity and academic history when graduating students
- [x] Optimize result-card loading queries and loading states
- [x] Add regression tests and verify CA print, rollback, graduation, and result-card workflows

## CA sheet print correction and rollback confirmation
- [x] Make the actual CA-sheet print renderer fill the A4 page with taller student rows
- [x] Prevent admission numbers and student names from overlapping or becoming invisible in print/PDF
- [x] Add an explicit confirmation pop-up before administrator promotion rollback
- [x] Verify browser print/PDF output and rollback cancellation/confirmation flows

## JAMB Practice for SS2 and SS3
- [x] Add a database-backed JAMB practice model for subjects, exams, questions, options, attempts, answers, and performance
- [x] Restrict JAMB Practice visibility and participation to active SS2 and SS3 students
- [x] Add student subject selection and timed CBT question-taking flow
- [x] Calculate and persist student scores and performance summaries after submission
- [x] Add administrator workspace to create/manage JAMB practices and generate questions with AI
- [x] Support administrator-selected subject, question count, A/B/C/D options, and duration
- [x] Add role, timing, scoring, persistence, responsive UI, and AI generation tests

## JAMB Practice review and analytics enhancements
- [x] Add administrator question review and manual editing before publication
- [x] Add student past-attempt review with selected answers, correct answers, and explanations
- [x] Add administrator performance analytics by subject, class, and attempt history
- [x] Add database-backed queries and role authorization for all new workflows
- [x] Add regression tests and responsive verification for review and analytics flows

## JAMB syllabus scoring and winner analytics
- [x] Make AI-generated questions explicitly syllabus-aligned for SS2 and SS3 and the selected subject
- [x] Store and display two marks per question with a 500-mark maximum scale
- [x] Add highest-performing student and class rankings with an overall winner card
- [x] Add print-ready/PDF export for the winner and performance report
- [x] Add validation and regression tests for syllabus prompts, scoring scale, rankings, and printable output

## JAMB generator and 500-mark winner report refinement
- [x] Fix the success/refetch flow so a generated draft immediately appears in Practice sets
- [x] Make AI prompts explicitly target SS2/SS3 syllabus content and selected subject topics
- [x] Score each question at two marks and expose a 500-mark reporting scale
- [x] Add highest student, class winner, and overall winner dashboard cards
- [x] Add printable/PDF output for the winner and performance report
- [x] Add regression coverage for generation refresh, scoring scale, rankings, and print output

## JAMB winner report filters and AI guidance
- [x] Add optional topic and prescribed-textbook fields to AI question generation
- [x] Apply optional guidance safely to the syllabus-aware generation prompt
- [x] Add administrator winner-report date and time range filters
- [x] Add academy session filter using live academic sessions
- [x] Apply filters to database-backed analytics and printable output
- [x] Add regression tests and responsive verification for the new controls

## JAMB publication visibility and student recognition
- [x] Verify and fix the draft-to-published practice flow so published questions appear for eligible student dashboards
- [x] Add a server-authorized class highest-score query for the authenticated student
- [x] Add a student dashboard badge/certificate for the highest score in the student’s class
- [x] Verify publication, session/subject visibility, class isolation, and responsive badge rendering
- [x] Add regression tests for published visibility and class winner recognition

## JAMB database visibility and winner badge refinement
- [x] Verify live generated exams, question rows, and draft/published statuses in the database
- [x] Harden the administrator draft-to-publish and student published-practice workflow
- [x] Add exact score and achievement date to the winner badge hover/focus interaction
- [x] Add regression and responsive verification for database visibility and badge details

## JAMB draft manager visibility bug
- [x] Verify why the administrator cannot see the JAMB question manager or saved Mathematics/Biology drafts
- [x] Fix the navigation, active-view rendering, or draft query causing the missing manager
- [x] Verify both draft review actions and update user navigation guidance

## JAMB draft list still empty in live admin UI
- [x] Trace the admin jambExams query and UI response mapping against the live draft records
- [x] Fix the Practice sets panel so saved Mathematics and Biology drafts render with review/publish actions
- [x] Verify the corrected live page and add regression coverage for non-empty draft listing

## JAMB exam identity and consent-based monitoring
- [x] Add Draft, Published, and Active status badges to every administrator practice-set row
- [x] Require the student to enter and verify their admission number before starting an exam
- [x] Add an explicit consent gate for optional camera/microphone access without recording or uploading by default
- [x] Detect tab switching, leaving the exam, and browser interruption locally and persist an interrupted-attempt state where supported
- [x] Verify privacy messaging, permissions, exam start, status display, and responsive behavior

## JAMB calculator and monitoring enforcement
- [x] Add an in-exam calculator for Mathematics and Chemistry practices
- [x] Show live camera and microphone connection status during an active exam
- [x] Persist monitoring warning events with attempt, student, class, reason, and timestamp
- [x] Add administrator monitoring review with filters and event details
- [x] Enforce two-warning automatic interruption/termination with student feedback
- [x] Add authorization, persistence, calculator, termination, and responsive regression tests

## JAMB recording and lightweight proctoring extension
- [x] Add consent and retention metadata for exam recordings
- [x] Store compressed video/audio outside the database and save only secure object-storage references and metadata
- [x] Add administrator-only recording and warning review with access controls
- [x] Add camera/microphone connection indicators and record start/stop/error events
- [x] Add Mathematics/Chemistry calculator and preserve two-warning automatic termination
- [x] Add authorization, privacy, storage, termination, calculator, and responsive regression tests

## JAMB warning and registration-fee extension
- [x] Add prominent flashing warning banners after first, second, and subsequent monitoring violations with clear termination messaging
- [x] Make the basic in-exam calculator draggable without adding scientific mode
- [x] Add administrator playback modal for recorded monitoring video linked to warning events
- [x] Build registration and fees presentation from the supplied academy flyer
- [x] Add optional card and bank-transfer payment choices with school bank details
- [x] Add secure role controls and regression tests for warnings, playback, payments, and responsive UI

## Student payments, receipts, and recording cleanup
- [x] Show the authenticated student's invoices, balances, and section fee information on the student dashboard
- [x] Allow a student to submit a self-service payment tied to their own invoice/student record
- [x] Generate a downloadable PDF receipt only after payment is verified successfully
- [x] Add student receipt history and secure ownership checks
- [x] Add administrator recording management with listing, selected deletion, and delete-all cleanup
- [x] Remove recording metadata references safely when media is deleted and keep raw media outside the database
- [x] Add payment, receipt, ownership, deletion, storage, and responsive regression tests

## Completed follow-up: student fees, receipts, and recording cleanup

- [x] Add student-visible school-fee summary with total, paid, and outstanding amounts.
- [x] Add student self-service payment submission with bank-transfer and card-intent options.
- [x] Add verified-payment-only downloadable/printable student receipt workflow.
- [x] Add student receipt history with ownership-safe access checks.
- [x] Add administrator recording inventory with playback, single deletion, and delete-all cleanup.
- [x] Keep recording media outside database rows and remove stored references safely.
- [x] Add responsive styling for the new finance and recording-management controls.
- [x] Run TypeScript validation and all Vitest tests: 147 passing.
- [x] Verify desktop portal rendering after the workflow updates.


## New requested fixes: administrator directories, receipts, accountant, and live monitoring

- [x] Correct the administrator teacher/staff directory so it renders staff records and staff-specific fields instead of student records.
- [x] Separate administrator Assignments and Users & permissions workspaces so their labels, data, and controls are not duplicated or cross-wired.
- [x] Add sequential receipt numbering for verified payment receipts with collision-safe persistence.
- [x] Add editable school-specific receipt branding fields with a safe default and optional school address input.
- [x] Audit and verify the accountant dashboard end-to-end while preserving the paused accountant feature scope.
- [x] Add administrator-only consent-based live exam monitoring view for active student sessions, with secure access controls and no hidden recording behavior.
- [x] Add regression coverage for directory routing/data, receipt numbering/branding, accountant access, and live monitoring authorization.


## New requested fixes: class print pagination, role metrics, and recording playback

- [x] Ensure the JS1A CA/result print workflow includes every student in the selected class and paginates the full roster across A4 pages without name overlap.
- [x] Restrict total-student and total-staff overview metrics to administrator dashboards only.
- [x] Keep accountant dashboard summary metrics focused on school payment amounts and finance records.
- [x] Fix CBT recording playback sizing so the entire video/audio player is visible without overlap on desktop and mobile.
- [x] Add regression coverage for full-roster print pagination, role-specific metric visibility, and recording-player layout.


- [x] Apply the print-pagination fix consistently to every selected class and every supported section/layout, not only JSS 1A.


## New requested refinements: monitoring controls and print layouts

- [x] Add a fullscreen control to the administrator CBT live-monitoring player.
- [x] Display live connection-quality status for the monitored CBT stream.
- [x] Adjust result-template print table height, width, and proportions for clearer A4 output.
- [x] Add a manual dashed class-teacher signature line to printed result templates.
- [x] Keep the CA-sheet letterhead and logo on the first page only; continuation pages should contain only remaining student rows.
- [x] Add regression coverage for monitoring controls and all requested print-layout rules.


## New requested feature: Progressive Web App packaging

- [x] Add an Alfurqan-branded PWA manifest with installable display, theme colors, icons, and shortcuts.
- [x] Add installable PWA icons and browser/mobile metadata without storing oversized assets in the project.
- [x] Add a service worker registration and safe static-asset caching strategy that does not cache authenticated API responses.
- [x] Add an offline fallback/status experience while preserving live authentication and database behavior when online.
- [x] Add regression coverage for manifest metadata, service-worker registration, cache safety, and app-shell build output.
- [x] Verify the PWA build and responsive portal rendering, then save and publish the checkpoint.


## New approved scope: student filter, CBT monitor verification, and PWA splash

- [x] Add a privacy-safe Male/Female/Unspecified filter to the student directory using explicitly recorded profile values only.
- [x] Preserve and verify the CBT monitor fullscreen button and connection-quality status without adding gender inference or hidden monitoring.
- [x] Create and integrate an Alfurqan-branded PWA splash-screen illustration for mobile loading/install experience.
- [x] Keep push notifications disabled until the school provides an approved notification policy.
- [x] Add regression coverage for the gender filter, monitor controls, splash metadata, and deferred notification behavior.


## New requested scope: notifications, PWA install/update, and Primary result print refinements

- [x] Add an in-app notification center with a bell icon, unread count, recent school alerts, and role-safe notification visibility.
- [x] Add policy-controlled opt-in push notification infrastructure without sending notifications before school approval.
- [x] Add a custom PWA install-app control in the main navigation and handle already-installed browsers gracefully.
- [x] Make installed PWA clients receive website updates through service-worker update detection and refresh messaging.
- [x] Verify installability and splash behavior on Android-capable browser viewports and document limitations where real device access is unavailable.
- [x] Refine Primary result print layout to fit the page with taller rows and improved table sizing.
- [x] Increase and bold the Arabic academy name in Primary result print output.
- [x] Render Primary result comments and manual signature areas in circular boxes.
- [x] Add regression coverage for notification center, push-policy gating, PWA install/update behavior, and Primary print styling.


## New requested scope: notification filters, PWA install affordance, and CBT media playback

- [x] Add read/unread filtering controls to the notification center and keep the unread count accurate.
- [x] Make the PWA install action discoverable when supported and explain why it is unavailable when the browser has already installed or does not expose an install prompt.
- [x] Verify JAMB monitoring recording rows and storage references in the database before playback.
- [x] Repair administrator video playback so the modal is above the sidebar and the media fills the available viewport without overlap.
- [x] Repair administrator audio playback so stored voice recordings load and play with a visible fallback state.
- [x] Add regression coverage for notification filtering, install affordance, and media playback URL/stacking behavior.


## New bug fix: mobile playback overlay stacking

- [x] Prevent the mobile sidebar from covering the administrator video/audio playback modal.
- [x] Ensure playback modal content spans the viewport and media controls remain tappable on mobile.
- [x] Add regression coverage for sidebar, backdrop, and video/audio modal stacking.


## New bug fix: missing administrator CBT recordings

- [x] Verify whether the latest CBT attempt created video/audio recording rows and storage references.
- [x] Ensure recording upload persistence is not lost when an exam terminates or a tab-switch warning occurs.
- [x] Ensure administrator monitoring review and recording management expose available video/audio items consistently.
- [x] Add regression coverage for terminated attempts and recording inventory visibility.


## Repeated bug report: latest JAMB test history and recordings missing

- [x] Re-query the live database for the latest JAMB attempts, answers, monitoring events, and recordings after the user’s newest test.
- [x] Trace whether the student attempt submission completes and whether the student history query refreshes for the authenticated student.
- [x] Trace whether camera/audio recorder uploads are invoked, accepted, and persisted after submission or termination.
- [x] Repair any remaining history or recording persistence defect and add regression coverage.


## General portal and database health check

- [x] Run read-only database integrity checks for users, students, staff, classes, subjects, assignments, attendance, results, fees, announcements, JAMB, and recordings.
- [x] Check cross-module references for orphaned, duplicate, invalid, or inconsistent records without deleting or mutating data.
- [x] Audit authentication, role isolation, route contracts, PWA assets, notification behavior, and current runtime/browser logs.
- [x] Fix only confirmed safe defects and add regression coverage for each change.
- [x] Re-run the full test suite, TypeScript validation, production build, and responsive smoke verification.
- [x] Publish a health-check checkpoint with a clear distinction between healthy, expected-empty, and unresolved items.


## Teacher score-upload database verification

- [x] Inspect recent result entries and identify the submitting teacher/account.
- [x] Verify every recent entry links to an existing student and matching live class, subject, session, and term.
- [x] Recalculate stored CA and exam totals using Nursery/Primary and Junior/Senior score limits.
- [x] Verify duplicate or malformed recent rows and report findings without mutating records.


## Result Template Studio

- [x] Add separate saved layout settings for Nursery, Primary, Junior, and Senior result templates.
- [x] Add administrator-only backend query and save/reset procedures for template settings.
- [x] Build a Result Template Studio workspace with section tabs, live result preview, and editable margins, font sizes, row heights, column widths, logo size, and spacing.
- [x] Integrate saved layout settings into result print/preview output without changing academic data calculations.
- [x] Add responsive styling, validation, reset defaults, and regression coverage for the studio and saved print settings.
- [x] Verify the studio, result preview, print behavior, and responsive layout, then publish the checkpoint.


## Icon system and Result Template Studio enhancements

- [x] Align dashboard/sidebar/card icons with the uploaded reference using consistent outlined icons, colored icon tiles, and soft rounded containers.
- [x] Add a school-approved font setting with a safe allowlist and live preview.
- [x] Add custom header and footer text settings per result section with live preview and print integration.
- [x] Add custom background watermark upload, opacity/size configuration, safe storage reference, and print integration per result section.
- [x] Add regression coverage for icon styling, approved fonts, custom text, and watermark settings.
- [x] Verify responsive UI, upload/save/reset/print workflows, then publish the checkpoint.

## Result Template Studio extension

- [x] Generate and apply the database migration for approved fonts, custom header/footer text, and watermark metadata
- [x] Validate and normalize approved result-template font values at the server boundary
- [x] Add administrator-only secure watermark upload backed by project storage references
- [x] Add studio controls for font selection, custom header/footer text, watermark removal, opacity, and size
- [x] Apply saved font, header/footer, and watermark settings to the live report renderer
- [x] Add regression tests for the extended template contract and upload validation
- [x] Run full type check, tests, production build, and responsive visual verification

## Result Template Studio removal request

- [x] Remove the Result Template Studio navigation entry and administrator workspace
- [x] Remove studio-only upload, save, and reset references; retain the read-only layout schema/helper deliberately so existing result records remain intact
- [x] Verify all result entry, report-card, CA sheet, student, staff, and PWA workflows remain intact
- [x] Run TypeScript, full tests, production build, responsive checks, and publish the safe removal checkpoint

## Result-card A4 print refinement

- [x] Set the result-card print workflow to A4 dimensions and increase usable horizontal margins/content width
- [x] Keep result comments and the class-teacher signature together on the same page without overlap or spillover
- [x] Verify populated report preview and Save as PDF behavior on the responsive print workflow
- [x] Add regression coverage, rerun the full suite, and publish the verified print fix

## Result-card A4 space and student-count correction

- [x] Make report-card content occupy the usable A4 page area without excessive blank margins
- [x] Ensure the selected class report batch renders every student without missing or clipped records
- [x] Verify populated report preview and print/PDF pagination for large classes
- [x] Add regression coverage, rerun validation, and publish the fix
- [x] Delay class PDF printing until every selected student report card has mounted, so large classes are not truncated by the browser print dialog

## Report-card print mounting status

- [x] Add a visible spinner and mounting progress status while the selected class report cards are rendering before print
- [x] Disable duplicate print actions until the full report batch is ready, then show a ready-to-print state
- [x] Add regression coverage and verify the updated workflow on desktop and mobile-sized previews

## Administrator Reports subject-upload progress

- [x] Add a live administrator-only subject upload progress aggregate for selected session, term, section, and class
- [x] Add All Subjects Upload Percentage summary, uploaded/expected counts, and per-subject breakdown to Reports centre
- [x] Add loading, error, empty, refresh, and responsive states with regression coverage
- [x] Verify TypeScript, all Vitest tests, production build, and responsive portal behavior

## Junior and Senior subject-upload progress correction

- [x] Audit live Junior and Senior class, student roster, and class-subject assignment records
- [x] Correct the upload-progress lookup so Junior and Senior classes use their actual assignments and rosters
- [x] Preserve all existing student scores and result records while correcting the progress calculation
- [x] Add regression coverage and verify Junior/Senior progress in the administrator Reports workflow
- [x] Run the full validation suite and publish the correction

## Color-coded subject upload progress

- [x] Add color-coded progress bars for each subject in the administrator Reports upload-progress panel
- [x] Add accessible status labels/legend for complete, in-progress, and not-started subjects
- [x] Add regression coverage and verify desktop/mobile presentation
- [x] Run the full validation suite and publish the enhancement

## Directory, subject, photo, and ID-card expansion

- [x] Add administrator subject edit workflow with validated English and Arabic name persistence
- [x] Add safe individual student class transfer with confirmation and result/class integrity safeguards
- [x] Add validated bulk student class transfer with per-row success/error reporting and audit history
- [x] Add database-backed storage references and administrator photo upload/update workflow for students and staff
- [x] Add branded student and staff ID-card preview, batch selection, and print/PDF workflow
- [x] Add regression tests, data-integrity checks, responsive verification, and publish the completed features

## ID-card portrait, crop, and two-sided refinement

- [x] Add post-CSV/post-account student and staff photo editing entry points with crop-before-upload workflow
- [x] Persist cropped portrait photos and connect them directly to the generated ID cards
- [x] Use live school address and phone branding from school settings on ID cards
- [x] Redesign cards as printable front/back pairs with centered portrait details and back-side QR code
- [x] Add optional ID-card signature upload and storage reference
- [x] Add regression tests, data-integrity checks, responsive verification, and publish the refinement
- [x] Repair StaffView JSX boundary after integrating staff photo crop upload
- [x] Redesign administrator ID cards as branded two-sided front/back card pairs
- [x] Generate per-card QR codes for student and staff identity verification
- [x] Add optional administrator ID-card signature upload to School Settings data
- [x] Verify crop-upload-preview-print flow on desktop and mobile
- [x] Verify class-transfer workflow remains intact after ID-card changes
- [x] Run complete tests, build, and visual verification before checkpoint

## Photo audit, portrait ID-card, and PDF refinement

- [x] Add administrator photo replacement controls for students and staff
- [x] Add administrator photo removal controls for students and staff
- [x] Persist administrator photo-change audit history and expose it in profiles
- [x] Convert ID-card design and print layout from landscape to portrait
- [x] Diagnose and fix blank student PDF download rendering
- [x] Add regression tests and verify desktop/mobile portrait printing and student PDF output
- [x] Keep ID cards at normal card dimensions while using portrait artwork; do not stretch cards to fill A4
- [x] Keep ID cards as straight upright portrait cards at normal card dimensions; do not rotate, bend, or stretch them to A4

## Reference ID-card print spacing

- [x] Match StaffIDCards.pdf upright front/back spacing without overlap
- [x] Verify the corrected ID-card preview and exported PDF layout

## Exact uploaded ID-card replication

- [x] Replicate the uploaded StaffIDCards.pdf front-side visual design in the portal
- [x] Replicate the uploaded StaffIDCards.pdf back-side visual design in the portal
- [x] Verify reference fidelity and print output without overlap

## Editable ID-card configuration

- [x] Add database-backed ID-card design settings for colors, dimensions, typography, and spacing
- [x] Add editable front-side information and field visibility controls
- [x] Add editable back-side information, QR, signature, and footer controls
- [x] Build administrator controls with reset, validation, live preview, and persistence
- [x] Verify settings in preview, print/PDF, and responsive layouts

## ID-card visual editor

- [x] Add persisted per-side field positions for draggable ID-card elements
- [x] Add separate Front and Back editor tabs with live card canvases
- [x] Add click-to-edit text directly on each card preview
- [x] Apply editor positions and text to generated cards and print/PDF output
- [x] Add interaction, persistence, print, and responsive regression coverage

## Advanced ID-card editor controls

- [x] Add persisted resize dimensions for photo, QR, logo, and text fields
- [x] Add per-field font family, weight, alignment, and line-height controls
- [x] Add named ID-card design presets with apply and save behavior
- [x] Add undo and redo history for layout, size, text, and style changes
- [x] Verify advanced editor settings in preview, print/PDF, mobile, and regression tests

## Student ID-card PDF blank-output fix

- [x] Reproduce and diagnose blank student ID-card PDF output
- [x] Repair student card print-source visibility and asset readiness
- [x] Verify populated student front/back cards in preview and saved PDF output

## Visual result-template editor

- [x] Add separate Nursery, Primary, Junior, and Senior template editor sections
- [x] Add persisted draggable positions and resize dimensions for result fields
- [x] Add direct text editing plus per-field font, weight, alignment, and line-height controls
- [x] Apply every saved template change to result preview, browser print, and PDF export
- [x] Add regression tests and verify all four section layouts on desktop and mobile

## Result-template corner resize

- [x] Add pointer-based corner-drag resizing to every result-template field
- [x] Constrain resized fields within the template canvas and preserve undo/redo
- [x] Verify saved dimensions in preview, PDF export, and responsive layouts

## Home heading visual-edit correction

- [x] Correct the dashboard heading text to GOOD DAY with font weight 800
- [x] Remove unintended font-weight styles from unrelated topbar descendants
- [x] Verify the corrected desktop/mobile dashboard and checkpoint the result

## Dashboard greeting and active session display

- [x] Verify dashboard heading scale and sidebar composition at desktop width
- [x] Add database-backed configurable administrator greeting in School Settings
- [x] Drive dashboard date and session display from the active academic session
- [x] Add regression tests and verify desktop/mobile dashboard behavior
- [x] Review and repair malformed Home.tsx visual-editor styles before checkpoint

## Session-aware student promotion and historical results
- [x] Preserve prior-session class membership and result records for historical compilation
- [x] Add administrator workflow to promote or transfer students into new-session classes
- [x] Scope result, report, and CA-sheet queries by selected academic session and term
- [x] Provide promotion history with safe rollback and clear confirmation before reversing transfers
- [x] Add regression tests for promotion, historical result compilation, and session isolation

## CBT scoring and exam-lock update
- [x] Set each CBT subject score to a maximum of 50 marks and the five-subject aggregate to 250
- [x] Make CBT eligibility available to all students instead of only selected secondary classes
- [x] Automatically terminate an exam attempt when the browser page is minimized, hidden, closed, or abandoned
- [x] Add regression tests for 50-mark scoring, 250-mark aggregate calculation, all-student eligibility, and leave/minimize termination

## CBT anti-cheat and fixed scoring refinement
- [x] Terminate an active CBT attempt when the browser document becomes hidden or the window is minimized
- [x] Enforce exactly 50 marks per subject and 250 marks across five subjects in CBT scoring and display
- [x] Verify CBT database attempt and score records remain intact and add focused regression coverage

## CBT guidance, termination filters, and class ranking
- [x] Explain the 50-mark subject and 250-mark five-subject model before students start an exam
- [x] Preserve independent subject attempts so students may sit one or multiple subjects separately
- [x] Add an administrator filter for attempts terminated by anti-cheat events
- [x] Add database-backed class ranking by aggregate score across the five core subjects
- [x] Add regression tests and verify the updated CBT workflows

## CBT recording persistence repair
- [x] Harden final MediaRecorder chunk flushing and align lightweight upload limits so saved recordings reliably appear in administrator Recording Management
- [x] Verify recording metadata persistence and playback inventory after the repair

## Examination card workflow
- [x] Add database-backed exam card records linked to student, session, term, class, subjects, timetable, issue date, and status
- [x] Support JSS1A/B, JSS2A/B, JSS3A/B, SS1A/B, SS2A/B, and SS3A/B class selection with assigned subjects from the database
- [x] Build branded A4 exam-card preview with student identity, photo, candidate/admission number, exam details, subjects, and exam-officer signature area
- [x] Add single-student print/PDF download and batch class print/PDF download workflows
- [x] Add responsive mobile preview and regression coverage for exam-card persistence and printing

## Examination card A4 print repair
- [x] Make each examination card render as one A4 portrait page without blank or split pages on Android and desktop
- [x] Preserve class batch printing and add regression coverage for print sizing and page breaks

## Examination-card preview and PDF fidelity repair
- [x] Keep the exam-card preview above and clear of the dashboard sidebar and navigation chrome
- [x] Preserve branded colors, backgrounds, table styling, centering, and signature image in saved PDF output
- [x] Verify single and batch cards match the on-screen preview in A4 print output

## Examination-card information and regulations refinement
- [x] Keep examination identity information in a consistent two-column boxed layout in preview and PDF
- [x] Move the exam-officer signature into a dedicated bottom signature block that prints reliably
- [x] Add at least five examination rules and regulations while keeping each card on one A4 page
- [x] Add regression coverage and verify single and batch PDF output

## Examination-card administration and student visibility
- [x] Add an administrator editor for five examination rules and regulations used on exam cards
- [x] Add official exam-officer signature upload and verification in School Settings
- [x] Link the existing student/ID-card photo directly to the examination card
- [x] Add administrator approval control for student exam-card visibility
- [x] Show approved exam cards on the correct student dashboards with session-safe access
- [x] Add regression tests and verify admin upload, approval, photo linkage, and student viewing workflows

## Examination-card approval and student download
- [x] Add class-wide bulk approval for issued examination cards
- [x] Add administrator pending/approved status filtering for examination cards
- [x] Add student preview and PDF download controls for approved examination cards
- [x] Add regression tests and verify administrator and student workflows

## Examination-card approval and branding verification
- [x] Verify bulk approval updates the live examCards database records to approved
- [x] Verify approved cards appear only on the correct student dashboard
- [x] Verify signature and five examination rules render on approved cards
- [x] Repair and verify missing school logo and academy name in preview and PDF output
- [x] Add regression coverage and save a verified checkpoint

- [x] Verify live examination-card bulk approval persistence for session, term, and class filters.
- [x] Ensure administrator and student examination-card PDF renderers share the live academy logo and school name.
- [x] Add regression assertions for examination-card branding, approval predicates, signature, and five rules.
- [x] Run TypeScript, full Vitest, production build, and browser visual verification for examination cards.
- [x] Save a final verified checkpoint for examination-card branding and approval workflow.
- [x] Refresh the examination-card approval queue after a successful card issue so the pending record is immediately visible.

## Student visibility, cleanup, and automatic exam-card access
- [x] Verify published results are visible only to the correct linked student account.
- [x] Remove deleted students and their linked portal records, results, payments, attendance, assignments, exam attempts, and exam cards safely.
- [x] Ensure newly added students flow into roster, result, CA, dashboard, and examination-card workflows.
- [x] Make issued examination cards visible to the owning student without administrator approval.
- [x] Add regression tests for result visibility, deletion cleanup, new-student synchronization, and approval-free exam-card access.
- [x] Run full verification and save a new checkpoint.

## Bulk examination-card issuance
- [x] Add an administrator action to issue examination cards for every enrolled student in a selected class.
- [x] Add an administrator action to issue examination cards for every enrolled student in a selected section.
- [x] Preserve the selected session, term, class subjects, student identity/photo, branding, and direct student visibility for every generated card.
- [x] Prevent accidental duplicate cards for the same student, session, term, and examination context while allowing intentional reissue after timetable changes.
- [x] Add loading, success, partial-failure, and empty-roster feedback for bulk issuance.
- [x] Add regression tests, run full verification, and save a checkpoint.

## Comprehensive portal health check
- [x] Inspect TypeScript, dependency, production-build, and development-server health.
- [x] Inspect browser, network, and server logs for current runtime errors.
- [x] Audit database integrity, orphaned records, active sessions, and role-scoped access contracts.
- [x] Exercise critical administrator, teacher, student, parent, finance, results, CBT, exam-card, and printing workflows.
- [x] Verify desktop and mobile responsive rendering and fix only confirmed defects.
- [x] Add regression coverage for every confirmed defect and rerun the full verification suite.
- [x] Save and publish a final health-check checkpoint with an honest findings report.

## Subject-account login verification
- [x] Inspect subject-account usernames, password hashes, account status, and assigned classes in the live database.
- [x] Trace subject-account login normalization, password verification, and role routing.
- [x] Resolve the confirmed subject-account credential mismatch: the supplied value was missing the final `D`; no application-code auth change was required.
- [x] Add regression coverage for successful subject login, invalid credentials, inactive accounts, and dashboard routing.
- [x] Run the subject login workflow and full verification suite, then save a checkpoint.

## Screenshot-specific subject-account login failure
- [x] Verify the exact `AFS-300014` credential pair shown in the submitted screenshot against the live database.
- [x] Trace whether this account is active, linked, assigned, and provisioned with the displayed password.
- [x] Resolve the affected credential issue: the live authentication flow is correct; the screenshot pair succeeds when entered exactly.
- [x] Re-test Staff login for this account and add/update regression coverage.
- [x] Save a checkpoint after the verified fix or diagnosis.

## All-subject account workflow verification
- [x] Audit every active subject account for username, initial password, active login user, and assigned class-subject scope; document the 13 live data-alignment exceptions for administrator follow-up.
- [x] Verify subject login routes to a subject-only upload workspace and prevents access to unrelated subjects/classes.
- [x] Verify score-save persistence through the existing database-backed router and regression coverage; do not insert a live test score into school records.
- [x] Verify subject accounts can log out and cannot reuse protected dashboard data after logout.
- [x] Add or update regression coverage for all-subject account provisioning, login, scope enforcement, upload persistence, and logout.
- [x] Run the end-to-end workflow and save a verified checkpoint.

- [x] Make the Staff result-entry section default to the logged-in subject account's first assigned section so valid class and subject options are visible immediately after login

- [x] Add clear Staff dashboard indicators for the currently assigned section, class, and subject
- [x] Create one intentional live score sample per section and verify database, result, and CA-sheet reflection under the school’s records policy

## Subject credential login and section print follow-up
- [x] Verify and repair the screenshot subject-account credential pair and preserve subject-only login/logout behavior
- [x] Fix section-filtered subject credential printing so Nursery, Primary, JSS, and SSS exports render non-blank rows like the All-subject export

## Full subject credential and student exam-card verification
- [x] Audit every username/password listed in subjectportalcredentials.pdf through the real subject login and logout flow without changing school data
- [x] Diagnose and repair blank student exam-card preview and PDF output, then verify the populated student card data and shared renderer end to end; browser click-through for one changed-password student remains optional

- [x] Optional browser click-through for student `2026/AFSAL/SSS/002` intentionally skipped at the user's direction; no browser pass claimed

## Dynamic exam-card and one-page A4 follow-up
- [x] Make issued and student-visible exam cards refresh their subject/timetable rows from the current class subject assignments, including additions and deletions
- [x] Keep the logo, student photo, signature, rules, and full timetable on one A4 page in student preview and PDF print output

## Student dashboard examination-card focus
- [x] Ensure the student-dashboard exam card alone rehydrates current class subjects and keeps branding, photo, signature, rules, and timetable on one A4 page

- [x] Fix the exam-card regression expectation after adding student signature support and guarantee generated subject passwords are always 10 characters

## Student exam-card download and lifecycle propagation
- [x] Add a direct Download as PDF button to each student-dashboard exam card and verify it opens the populated card print flow
- [x] Real student photo-and-configured-signature one-page test intentionally skipped at the user's direction; no combined-asset pass claimed
- [x] Audit that student add/delete propagation remains consistent across session rosters, class subjects, ID cards, exam cards, and linked records

- [x] Update the student exam-card regression expectation for the expanded print helper signature and configured rules argument

## Manual exam-card signature
- [x] Keep the student exam-card signature area as a blank manual Exam Officer line and never render an uploaded signature image

## Exam-card print layout refinement
- [x] Center and enlarge the bilingual school name and make both names bold in the student exam-card PDF
- [x] Increase the printed school logo dimensions while preserving the one-page A4 geometry
- [x] Slightly increase timetable subject-row height without introducing excessive blank space
- [x] Move examination rules and the manual Exam Officer signature area beside the timetable, leaving intentional blank space below
- [x] Verify the revised exam-card preview and PDF print path on desktop and mobile layouts

## Modern SaaS multi-school master prompt
- [x] Revise the master website prompt to make multi-tenant SaaS the primary product model, with Alfurqan Science Academy Lafia as the first protected tenant

## Generic SaaS copy prompt
- [x] Rewrite the master prompt as a school-neutral copy of the existing school-management system, with modern multi-school SaaS as the primary model

## Alfurqan-style multi-school SaaS prompt
- [x] Revise the master prompt to preserve the existing Alfurqan design and feature style while making each school’s identity and branding configurable

## Overall website health audit
- [x] Complete a non-destructive audit of automated tests, type validation, production build, dependency advisories, runtime logs, database integrity, and desktop/mobile rendering

## Student and staff photo propagation
- [x] Added validated photo upload controls to student and staff edit workflows, reused the crop-and-save path, and connected stored portraits to student/staff portals, examination cards, ID cards, and report-card output
- [x] Added regression coverage and completed automated, type, build, database, runtime, and responsive verification

## Photo rendering regression
- [x] Fix stored student and staff photos that currently show broken-image placeholders or alt text across portal, ID-card, examination-card, and report-card surfaces
- [x] Verify the corrected photo-serving path and all affected renderers without changing unrelated school data

## Batch report-card print correction
- [x] Move each student portrait into the upper-right identity area of the report-card header for preview and PDF output
- [x] Restore the class master comment and manual class-master signature line in the report-card output
- [x] Verify one-page-per-student pagination for the full selected class, including all students

## Exact report portrait placement
- [x] Relocate the student portrait from beneath the report heading to the user-marked upper-right header area in preview and batch PDF output

## Junior and Senior report PDF correction
- [x] Ensure class-teacher comments and the manual signature line appear in Junior and Senior saved/printed PDF output
- [x] Verify secondary report one-page A4 output in preview and PDF after the correction; live SSS 1A preview opened with 51 Senior report cards

## August 2026 report-card PDF regression follow-up

- [x] Inspect extracted report source and backend termly-report bindings for missing Junior/Senior comments and signatures
- [x] Replace label-wrapped secondary report comments with explicit printable comment blocks
- [x] Add print-safe A4 sizing and overflow protection for teacher/coordinator comments
- [x] Preserve a visible manual Class Teacher’s Signature line in the report print source
- [x] Update report UI regression assertions for the corrected comment label and markup
- [x] Run focused report, photo, and exam-card tests
- [x] Run the complete Vitest suite, TypeScript validation, and production build
- [x] Apply package-manager production audit overrides and reinstall patched dependency versions
- [x] Complete authenticated browser batch-print verification for SSS 1A; 51-card Senior preview populated successfully
- [x] Complete a non-destructive audit of the legacy data-alignment exceptions; exact live findings are documented, and permanent cleanup remains approval-gated
- [x] Re-run the dependency audit after the installed overrides; one unresolved high advisory remains for xlsx@0.18.5

## Remaining Senior class report verification

- [x] Verify SSS 1B report-card batch preview and pagination; 56 active students loaded
- [x] Verify SSS 2A report-card availability; no student records are currently enrolled, so export correctly remains unavailable
- [x] Verify SSS 2B report-card batch preview and pagination; 55 active students loaded
- [x] Verify SSS 3A report-card availability; no student records are currently enrolled, so export correctly remains unavailable
- [x] Verify SSS 3B report-card availability; no student records are currently enrolled, so export correctly remains unavailable
- [x] Confirm the corrected Senior report template is used by populated SSS 1B and SSS 2B previews; empty SSS 2A, SSS 3A, and SSS 3B have no report cards to render

## Examination-card PDF layout refinement

- [x] Expand the examination timetable area for English subject, Arabic subject, date, and time columns
- [x] Place examination rules and regulations in the marked side panel beside the timetable
- [x] Place a manual Exam Officer signature line in the marked lower signature area
- [x] Preserve one-page A4 geometry and prevent blank or overflowed PDF output
- [x] Add regression coverage for the revised examination-card print structure
- [x] Verify a populated examination card in preview and saved-PDF print source

## Examination-card saved-PDF discrepancy follow-up

- [x] Reproduce the remaining mismatch in the actual browser print/save-PDF output; refreshed live populated preview and triggered Print / Save PDF
- [x] Verify the print source independently from the on-screen preview; print source contains full-width timetable, rules, and signature markup
- [x] Align timetable, rules, and manual Exam Officer signature placement in saved PDF
- [x] Add regression coverage for the reproduced failure
- [x] Re-run full validation and publish the corrected checkpoint

## Examination-card saved-PDF content and portrait regression

- [x] Reproduce missing examination rules and Exam Officer signature in the actual saved-PDF print source
- [x] Verify the saved-PDF portrait uses the selected student’s stored photo rather than a fallback or incorrect image; stored URL verified as HTTP 200 image/jpeg
- [x] Harden image loading and print-source content visibility for examination cards
- [x] Add regression coverage for rules, signature, and selected-student portrait identity
- [x] Re-run focused and full validation, then publish the correction

## Examination-card content regression follow-up

- [x] Harden selected-student portrait binding with stored image key, eager loading, and identity data attributes
- [x] Keep examination rules and manual Exam Officer signature visible and unsplit in the browser print source
- [x] Confirm the selected SSS 1A portrait storage URL resolves as HTTP 200 image/jpeg
- [x] Add regression assertions for portrait identity and print-visible rules/signature markup
- [x] Run the full 208-test suite, TypeScript check, and production build
- [x] Confirm the final native Android Save as PDF preview path is supplied by the dedicated embedded-print document; physical-device confirmation remains recommended for the user

## Android examination-card saved-PDF regression

- [x] Reproduce the Android saved-PDF output independently from the in-page preview; identified print-engine URL resolution and clipping issues
- [x] Build a dedicated examination-card print document with embedded student portrait data URLs
- [x] Preserve examination rules and manual Exam Officer signature in the dedicated print document
- [x] Add regression tests for the dedicated print-document HTML and embedded portrait
- [x] Verify the generated Android-compatible print output and publish the correction

## Examination-card bilingual header order and cross-section photo verification

- [x] Put the Arabic school name above the Western English school name in administrator examination cards
- [x] Place “EXAMINATION CARD” below both bilingual school names
- [x] Apply the same header order to the student-dashboard examination-card print renderer
- [x] Preserve embedded portrait visibility and correct selected-student binding
- [x] Verify examination-card photo availability across Junior JSS and Senior SSS workflows; JSS has 0 stored portraits, SSS 1A has 1, and other populated SSS classes currently have 0
- [x] Add regression coverage, rerun validation, and publish the correction

## Examination-card typography and dual-signature refinement

- [x] Increase the Arabic school-name font size in administrator examination cards
- [x] Reduce the Western English school-name font size in administrator examination cards
- [x] Move the Exam Officer signature area two spacing steps lower
- [x] Add a right-side Head of ICT/MIS signature block with the name Ahmed Dahir Tobi
- [x] Apply the same typography and signature layout to student-dashboard PDF cards
- [x] Add regression tests, verify JSS/SSS card output, and publish the correction

## Visual examination-card signatures and portrait propagation

- [x] Add School Settings fields for visual Exam Officer and Head of ICT/MIS signatures
- [x] Reuse the existing validated upload/crop workflow for both signature images
- [x] Store signature references safely and load them in administrator examination-card PDFs
- [x] Propagate the same signatures to student-dashboard examination cards
- [x] Identify and repair the student portrait that is missing from examination-card output
- [x] Verify portrait and signature visibility across Junior JSS and Senior SSS cards
- [x] Add regression tests, run full validation, and publish the correction

- [x] Fix School Settings save failure caused by the current schoolSettings insert/update column mismatch
- [x] Verify existing settings remain intact and signature uploads save successfully after the fix
- [x] Add regression coverage and checkpoint the settings persistence repair

- [x] Fix uploaded examination-card signatures missing from administrator preview and PDF save output
- [x] Verify signature URL resolution and image readiness for both Exam Officer and Head of ICT/MIS
- [x] Add regression coverage and checkpoint the signature-rendering repair

- [x] Add student admission number to Nursery, Primary, Junior, and Senior report-card identity metadata and print output
- [x] Add StoredExamImage data-URL decoding for examination-card logo, portrait, and configurable signatures
- [x] Add regression coverage for report admission-number visibility and signature-safe examination-card rendering


- [x] Audit all stored student and staff portrait records and their canonical storage URL/key pairs
- [x] Verify portrait resolution and visibility in examination-card, report-card, and ID-card previews and print/PDF output
- [x] Repair any broken image binding, proxy, data-URL, or print-rendering path found during the audit
- [x] Add regression coverage for portrait visibility across examination cards, report cards, and ID cards
- [x] Run the final image audit, tests, type check, production build, and checkpoint verification
