import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Photo workflows", () => {
  const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
  const db = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
  const idCards = readFileSync(resolve(process.cwd(), "client/src/pages/IdCardsView.tsx"), "utf8");
  const examCards = readFileSync(resolve(process.cwd(), "client/src/pages/ExamCardsView.tsx"), "utf8");
  const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
  const utils = readFileSync(resolve(process.cwd(), "client/src/lib/utils.ts"), "utf8");
  const storageProxy = readFileSync(resolve(process.cwd(), "server/_core/storageProxy.ts"), "utf8");
  const placeholder = readFileSync(resolve(process.cwd(), "client/src/components/PortraitPlaceholder.tsx"), "utf8");

  it("exposes validated student and staff photo upload controls from edit workflows", () => {
    expect(home).toContain("student-intake-form");
    expect(home).toContain("Add or replace photo");
    expect(home).toContain("uploadStudentPhoto(file)");
    expect(home).toContain("uploadStaffPhoto(file)");
    expect(home).toContain('accept="image/jpeg,image/png,image/webp"');
    expect(home).toContain("setSelectedId(row.id)");
    expect(home).toContain("setSelected(account.id)");
    expect(db).toContain("updateStudentPhoto");
    expect(db).toContain("updateStaffAccountPhoto");
  });

  it("renders student and staff portraits in their signed-in portal surfaces", () => {
    expect(home).toContain("user?.profileImageUrl");
    expect(home).toContain("student-portal-identity");
    expect(home).toContain("linked?.profileImageUrl");
    expect(css).toContain(".profile-avatar img");
    expect(css).toContain(".student-portal-photo img");
  });

  it("passes student portraits into report-card preview and print output", () => {
    expect(home).toContain("nursery-report-student-photo");
    expect(home).toContain("reportStudent.profileImageUrl");
    expect(home).toContain('alt="Student portrait"');
    expect(css).toContain(".nursery-report-student-photo img");
    expect(css).toContain("@media print { .nursery-report-student-photo");
    expect(css).toContain("grid-template-columns:1.1in minmax(0,1fr) 1.1in");
    expect(css).toContain("grid-column:3; grid-row:1");
  });

  it("keeps examination cards and ID cards connected to the same stored student portrait", () => {
    expect(idCards).toContain("profileImageUrl");
    expect(examCards).toContain("student.profileImageUrl");
    expect(home).toContain("StudentExamCards logo={logo}");
  });

  it("normalizes stored image paths for standalone print documents", () => {
    expect(utils).toContain("export function resolveStoredImageUrl");
    expect(utils).toContain("new URL(candidate, window.location.origin)");
    expect(home).toContain("resolveStoredImageUrl(reportStudent.profileImageUrl, reportStudent.profileImageKey)");
    expect(idCards).toContain("resolveStoredImageUrl(student.profileImageUrl, student.profileImageKey)");
    expect(examCards).toContain("resolveStoredImageUrl(student.profileImageUrl, student.profileImageKey)");
  });

  it("streams stored images from the same origin instead of redirecting to CloudFront", () => {
    expect(storageProxy).toContain("const imageResp = await fetch(url)");
    expect(storageProxy).toContain("Buffer.from(await imageResp.arrayBuffer())");
    expect(storageProxy).toContain('res.set("Content-Type", contentType)');
    expect(storageProxy).toContain('app.get("/photo-assets/*", serveStoredImage)');
    expect(storageProxy).not.toContain("res.redirect(307, url)");
  });

  it("uses one privacy-safe portrait placeholder across profile, report, ID, and exam cards", () => {
    expect(placeholder).toContain("export function PortraitPlaceholder");
    expect(placeholder).toContain('aria-label="Portrait placeholder"');
    expect(home).toContain("<PortraitPlaceholder name={profileQuery.data.student.name} />");
    expect(home).toContain("<PortraitPlaceholder name={linked?.name ?? user.name} />");
    expect(home).toContain("<PortraitPlaceholder name={reportStudent.name} />");
    expect(idCards).toContain("<PortraitPlaceholder name={record.name} />");
    expect(examCards).toContain("<PortraitPlaceholder name={student.name} />");
    expect(css).toContain(".portrait-placeholder");
  });

  it("replaces a broken stored image with the shared placeholder instead of leaving a broken-image icon", () => {
    expect(examCards).toContain("const [failed, setFailed] = useState(false)");
    expect(examCards).toContain("if (failed) return <PortraitPlaceholder");
    expect(examCards).toContain("onError={event => { setFailed(true)");
  });
  it("keeps a normalized photo catalog synchronized with uploads and exposes it to administrators", () => {
    const schema = readFileSync(resolve(process.cwd(), "drizzle/schema.ts"), "utf8");
    const routers = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");
    expect(schema).toContain('mysqlTable("photoAssets"');
    expect(db).toContain("upsertPhotoAsset");
    expect(db).toContain("removePhotoAsset");
    expect(routers).toContain("photoDatabase: adminProcedure.query");
    expect(routers).toContain("targetType: \"student\"");
    expect(routers).toContain("targetType: \"staff\"");
    expect(home).toContain("Photo database");
    expect(home).toContain("photo-database-grid");
    expect(home).toContain("trpc.school.photoDatabase.useQuery()");
    expect(utils).toContain("/photo-assets/");
  });
});
