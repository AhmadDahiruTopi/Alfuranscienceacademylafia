from pathlib import Path
import re

path = Path('/home/ubuntu/alfurqan-school-management/client/src/pages/Home.tsx')
source = path.read_text()
old_query = 'const invoicesQuery = trpc.school.invoices.useQuery(); const invoiceTotal ='
new_query = 'const invoicesQuery = trpc.school.invoices.useQuery(); const receiptSettingsQuery = trpc.school.schoolSettings.useQuery(); const invoiceTotal ='
if old_query not in source:
    raise SystemExit('student receipt settings query anchor not found')
source = source.replace(old_query, new_query, 1)
pattern = r'const printReceipt = \(payment: \(typeof studentPayments\)\[number\]\) => \{.*?\}; const assignmentInput'
replacement = '''const printReceipt = (payment: (typeof studentPayments)[number]) => { if (payment.status !== "verified") { toast.error("Receipts are available only after payment verification"); return; } openPaymentReceipt({ ...payment, studentName: linked?.name, admissionNo: linked?.admissionNo }, receiptSettingsQuery.data ?? defaultReceiptSettings); }; const assignmentInput'''
source, count = re.subn(pattern, replacement, source, count=1, flags=re.S)
if count != 1:
    raise SystemExit(f'student receipt renderer anchor replaced {count} times')
path.write_text(source)
print('Updated StudentDashboard receipt action')
