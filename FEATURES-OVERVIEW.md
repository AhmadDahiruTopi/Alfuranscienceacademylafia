# Al-furqan Science Academy Lafia
## School Management System — Current Feature Inventory

This document summarizes the current capabilities of the school portal, organized by module and user role. Access is controlled by role-based permissions, so each user sees only the workspaces relevant to their account.

## 1. User roles and access

| Role | Main access |
|---|---|
| Administrator | Full school-management access, configuration, academic records, finance oversight, printing, user accounts, and security controls |
| Principal | School-level academic and operational views permitted by the configured role |
| Teacher / Staff | Assigned teaching workspace, result entry, assignments, attendance, and personal account settings |
| Subject account | Dedicated subject-only login with restricted class and subject upload scope |
| Accountant | Fees, invoices, payment records, verification, balances, and receipts |
| Parent | Linked child’s published results, attendance, announcements, fees, and receipts |
| Student | Personal published results, timetable, assignments, fees, announcements, examination cards, and CBT practice where available |

The portal supports both the main authenticated account flow and local username/password accounts. It includes session persistence, explicit logout, password changes, role-specific dashboard routing, and server-side permission checks.

## 2. Authentication and account security

The system includes a unified portal login for administrators, staff, teachers, accountants, parents, and students. It supports Manus/Google authentication where configured and local credentials for school-created accounts.

Students use their admission number as their username and receive an initial password. The system can force a student to change the initial password after the first successful login. Administrators can reset a student password to the configured default and can reset or deactivate staff and subject accounts.

Subject accounts are separate from normal staff accounts. Each subject account receives its own username and password, logs in to a dedicated subject portal, sees only its assigned class-subject workload, and is denied access to out-of-scope classes or subjects. Usernames tolerate accidental whitespace from mobile typing while passwords remain exact and case-sensitive.

## 3. Administrator dashboard

The administrator dashboard provides a live overview of the school, including total students, teaching staff, attendance status, verified fees, recent activity, current academic session, current term, and date/session information driven from the database.

The administrator can access the main management workspaces from the sidebar, search the portal, view notifications, and use responsive desktop and mobile layouts. Administrative menus are hidden from restricted roles.

## 4. Student management

The student directory supports live database records rather than static sample data. Administrators can:

| Student-management capability | Availability |
|---|---|
| Add a student manually | Available |
| Edit student identity and class | Available |
| Delete a student | Available with linked-record cleanup |
| Bulk-import students from CSV/Excel-compatible files | Available |
| Download a CSV import template | Available |
| Export admission numbers and initial passwords | Available to administrators |
| Export filtered student records | Available |
| Search and filter students | Available |
| Filter by class, section, and gender | Available |
| Move one student to another class | Available |
| Move multiple students in bulk | Available |
| View a student directly by session, section, and class | Available |
| Upload, replace, crop, or remove a student photo | Available |
| Review administrator photo-change history | Available |

Admission numbers are generated automatically in the school format, including the academic year, school identifier, section code, and a three-digit sequence such as `2026/AFSAL/NUR/001`, `2026/AFSAL/PRI/001`, `2026/AFSAL/JSS/001`, or `2026/AFSAL/SSS/001`.

When a student is added, the system synchronizes the student with active session rosters and makes the record available to relevant class-based workflows, including results, CA sheets, examination cards, ID cards, and student dashboards. When a student is deleted, associated results, payments, invoices, attendance records, assignments, exam cards, enrollments, promotions, alumni records, CBT records, monitoring records, and linked account/photo metadata are cleaned up transactionally.

## 5. Staff and subject-account management

The staff directory supports staff profiles, roles, departments, phone numbers, email addresses, account status, photo management, profile editing, and filtered exports.

Administrators can create and manage staff login accounts, assign an academy role, activate or deactivate accounts, reset credentials, and link accounts to the appropriate person. Subject-account management provides separate credentials for each subject and section, with printable or CSV/Excel-compatible credential listings by section.

The subject assignment workflow allows an administrator to select a teacher or subject account, class, subject, session, and assignment scope. Assigned classes and subjects are shown clearly in the staff dashboard through a **Current upload scope** indicator.

## 6. Classes, subjects, sessions, and terms

