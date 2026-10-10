import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const idCardSource = readFileSync(resolve(projectRoot, "client/src/pages/IdCardsView.tsx"), "utf8");
const routerSource = readFileSync(resolve(projectRoot, "server/routers.ts"), "utf8");
const dbSource = readFileSync(resolve(projectRoot, "server/db.ts"), "utf8");
const schemaSource = readFileSync(resolve(projectRoot, "drizzle/schema.ts"), "utf8");
const cssSource = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const resultStudioSource = readFileSync(resolve(projectRoot, "client/src/pages/ResultTemplateStudio.tsx"), "utf8");


describe("directory and ID-card workflows", () => {
  it("keeps subject editing, individual class editing, and bulk migration controls available", () => {
    expect(homeSource).toContain("Save subject changes");
    expect(homeSource).toContain("promoteStudents");
    expect(homeSource).toContain("Move ${promotionSelectedIds.length");
    expect(routerSource).toContain("updateStudent:");
    expect(routerSource).toContain("promoteStudents:");
  });

  it("stores student and staff image references without storing image bytes in SQL", () => {
    expect(schemaSource).toContain("profileImageUrl: text(\"profileImageUrl\")");
    expect(schemaSource).toContain("profileImageKey: text(\"profileImageKey\")");
    expect(routerSource).toContain("updateStudentPhoto:");
    expect(routerSource).toContain("updateStaffAccountPhoto:");
    expect(routerSource).toContain("storagePut(`student-profiles/");
    expect(routerSource).toContain("storagePut(`staff-profiles/");
    expect(dbSource).toContain("updateStaffAccountPhoto");
    expect(homeSource).toContain("Add or replace a photo after CSV import");
    expect(homeSource).toContain("Add or replace a photo after registering the staff account");
    expect(homeSource).toContain("removeStudentPhoto");
    expect(homeSource).toContain("removeStaffPhoto");
    expect(homeSource).toContain("Photo change history");
    expect(routerSource).toContain("studentPhotoAudit:");
    expect(routerSource).toContain("staffPhotoAudit:");
    expect(dbSource).toContain("photoAuditLogs");
    expect(schemaSource).toContain("export const photoAuditLogs");
  });

  it("provides administrator-only branded student and staff ID-card preview and print actions", () => {
    expect(homeSource).toContain('activeView === "IdCards" && user?.role === "admin"');
    expect(homeSource).toContain('{ label: "ID cards"');
    expect(idCardSource).toContain("Branded ID cards");
    expect(idCardSource).toContain("Student cards");
    expect(idCardSource).toContain("Staff cards");
    expect(idCardSource).toContain("Print / Save PDF");
    expect(idCardSource).toContain("academy-id-card");
    expect(idCardSource).toContain('import QRCode from "qrcode"');
    expect(idCardSource).toContain("academy-id-card-front");
    expect(idCardSource).toContain("academy-id-card-back");
    expect(idCardSource).toContain("QRCode.toDataURL");
    expect(idCardSource).toContain("idCardSignatureUrl");
    expect(homeSource).toContain("updateIdCardSignature");
    expect(routerSource).toContain("updateIdCardSignature:");
    expect(routerSource).toContain("school-settings/");
    expect(idCardSource).toContain("waitForPrintAssets");
    expect(cssSource).toContain("height: 86mm");
    expect(idCardSource).toContain("portrait");
    expect(idCardSource).toContain("ID-card design settings");
    expect(idCardSource).toContain("updateIdCardConfig");
    expect(idCardSource).toContain("backInstructions");
    expect(idCardSource).toContain("showQr");
    expect(idCardSource).toContain("showSignature");
    expect(routerSource).toContain("updateIdCardConfig:");
    expect(dbSource).toContain("updateIdCardConfig");
    expect(schemaSource).toContain("idCardConfig: text(\"idCardConfig\")");
    expect(idCardSource).toContain("Visual card editor");
    expect(idCardSource).toContain("editorSide");
    expect(idCardSource).toContain("draggable");
    expect(idCardSource).toContain("contentEditable");
    expect(idCardSource).toContain("printCardsNow");
    expect(idCardSource).toContain("window.open(\"\", \"_blank\"");
    expect(idCardSource).toContain("source.outerHTML");
    expect(idCardSource).toContain("Allow pop-ups to print the ID card as PDF");
    expect(idCardSource).toContain("backPositions");
    expect(resultStudioSource).toContain("beginResize");
    expect(resultStudioSource).toContain("onPointerDown");
    expect(resultStudioSource).toContain("pointermove");
    expect(resultStudioSource).toContain("pointerup");
    expect(resultStudioSource).toContain("result-editor-resize");
    expect(cssSource).toContain("touch-action:none");
  });
});
