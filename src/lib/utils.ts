import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength - 1) + "…" : text;
}

export function formatDate({
  date,
  show = "full",
}: {
  date: Date | string;
  show?: "full" | "dateOnly";
}) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Senin
    year: "numeric", // 2025
    month: "long", // Juli
    day: "numeric", // 9
    timeZone: "Asia/Jakarta",
  };

  if (show === "full") {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.hour12 = false;
  }

  return new Date(date).toLocaleString("id-ID", options);
}

export function copyToClipboard(payload: any) {
  return navigator.clipboard.writeText(payload);
}
