# CA Sheet print verification notes

## Test 1 — exact 33 students

Live selected class: `NURSERY 3A`.

The authenticated CA Sheet endpoint returned the live roster, and the rendered CA Sheet contained exactly 33 student rows. The first rendered row was serial 1 (`ABDULGAFFAR MUHAMMAD ALIYU`) and the last rendered row was serial 33 (`ZUL-YADAIN SIRAJO UMAR`). The DOM contained zero `.ca-page-break` rows, confirming that the current break rule does not create a continuation break after exactly 33 students.

The interface showed `33 students in NURSERY 3A` after the query completed.

## Test 2 — exact 34 students

Live selected class changed to `NURSERY 2A`. The interface completed loading and showed `34 students in NURSERY 2A`. The DOM measurement for row count and break placement is the next verification step.

## Test 3 — selected class and subject

Selected live class: `NURSERY 1A`.

After loading, the interface showed `25 students in NURSERY 1A`, `3 subjects assigned`, and a persisted `Last updated` timestamp. The rendered CA Sheet header displayed the selected subject `QUR'AN`, the selected class `NURSERY 1A`, academic session `2026/2027`, and term `First Term`.

## Pagination verification result

A deterministic 33/34/66-row check passed without writing test records to the database:

| Roster size | Break rows | Page 1 | Page 2 |
|---:|---|---|---|
| 33 | none | 1–33 (33 rows) | none |
| 34 | before row 34 | 1–33 (33 rows) | 34 (1 row) |
| 66 | before row 34 | 1–33 (33 rows) | 34–66 (33 rows) |

The live selected-class preview for `NURSERY 1A` showed 25 students, 3 assigned subjects, subject `QUR'AN`, class `NURSERY 1A`, session `2026/2027`, term `First Term`, one academy logo, one watermark, and the toolbar marked `no-print`.

Clicking `Print / Save PDF` reached the native browser print flow; the automation call timed out because the native print dialog is outside the page DOM. No PDF was saved during this verification run.
