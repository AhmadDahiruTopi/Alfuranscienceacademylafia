import { describe, expect, it } from "vitest";
import { hashPassword, normalizeUsername, verifyPassword } from "./localAuth";

describe("local staff authentication", () => {
  it("hashes and verifies passwords without storing plaintext", () => {
    const encoded = hashPassword("securepass123");
    expect(encoded).not.toContain("securepass123");
    expect(verifyPassword("securepass123", encoded)).toBe(true);
    expect(verifyPassword("wrongpass123", encoded)).toBe(false);
  });

  it("normalizes usernames consistently", () => {
    expect(normalizeUsername("  Teacher.One ")).toBe("teacher.one");
    expect(normalizeUsername("AFS- 300014")).toBe("afs-300014");
  });
});
