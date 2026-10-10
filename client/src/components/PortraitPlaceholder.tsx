import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

type PortraitPlaceholderProps = {
  name?: string | null;
  className?: string;
};

export function getPortraitInitials(name?: string | null) {
  const value = name?.trim();
  if (!value) return "";
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Consistent, privacy-safe fallback used anywhere a portrait is unavailable. */
export function PortraitPlaceholder({ name, className }: PortraitPlaceholderProps) {
  const letters = getPortraitInitials(name);
  return (
    <span className={cn("portrait-placeholder", className)} role="img" aria-label="Portrait placeholder">
      {letters ? <span aria-hidden="true">{letters}</span> : <UserRound aria-hidden="true" strokeWidth={1.8} />}
    </span>
  );
}