The academic setup workspace supports class creation, subject creation, bilingual subject names, subject editing, subject archiving, class-subject assignments, academic sessions, and academic terms.

Subjects may have English and Arabic names. The portal includes English-to-Arabic assistance for missing Arabic subject names, a review or confidence indicator before saving, and terminology overrides for subjects such as Qur’an, Islamic Studies, and local-curriculum subjects.

Session and term records include the dates required by the school, including term ending and next-term beginning dates. CA sheets, result sheets, report cards, and examination cards read the selected session and term from the database.

## 7. Result entry and grading

Teachers and subject accounts can enter scores only within their assigned class-subject scope. Score-entry validation follows the section’s grading model:

| Section | First CA | Second CA | Third CA | Examination | Total |
|---|---:|---:|---:|---:|---:|
| Nursery and Primary | 20 | 20 | 20 | 40 | 100 |
| Junior and Senior | 10 | 10 | 10 | 70 | 100 |

The result workspace calculates totals, grades, averages, and class positions. Teacher uploads save directly to the database and immediately feed the applicable result, CA, and report workflows. The interface provides saving states, loading feedback, successful-save notifications, and confirmation before saving scores. There is no administrator approval queue required before a teacher’s saved score becomes available to the connected workflows.

The system supports published-result visibility for linked student and family accounts. A student sees only that student’s own published result, not another student’s result.

## 8. CA sheets

The CA Sheet is separate from the report/result card workflow and is intended for administrative printing. It can display the live student roster for a selected class, the selected session and term, bilingual subject information where applicable, and the latest score-update timestamp.

The printed CA workflow uses A4 output, places student names in the selected class, continues remaining names onto additional pages when necessary, hides navigation and administration menus during printing, and provides print-preview and PDF-saving controls. The teacher dashboard does not expose the administrator CA-sheet workspace.

## 9. Result sheets and report cards

The portal has distinct result layouts for Nursery, Primary, Junior, and Senior sections. Nursery and Primary use related report structures with different visual styling, while Junior and Senior use their own secondary-school layout.

The result workflow supports:

- Bilingual English and Arabic subject display.
- Automatic total, average, grade, and position calculation.
- Automatic teacher/coordinator comments based on class position where configured.
- Attendance totals and result status fields.
- Class-wide result preview and batch printing.
- PDF preview before printing.
- A4 print geometry and page-break protection.
- Manual class-teacher signature space.
- Automatic result visibility only for the linked student account after publication.

The earlier Result Template Studio was removed by request. The portal currently uses the established section-specific report layouts rather than the deleted drag-and-drop studio.

## 10. Examination cards

The examination-card workspace is available to administrators for secondary classes, including JSS1–JSS3 and SS1–SS3. Administrators can select the academic session, term, class, and student or use class/section-wide issuance.

Each examination card can contain the student’s name, admission/candidate number, passport photo, class, section, gender, session, term, examination title, examination date, venue, and the subjects assigned to that class. Subject timetable dates and times are entered beside each assigned subject and are saved with the card.

The current card-print workflow includes:

| Examination-card feature | Availability |
|---|---|
| Live subject rehydration from class assignments | Available |
| Per-subject examination date and time | Available |
| Single-student preview | Available |
| Class-wide batch issue | Available |
| Section-wide issue for Junior or Senior | Available |
| One-page A4 portrait layout | Available |
| Direct student-dashboard visibility | Available according to the current school policy |
| Student-dashboard Preview button | Available |
| Student-dashboard Download as PDF button | Available |
| School logo and school name | Available |
| Student photo linked from the ID-card profile | Available |
| Five configurable examination rules | Available |
| Manual Exam Officer signature line | Available |
| Uploaded signature image | Not used; the officer signs manually after printing |

The card layout now centers the English and Arabic school names, uses bold enlarged branding, enlarges the logo, gives timetable rows slightly more height, and places examination rules beside the timetable with a blank manual signature area. The lower page area remains intentionally open while the complete card stays on one A4 page.

## 11. Student and staff ID cards

The ID-card module supports portrait-oriented student cards with front and back designs. The card can include the school logo, school address and phone number, student photo, student name, class, admission number, and a QR code on the reverse side.

