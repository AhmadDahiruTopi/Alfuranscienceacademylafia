import fs from "node:fs";

const path = "/home/ubuntu/alfurqan-school-management/client/src/pages/Home.tsx";
let source = fs.readFileSync(path, "utf8");

source = source.replace(
  'const defaultReceiptSettings = { schoolName: "Alfurqan Science Academy Lafia", schoolAddress: "Behind GSS Lafia East Secondary School, Lafia.", schoolPhone: "", receiptHeader: "Official verified payment receipt", receiptFooter: "Keep this receipt for your records.", receiptPrefix: "AFSAL-RCPT" };',
  'const defaultReceiptSettings = { schoolName: "Alfurqan Science Academy Lafia", schoolAddress: "Behind GSS Lafia East Secondary School, Lafia.", schoolPhone: "", receiptHeader: "Official verified payment receipt", receiptFooter: "Keep this receipt for your records.", receiptPrefix: "AFSAL-RCPT", dashboardGreeting: "GOOD DAY" };'
);
source = source.replace(
  'const receiptSettingsQuery = trpc.school.schoolSettings.useQuery(); const [receiptBranding, setReceiptBranding] = useState({ schoolName: "Alfurqan Science Academy Lafia", schoolAddress: "", schoolPhone: "", receiptHeader: "Official verified payment receipt", receiptFooter: "Keep this receipt for your records.", receiptPrefix: "AFSAL-RCPT" });',
  'const receiptSettingsQuery = trpc.school.schoolSettings.useQuery(); const [receiptBranding, setReceiptBranding] = useState({ schoolName: "Alfurqan Science Academy Lafia", schoolAddress: "", schoolPhone: "", receiptHeader: "Official verified payment receipt", receiptFooter: "Keep this receipt for your records.", receiptPrefix: "AFSAL-RCPT", dashboardGreeting: "GOOD DAY" });'
);
source = source.replaceAll(
  'setReceiptBranding({ schoolName: settings.schoolName, schoolAddress: settings.schoolAddress, schoolPhone: settings.schoolPhone, receiptHeader: settings.receiptHeader, receiptFooter: settings.receiptFooter, receiptPrefix: settings.receiptPrefix })',
  'setReceiptBranding({ schoolName: settings.schoolName, schoolAddress: settings.schoolAddress, schoolPhone: settings.schoolPhone, receiptHeader: settings.receiptHeader, receiptFooter: settings.receiptFooter, receiptPrefix: settings.receiptPrefix, dashboardGreeting: settings.dashboardGreeting ?? "GOOD DAY" })'
);
const settingsMarker = '</div><div className="button-row mt-4"><button className="primary-button" disabled={saveReceiptBranding.isPending || receiptSettingsQuery.isLoading}';
if (!source.includes(settingsMarker)) throw new Error("School Settings save marker not found");
source = source.replace(settingsMarker, '</div><label>Dashboard greeting<input maxLength={120} value={receiptBranding.dashboardGreeting} onChange={event => setReceiptBranding(current => ({ ...current, dashboardGreeting: event.target.value }))} placeholder="e.g. GOOD DAY" /></label><div className="button-row mt-4"><button className="primary-button" disabled={saveReceiptBranding.isPending || receiptSettingsQuery.isLoading}');
const queryMarker = 'const announcementsQuery = trpc.school.announcements.useQuery(undefined, { enabled: Boolean(user) });';
if (!source.includes(queryMarker)) throw new Error("Home query marker not found");
source = source.replace(queryMarker, `${queryMarker} const schoolSettingsQuery = trpc.school.schoolSettings.useQuery(undefined, { enabled: Boolean(user) }); const activeSessionsQuery = trpc.school.academicSessions.useQuery(undefined, { enabled: Boolean(user) }); const activeTermsQuery = trpc.school.academicTerms.useQuery(undefined, { enabled: Boolean(user) }); const activeSession = activeSessionsQuery.data?.find(item => item.status === "active") ?? activeSessionsQuery.data?.[0]; const activeTerm = activeTermsQuery.data?.find(item => item.status === "active") ?? activeTermsQuery.data?.[0]; const dashboardGreeting = schoolSettingsQuery.data?.dashboardGreeting?.trim() || "GOOD DAY"; const [today] = useState(() => new Date());`);
source = source.replace('{activeView === "Overview" ? "GOOD DAY" : activeView}', '{activeView === "Overview" ? dashboardGreeting : activeView}');
source = source.replace('2026 / 2027 · First Term', '{activeSession?.name ?? "No active session"} · {activeTerm?.name ?? "No active term"}');
source = source.replace('<p className="session-label">Current session</p><p className="session-value">{activeSession?.name ?? "No active session"} · {activeTerm?.name ?? "No active term"}</p>', '<p className="session-label">Current session</p><p className="session-value">{activeSession?.name ?? "No active session"} · {activeTerm?.name ?? "No active term"}</p><p className="session-date">{today.toLocaleDateString()}</p>');
fs.writeFileSync(path, source);
console.log("Integrated configurable greeting and live academic session display.");
