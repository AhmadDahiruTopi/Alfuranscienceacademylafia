import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const manifest = readFileSync(new URL("../client/public/manifest.webmanifest", import.meta.url), "utf8");
const serviceWorker = readFileSync(new URL("../client/public/sw.js", import.meta.url), "utf8");
const bootstrap = readFileSync(new URL("../client/src/pwa.ts", import.meta.url), "utf8");
const mainSource = readFileSync(new URL("../client/src/main.tsx", import.meta.url), "utf8");
const appSource = readFileSync(new URL("../client/src/App.tsx", import.meta.url), "utf8");
const indexSource = readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const studentDbSource = readFileSync(new URL("./db.ts", import.meta.url), "utf8");
const dbSource = studentDbSource;
const routerSource = readFileSync(new URL("./routers.ts", import.meta.url), "utf8");
const homeSource = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
const notificationPolicy = readFileSync(new URL("../docs/notification-policy.md", import.meta.url), "utf8");
const templateSettingsSource = readFileSync(new URL("../shared/resultTemplate.ts", import.meta.url), "utf8");
const templateStudioSource = readFileSync(new URL("../client/src/pages/ResultTemplateStudio.tsx", import.meta.url), "utf8");

describe("Al-furqan PWA packaging", () => {
  it("contains installable academy branding and durable icons", () => {
    expect(manifest).toContain('"name": "Al-furqan Science Academy Lafia — School Portal"');
    expect(manifest).toContain('"display": "standalone"');
    expect(manifest).toContain('"scope": "/"');
    expect(manifest).toContain("alfurqan-icon-192_426176e9.png");
    expect(manifest).toContain("alfurqan-icon-512_2331fdbc.png");
    expect(indexSource).toContain('<link rel="manifest" href="/manifest.webmanifest" />');
    expect(indexSource).toContain('apple-mobile-web-app-capable');
    expect(indexSource).toContain('alfurqan-pwa-splash_0da39fbf.png');
    expect(indexSource).toContain('id="pwa-splash"');
    expect(indexSource).toContain('pwa-splash-copy');
  });

  it("registers the service worker only in production", () => {
    expect(mainSource).toContain("registerPwaServiceWorker");
    expect(bootstrap).toContain("!import.meta.env.PROD");
    expect(bootstrap).toContain('navigator.serviceWorker.register("/sw.js"');
  });

  it("never caches authenticated API or framework debug traffic", () => {
    expect(serviceWorker).toContain('url.pathname.startsWith("/api/")');
    expect(serviceWorker).toContain('url.pathname.startsWith("/__manus__")');
    expect(serviceWorker).toContain('request.method !== "GET"');
    expect(serviceWorker).toContain('caches.match("/")');
  });

  it("supports the branded startup splash transition", () => {
    expect(mainSource).toContain('getElementById("pwa-splash")');
    expect(mainSource).toContain('pwa-splash-hidden');
    expect(indexSource).toContain('role="status"');
  });

  it("keeps student gender explicit and filterable without inference", () => {
    expect(studentDbSource).toContain('gender?: "male" | "female" | "unspecified"');
    expect(studentDbSource).toContain('conditions.push(eq(students.gender, filters.gender))');
    expect(routerSource).toContain('gender: z.enum(["male", "female", "unspecified"]).default("unspecified")');
    expect(homeSource).toContain('aria-label="Filter students by gender"');
    expect(homeSource).toContain('Female students');
    expect(homeSource).toContain('Male students');
  });

  it("provides an offline status without replacing the live portal", () => {
    expect(appSource).toContain("function OfflineStatus()");
    expect(appSource).toContain("pwa-offline-notice");
    expect(appSource).toContain("live school data and exam monitoring require an internet connection");
  });

  it("supports an in-app install button and update handoff", () => {
    expect(bootstrap).toContain("beforeinstallprompt");
    expect(bootstrap).toContain("promptPwaInstall");
    expect(bootstrap).toContain("updateAvailable");
    expect(bootstrap).toContain('postMessage({ type: "SKIP_WAITING" })');
    expect(homeSource).toContain("Install app");
    expect(homeSource).toContain("Update available");
  });

  it("renders safe background push notifications and notification clicks", () => {
    expect(serviceWorker).toContain('self.addEventListener("push"');
    expect(serviceWorker).toContain("showNotification");
    expect(serviceWorker).toContain('self.addEventListener("notificationclick"');
    expect(serviceWorker).toContain("clients.openWindow");
  });

  it("uses published academy announcements as live inbox items", () => {
    expect(homeSource).toContain("NotificationCenter");
    expect(homeSource).toContain("trpc.school.announcements.useQuery");
    expect(homeSource).toContain("alfurqan-read-notifications");
    expect(homeSource).toContain("Mark all read");
    expect(homeSource).toContain("notification-filters");
    expect(homeSource).toContain('"unread"');
    expect(homeSource).toContain('"read"');
    expect(homeSource).toContain("showFallback");
    expect(homeSource).toContain("public-nav");
    expect(homeSource).toContain("Browser push remains opt-in and disabled until the school policy is approved.");
  });

  it("keeps the Primary result readable and branded for print", () => {
    const css = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");
    expect(css).toContain(".primary-report-sheet .nursery-report-table td");
    expect(css).toContain(".primary-report-sheet .nursery-report-header .arabic-title");
    expect(css).toContain(".primary-report-sheet .automatic-comment");
    expect(css).toContain(".primary-report-sheet .manual-signature-row");
    expect(css).toContain("@page { size: A4 portrait; margin: 0; }");
    expect(css).toContain("height: 297mm !important");
    expect(css).toContain("page-break-inside: avoid !important");
    expect(css).toContain("grid-template-columns: repeat(2, minmax(0, 1fr)) !important");
    expect(homeSource).toContain('className="arabic-title"');
  });

  it("uses fresh signed URLs and safe media fallback handling for administrator playback", () => {
    const jamb = readFileSync(new URL("./jamb.ts", import.meta.url), "utf8");
    const jambUi = readFileSync(new URL("../client/src/pages/JambPractice.tsx", import.meta.url), "utf8");
    const routers = readFileSync(new URL("./routers.ts", import.meta.url), "utf8");
    expect(jamb).toContain("storageGetSignedUrl(recording.storageKey)");
    expect(routers).toContain("adminJambRecordingPlayback");
    expect(jambUi).toContain("Preparing a secure playback URL");
    expect(jambUi).toContain("Your browser cannot play this video recording.");
    expect(jambUi).toContain("Your browser cannot play this audio recording.");
    expect(jambUi).toContain('recorder.addEventListener("stop"');
    expect(jambUi).toContain("recordingsStoppedRef");
    expect(jambUi).toContain("const attemptId = activeAttempt?.id;");
    expect(jambUi).toContain("return () => {");
    expect(jambUi).toContain("createPortal");
    expect(jambUi).toContain("studentJambRecording");
    expect(jambUi).toContain("refetchInterval: 5000");
    expect(jambUi).toContain("refetchOnWindowFocus: true");
    expect(jambUi).toContain("videoBitsPerSecond: 180_000");
    expect(jambUi).toContain("audioBitsPerSecond: 48_000");
    expect(jambUi).toContain("width: { ideal: 640, max: 640 }");
  });

  it("documents the policy gate before push permission or delivery", () => {
    expect(notificationPolicy).toContain("Status: Draft — requires approval");
    expect(notificationPolicy).toContain("Push permission is opt-in");
    expect(notificationPolicy).toContain("must not request permission");
  });

  it("keeps the result template studio connected to report rendering", () => {
    expect(templateSettingsSource).toContain('RESULT_TEMPLATE_SECTIONS = ["Nursery", "Primary", "Junior", "Senior"]');
    expect(templateSettingsSource).toContain("DEFAULT_RESULT_TEMPLATE_LAYOUT");
    expect(routerSource).toContain("resultTemplateLayouts: roleProcedure");
    expect(routerSource).toContain("updateResultTemplateEditor");
    expect(templateStudioSource).toContain("Result Template Studio");
    expect(homeSource).toContain('view: "ResultTemplateStudio"');
    expect(homeSource).toContain("ResultTemplateStudio");
    expect(templateStudioSource).toContain("updateResultTemplateEditor");
    expect(homeSource).toContain("trpc.school.resultTemplateLayouts.useQuery");
    expect(templateSettingsSource).toContain("APPROVED_RESULT_FONTS");
    expect(templateSettingsSource).toContain("watermarkOpacity");
    expect(homeSource).toContain("result-report-watermark");
    expect(homeSource).toContain("reportLayout.customHeader");
  });

  it("connects the administrator greeting and session chip to live settings", () => {
    expect(homeSource).toContain("trpc.school.schoolSettings.useQuery");
    expect(homeSource).toContain("trpc.school.academicSessions.useQuery");
    expect(homeSource).toContain("trpc.school.academicTerms.useQuery");
    expect(homeSource).toContain("dashboardGreeting");
    expect(homeSource).toContain("activeSession?.name");
    expect(homeSource).toContain("activeTerm?.name");
    expect(homeSource).toContain("session-date");
    expect(routerSource).toContain("dashboardGreeting: z.string().min(1).max(120)");
    expect(dbSource).toContain("dashboardGreeting: input.dashboardGreeting.trim()");
  });

  it("blocks malformed imports and unknown classes from creating new records", () => {
    expect(homeSource).toContain('CSV must include name and parentPhone columns');
    expect(homeSource).toContain('headerLike');
    expect(studentDbSource).toContain('Selected class does not exist or is inactive');
    expect(studentDbSource).toContain('assertActiveClassExists');
  });
});