The ID-card editor supports drag-and-drop positioning, resize handles for photo, QR, logo, and text fields, font family, font weight, alignment, line-height controls, separate front/back previews, named design presets, undo/redo history, and direct field editing. Student and staff photos can be cropped before uploading. The student’s stored profile photo is reused in the ID-card and examination-card workflows.

## 12. Attendance

Administrators and authorized staff can select a class, load the live class roster, mark attendance for multiple students in one action, and view persistent attendance totals and statuses. The dashboard can show daily attendance summaries and attendance records are available to relevant family and student views where linked.

## 13. Assignments and learning workspace

Teachers can create assignments with a title, class, subject, instructions, due date, marks, and optional attachment. Learners and linked parents can view relevant assignment information, and the backend enforces that submissions belong to the correct linked student. Teachers can review submissions and record grades.

## 14. Fees, invoices, payments, and receipts

The finance workspace supports invoice records, student balances, payment recording, payment references, proof notes, bank-transfer status, verification and rejection, verified payment totals, and receipt generation.

Students can view fee information and submit payment records through the student dashboard where enabled. Verified payments can produce a branded downloadable or printable receipt containing receipt numbering and school-specific branding.

Bank transfer is supported as an operational workflow. Card/Paystack support is scaffolded, but protected server-side verification remains deferred until the required secret is configured. The accountant dashboard is focused on finance information, while administrator dashboards show school-wide student and staff totals.

## 15. CBT and JAMB practice

The portal includes a computer-based testing workflow with administrator question management and student examination interfaces. Administrators can generate questions with AI guidance, set question counts, provide optional topics or prescribed textbooks, review and edit generated questions, assign statuses such as draft, published, and active, and publish question sets.

The student CBT interface supports subject selection, multiple-choice questions with options A–D, timed examinations, score display, correct-answer review, explanations for missed questions, and past-attempt history. The current scoring model is **50 marks per subject**, with a maximum aggregate of **250 marks for five subjects**. Students may take subjects individually rather than being forced to take all five at once.

The CBT suite also includes class/subject/attempt performance analytics, aggregate ranking, class winners, winner badges, date/session filters, and printable winner reports. Monitoring features include camera and microphone status indicators, warning tracking, anti-cheat handling for minimizing or leaving the exam, termination after configured violations, fullscreen and connection-quality controls for administrator live monitoring, and administrator review of recorded monitoring media where browser permissions and storage are available.

## 16. Announcements, notifications, and gallery

The portal supports database-backed school announcements, publishing controls, recent school updates, a notification center with a bell icon, and filtering between read and unread notifications. It also supports school gallery records and administrator-managed school imagery.

## 17. PWA and mobile support

The website is responsive across desktop, tablet, and Android-sized screens. PWA support includes a web-app manifest, install guidance or a custom install action where the browser supports installation, mobile-oriented splash assets, and layouts designed for touch interaction.

Browser print settings still matter for PDF output. On Android, the print dialog should be set to **A4** rather than Letter, with portrait orientation where available.

## 18. Promotion, migration, and alumni

Administrators can move students between classes or academic stages, including bulk promotion workflows. Promotion history supports review and rollback with confirmation to prevent accidental reversal. Final-year students can be moved into an alumni record through the graduation workflow.

## 19. Data privacy and integrity controls

The portal uses server-side role checks, subject/class scope enforcement, linked-student privacy rules, transactional student deletion cleanup, active-session roster synchronization, and database-backed records across academic, finance, attendance, identity, examination, and CBT modules.

The current verification baseline includes 201 passing Vitest tests, successful TypeScript validation, a successful production build, and completed role-boundary and examination-card workflow checks.

## 20. Features intentionally removed or deferred

| Item | Current state |
|---|---|
| Student/parent report-card email delivery | Removed by request |
| Result Template Studio | Removed by request |
| Automatic exam-officer signature image | Removed; manual signing is required |
| Administrator approval before teacher scores update | Removed by request |
| Paystack server-side verification | Deferred until the protected secret is supplied |
| External paid email service dependency | Not required |

The platform is therefore ready for the core school-management workflows already implemented, while the deferred items can be revisited only if the school later supplies the necessary policy decisions, credentials, or operational requirements.
