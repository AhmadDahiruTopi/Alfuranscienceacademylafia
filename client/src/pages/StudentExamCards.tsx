import { useMemo, useState } from "react";
import { CalendarDays, Download, Eye, Printer } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { resolveStoredImageUrl } from "@/lib/utils";
import { getPortraitInitials, PortraitPlaceholder } from "@/components/PortraitPlaceholder";
import { ExamCard, StoredExamImage } from "@/pages/ExamCardsView";

type ExamSubject = { name?: string; arabicName?: string; date?: string; time?: string };

const DEFAULT_RULES = [
  "Arrive at least 30 minutes before the scheduled examination.",
  "Bring this examination card and approved writing materials.",
  "Mobile phones and unauthorized materials are prohibited.",
  "Do not communicate with another candidate during the examination.",
  "Follow all instructions from the examination officer.",
];

function readSubjects(card: any): ExamSubject[] {
  try {
    const parsed = JSON.parse(card.subjectsJson || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function toPrintDataUrl(url?: string | null) {
  if (!url || url.startsWith("data:")) return url;
  try {
    const response = await fetch(url, { credentials: "same-origin" });
    if (!response.ok) return url;
    const blob = await response.blob();
    const reader = new FileReader();
    await new Promise<void>((resolve, reject) => { reader.onload = () => resolve(); reader.onerror = () => reject(reader.error); reader.readAsDataURL(blob); });
    return typeof reader.result === "string" ? reader.result : url;
  } catch {
    return url;
  }
}

async function printApprovedCard(card: any, student: any, logo?: string, schoolName?: string | null, rules: string[] = DEFAULT_RULES, examOfficerSignature?: string | null, ictMisSignature?: string | null) {
  const popup = window.open("", "_blank", "width=900,height=1100");
  if (!popup) return toast.error("Allow pop-ups to preview or download your examination card");
  const subjects = readSubjects(card);
  const [logoUrl, studentPhotoUrl, examOfficerSignatureUrl, ictMisSignatureUrl] = await Promise.all([
    toPrintDataUrl(resolveStoredImageUrl(logo)),
    toPrintDataUrl(resolveStoredImageUrl(student.profileImageUrl, student.profileImageKey)),
    toPrintDataUrl(resolveStoredImageUrl(examOfficerSignature)),
    toPrintDataUrl(resolveStoredImageUrl(ictMisSignature)),
  ]);
  const rows = subjects.map((subject, index) => `<tr><td>${index + 1}</td><td>${subject.name ?? "—"}</td><td dir="rtl">${subject.arabicName ?? "—"}</td><td>${subject.date ?? "—"}</td><td>${subject.time ?? "—"}</td></tr>`).join("");
  const studentInitials = getPortraitInitials(student.name);
  popup.document.open();
  popup.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${card.examinationTitle}</title><style>@page{size:A4 portrait;margin:0}*{box-sizing:border-box}body{margin:0;background:#fff;color:#162044;font-family:Arial,sans-serif}.brand-lockup{display:flex;gap:12px;align-items:center;justify-content:center;text-align:center}.brand-lockup img{width:54px;height:54px;object-fit:contain}.sheet{width:210mm;height:297mm;min-height:297mm;max-height:297mm;padding:9mm;display:flex;flex-direction:column;gap:8px;overflow:hidden}.brand{display:flex;justify-content:center;align-items:center;position:relative;border-bottom:3px solid #4030a0;padding-bottom:8px;min-height:64px}.brand-copy{display:flex;flex-direction:column;align-items:center;gap:3px}.brand strong{font-size:13px;font-weight:800;letter-spacing:.04em}.brand small{display:block;color:#4030a0;font-size:18px;font-weight:900;line-height:1.15;margin:0}.brand .arabic-name{font-size:18px;font-weight:900}.brand .english-name{font-size:13px;font-weight:800}.brand .card-label{display:block;background:#4030a0;color:#fff;border-radius:999px;padding:5px 12px;font-size:10px;font-weight:800;margin-top:2px}.badge{display:none}.title{text-align:center;color:#24186e}.title h1{margin:0;font-size:20px}.title p{color:#68708b}.identity{display:grid;grid-template-columns:76px 1fr;gap:10px;background:#f3f1ff;border:1px solid #ded8ff;border-radius:10px;padding:8px}.photo{width:76px;height:92px;object-fit:cover;border-radius:8px;background:#dcd8f9}.details{display:grid;grid-template-columns:1fr 1fr;gap:5px}.detail{background:#fff;border:1px solid #d8d3f5;border-radius:6px;padding:4px 6px}.detail b,.detail span{display:block}.detail b{font-size:8px;text-transform:uppercase;color:#747b95}.detail span{font-size:9px;font-weight:bold;margin-top:2px;overflow-wrap:anywhere}.heading{color:#24186e;font-size:12px;margin:0}.lower-grid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(150px,.75fr);gap:10px;align-items:start}.timetable{width:100%;border-collapse:collapse;font-size:9px}.timetable th{background:#4030a0;color:#fff;text-align:left}.timetable th,.timetable td{border:1px solid #d9dcec;padding:5px 4px;line-height:1.15}.side-panel{display:flex;flex-direction:column;gap:14px}.rules{border:1px solid #d8d3f5;border-radius:8px;background:#faf9ff;padding:7px 8px;font-size:8px;line-height:1.15}.rules h2{font-size:10px;color:#24186e;margin:0 0 3px}.rules ol{margin:0;padding-left:18px}.signatures{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:20px}.signature{border-top:1px solid #d9dcec;padding-top:4px;display:flex;justify-content:flex-start;text-align:center;flex-shrink:0}.signature span{display:block;min-width:140px}.signature-line{border-bottom:1px solid #162044;height:22px}.signature-line img{display:block;width:140px;height:22px;object-fit:contain;margin:0 auto}.ict-signature{text-align:right}.ict-signature .signature-line{margin-left:auto}</style></head><body><main class="sheet"><header class="brand"><div class="brand-lockup">${logoUrl ? `<img src="${logoUrl}" alt="Academy logo">` : ""}<div class="brand-copy"><small class="arabic-name" dir="rtl">أكاديمية الفرقان للعلوم لافيا</small><strong class="english-name">${schoolName?.trim() || "AL-FURQAN SCIENCE ACADEMY LAFIA"}</strong><span class="card-label">EXAMINATION CARD</span></div></div></header><section class="title"><h1>${card.examinationTitle}</h1><p>${card.term} · ${card.session}</p></section><section class="identity"><div>${studentPhotoUrl ? `<img class="photo" src="${studentPhotoUrl}" alt="Student portrait">` : `<div class="photo photo-placeholder" aria-label="Portrait placeholder">${studentInitials || "<span aria-hidden=\"true\">&#128100;</span>"}</div>`}</div><div class="details"><div class="detail"><b>Student name</b><span>${student.name}</span></div><div class="detail"><b>Admission / candidate no.</b><span>${student.admissionNo}</span></div><div class="detail"><b>Class</b><span>${card.className}</span></div><div class="detail"><b>Section</b><span>${/JSS/i.test(card.className) ? "Junior" : "Senior"}</span></div><div class="detail"><b>Gender</b><span>${student.gender ?? "—"}</span></div><div class="detail"><b>Examination date</b><span>${card.examinationDate ? new Date(card.examinationDate).toLocaleDateString() : "As scheduled"}</span></div><div class="detail"><b>Venue</b><span>${card.venue || "Academy examination hall"}</span></div><div class="detail"><b>Candidate number</b><span>${student.admissionNo}</span></div></div></section><div class="lower-grid"><section><h2 class="heading">Examination timetable</h2><table class="timetable"><thead><tr><th>#</th><th>Subject</th><th>المادة</th><th>Date</th><th>Time</th></tr></thead><tbody>${rows || "<tr><td colspan=\"5\">No subjects listed.</td></tr>"}</tbody></table></section><aside class="side-panel"><section class="rules"><h2>Examination Rules &amp; Regulations</h2><ol>${rules.slice(0, 5).map(rule => `<li>${rule}</li>`).join("")}</ol></section><footer class="signatures"><span class="signature"><span><span class="signature-line">${examOfficerSignatureUrl ? `<img src="${examOfficerSignatureUrl}" alt="Exam Officer visual signature">` : ""}</span><b>${examOfficerSignatureUrl ? "Exam Officer" : "Sign manually"}</b></span></span><span class="signature ict-signature"><span><span class="signature-line">${ictMisSignatureUrl ? `<img src="${ictMisSignatureUrl}" alt="Head of ICT and MIS visual signature">` : ""}</span><b>Head of ICT/MIS</b><small>Ahmed Dahir Tobi</small></span></span></footer></aside></div></main></body></html>`);
  popup.document.close();
  popup.focus();
  window.setTimeout(async () => { const images = Array.from(popup.document.images); await Promise.all(images.map(image => image.complete ? image.decode?.().catch(() => undefined) : new Promise<void>(resolve => { image.addEventListener("load", () => resolve(), { once: true }); image.addEventListener("error", () => resolve(), { once: true }); }))); popup.print(); }, 450);
}

export default function StudentExamCards({ logo, schoolName }: { logo?: string; schoolName?: string | null }) {
  const cardsQuery = trpc.school.studentExamCards.useQuery();
  const settingsQuery = trpc.school.schoolSettings.useQuery();
  const [previewCardId, setPreviewCardId] = useState<number | null>(null);
  const rules = useMemo(() => {
    try {
      const parsed = JSON.parse(settingsQuery.data?.examinationRulesJson ?? "[]");
      return Array.isArray(parsed) && parsed.length === 5 && parsed.every(item => typeof item === "string") ? parsed : DEFAULT_RULES;
    } catch {
      return DEFAULT_RULES;
    }
  }, [settingsQuery.data?.examinationRulesJson]);
  return <section className="surface role-panel">
    <div className="section-heading-row"><div><h3 className="section-title">My examination cards</h3><p className="muted">Issued examination cards appear here automatically for your account unless an administrator hides them.</p></div><CalendarDays size={20} /></div>
    {cardsQuery.isLoading ? <p className="empty-state">Loading your examination cards…</p> : cardsQuery.isError ? <p className="empty-state">Your examination cards could not be loaded.</p> : cardsQuery.data?.length ? <div className="module-list">{cardsQuery.data.map(({ card, student }) => { const subjects = readSubjects(card); return <div className="module-row" key={card.id}><div className="table-person">{resolveStoredImageUrl(student.profileImageUrl, student.profileImageKey) ? <StoredExamImage className="table-avatar" src={resolveStoredImageUrl(student.profileImageUrl, student.profileImageKey)} alt="Student portrait" /> : <PortraitPlaceholder name={student.name} className="table-avatar" />}<div><b>{card.examinationTitle}</b><p>{card.className} · {card.term} · {card.session}</p><small className="muted">{student.admissionNo} · Examination card</small></div></div><div className="button-row"><button className="filter-button" onClick={() => setPreviewCardId(previewCardId === card.id ? null : card.id)}><Eye size={14} /> {previewCardId === card.id ? "Close preview" : "Preview"}</button><button className="primary-button" onClick={() => { void printApprovedCard(card, student, logo, schoolName, rules, settingsQuery.data?.examOfficerSignatureUrl, settingsQuery.data?.ictMisSignatureUrl); }}><Download size={14} /> Download as PDF</button></div>{previewCardId === card.id && <div className="student-exam-card-preview"><div className="student-exam-card-preview-title"><Printer size={15} /> PDF-ready preview</div><p>This is the populated examination card preview. Confirm the details below before printing or saving as PDF.</p><ExamCard logo={logo} schoolName={schoolName} student={student} session={card.session} term={card.term} title={card.examinationTitle} date={String(card.examinationDate ?? "")} venue={card.venue || ""} subjects={subjects.map(subject => ({ name: subject.name || "", arabicName: subject.arabicName, date: subject.date, time: subject.time }))} examOfficerSignature={settingsQuery.data?.examOfficerSignatureUrl} ictMisSignature={settingsQuery.data?.ictMisSignatureUrl} rules={rules} /><button className="filter-button" onClick={() => { void printApprovedCard(card, student, logo, schoolName, rules, settingsQuery.data?.examOfficerSignatureUrl, settingsQuery.data?.ictMisSignatureUrl); }}><Download size={14} /> Download as PDF</button></div>}</div>; })}</div> : <div className="empty-state">No examination card has been issued for your account yet.</div>}
  </section>;
}
