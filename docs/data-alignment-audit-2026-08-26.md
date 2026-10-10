# Legacy data-alignment audit

**Date:** 26 August 2026  
**System:** Alfurqan Science Academy Lafia School Management System  
**Audit mode:** Read-only database inspection

## Executive finding

A fresh read-only audit was completed against the live database. No records were deleted, rewritten, or otherwise mutated. The audit confirms that the earlier reference to “13 exceptions” was not a reliable record-level list. The current database evidence identifies **38 alignment anomalies requiring administrator review**, while the previously documented totals also include historical artifacts that are not safe to classify as deletable anomalies.

| Category | Current count | Interpretation | Recommended action |
|---|---:|---|---|
| Inactive user accounts linked to missing students | 33 | Historical inactive accounts reference student IDs that no longer exist | Reconcile account history first; do not bulk-delete automatically |
| Students using an unknown or inactive class | 1 | One student row uses a class name not matching an active academy class | Administrator should confirm the intended class before correction |
| Orphan result entries | 4 | Result rows reference missing student IDs | Preserve until the administrator confirms whether they are historical import artifacts |
| Orphan termly reports | 0 | No termly report currently references a missing student | No action required |
| Active users linked to missing students | 0 | No active login was found in this anomaly group | No urgent access-risk action identified |
| Class-subject teacher links unresolved against both staff and users | 0 | No assignment failed both identity checks in the current database | No action required under this audit rule |
| Orphan CBT attempts | 0 | All current CBT attempts resolve to existing students | No action required |
| Orphan CBT monitoring events | 0 | All current monitoring events resolve to existing attempts and students | No action required |
| Orphan CBT recordings | 0 | All current recordings resolve to existing attempts and students | No action required |

## Evidence and controls

The audit used left-join integrity checks between users and students, students and active academy classes, class subjects and staff/user identities, result entries and students, termly reports and students, and CBT history tables. The queries were read-only and returned no mutation statements. Existing safeguards remain active: future student imports reject header-like rows and unknown classes, student creation and updates reject unknown or inactive classes, and class-subject creation rejects unknown class IDs.

The earlier health report also noted historical header-shaped result and CBT rows. Those rows are not included in the orphan counts above because they require semantic review rather than a simple foreign-key test. They should remain preserved until an administrator can identify their origin and confirm that removal will not affect historical reporting.

## Administrator decision guide

The safest next step is to review each of the 38 identified records in an administrator-facing quarantine or review screen. For the 33 inactive account links, the administrator should first confirm that the accounts are no longer needed for historical login or audit purposes. For the one unknown-class student, the administrator should select the intended active class. For the four orphan result entries, the administrator should determine whether the student was deleted intentionally, imported under another identifier, or needs a historical data restoration process. Permanent cleanup should be performed only after those decisions are recorded.

## Outcome

The legacy alignment audit is complete and documented. **No live school data was changed.** Permanent normalization or deletion remains an administrator decision and should be handled as a separate, explicitly approved operation with a backup and a review log.

**Source:** Internal project health audit and read-only live database queries executed on 26 August 2026.
