import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;
const COST = 16384;
const BLOCK_SIZE = 8;
const PARALLELIZATION = 1;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, KEY_LENGTH, { N: COST, r: BLOCK_SIZE, p: PARALLELIZATION });
  return `scrypt$${COST}$${BLOCK_SIZE}$${PARALLELIZATION}$${salt}$${derived.toString("hex")}`;
}

export function verifyPassword(password: string, encoded: string) {
  const [algorithm, cost, blockSize, parallelization, salt, expectedHex] = encoded.split("$");
  if (algorithm !== "scrypt" || !cost || !blockSize || !parallelization || !salt || !expectedHex) return false;
  try {
    const expected = Buffer.from(expectedHex, "hex");
    const derived = scryptSync(password, salt, expected.length, { N: Number(cost), r: Number(blockSize), p: Number(parallelization) });
    return expected.length === derived.length && timingSafeEqual(expected, derived);
  } catch {
    return false;
  }
}

export function normalizeUsername(username: string) {
  // Credential sheets can wrap or insert visual spaces around compact usernames.
  // Remove whitespace only from the username; passwords remain exact and case-sensitive.
  return username.replace(/\s+/g, "").toLowerCase();
}
