import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolve a stored image reference for both in-app rendering and standalone
 * print windows. A relative /manus-storage path is valid in the app, but it
 * resolves against about:blank when markup is copied into a PDF print popup.
 * Prefer the persisted key so older URL values are normalized consistently.
 */
export function resolveStoredImageUrl(url?: string | null, key?: string | null): string | undefined {
  const normalizedKey = key?.trim().replace(/^\/+/, "");
  const candidate = normalizedKey ? `/photo-assets/${normalizedKey}` : url?.trim();
  if (!candidate) return undefined;
  if (/^https?:\/\//i.test(candidate)) return candidate;
  if (typeof window === "undefined") return candidate;
  const resolved = new URL(candidate, window.location.origin);
  // Storage responses previously used a redirect and some mobile browsers
  // cached the failed image result. A stable cache-buster forces the browser
  // to retry the native image request after the same-origin proxy is repaired.
  if (resolved.pathname.startsWith("/photo-assets/")) resolved.searchParams.set("v", "image-proxy-v3");
  return resolved.toString();
}
