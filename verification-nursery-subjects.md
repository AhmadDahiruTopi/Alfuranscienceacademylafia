# Nursery subject verification

- The supplied Nursery template was applied with ten subjects: Qur’an, Tahzeeb, Arabic Skills (1), Arabic Skills (2), English Skills, Mathematical Skills, Social Habits, Physical Education, Creative Arts, and Handwriting.
- Every active Nursery class—NURSERY 1A, 1B, 2A, 2B, 3A, and 3B—now has 10 active class-subject rows.
- The live Results workspace switched to Nursery / NURSERY 1A and rendered the Nursery / Primary 20/20/20/40 scoring header.
- The subject selector rendered bilingual choices such as `QUR'AN · القرآن`, `TAHZEEB · التهذيب`, `ARABIC SKILLS (1) · مهارات العربية (1)`, and additional Nursery subjects.
- The administrator Subject accounts workspace loaded 56 active accounts and displayed compact usernames in the `AFS-<subject id>` style plus random initial passwords and saved class checkboxes.
- The final class-link refresh was applied directly from active class-subject rows after a slower repeat synchronization was stopped; the credential migration had already completed successfully with the compact/random format.
- TypeScript and all 135 Vitest tests passed after the code changes.
