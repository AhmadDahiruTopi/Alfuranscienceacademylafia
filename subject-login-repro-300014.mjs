import { getUserByUsername, getDb } from "./server/db.ts";
import { verifyPassword } from "./server/localAuth.ts";
import { eq } from "drizzle-orm";
import { subjectAccounts } from "./drizzle/schema.ts";

const username = "AFS-300014";
const suppliedPassword = "X0CHSIYOMX";
const account = await getUserByUsername(username.toLowerCase());
const db = await getDb();
const subject = db
  ? (await db.select({ id: subjectAccounts.id, username: subjectAccounts.username, initialPassword: subjectAccounts.initialPassword, userId: subjectAccounts.userId, status: subjectAccounts.status }).from(subjectAccounts).where(eq(subjectAccounts.username, username)).limit(1))[0]
  : undefined;

console.log(JSON.stringify({
  subjectAccountFound: Boolean(subject),
  accountFound: Boolean(account),
  subjectUserId: subject?.userId ?? null,
  accountUserId: account?.id ?? null,
  subjectStatus: subject?.status ?? null,
  accountRole: account?.role ?? null,
  accountStatus: account?.accountStatus ?? null,
  storedPasswordLength: subject?.initialPassword?.length ?? null,
  suppliedPasswordLength: suppliedPassword.length,
  suppliedPasswordMatchesStoredText: subject?.initialPassword === suppliedPassword,
  suppliedPasswordMatchesHash: Boolean(account?.passwordHash && verifyPassword(suppliedPassword, account.passwordHash)),
  storedPasswordMatchesHash: Boolean(account?.passwordHash && subject?.initialPassword && verifyPassword(subject.initialPassword, account.passwordHash)),
}, null, 2));
