"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function getPortuguesePath(pathname: string) {
  if (pathname === "/") {
    return "/pt";
  }

  if (pathname.startsWith("/pt")) {
    return pathname;
  }

  return `/pt${pathname}`;
}

function getEnglishPath(pathname: string) {
  if (pathname === "/pt") {
    return "/";
  }

  if (pathname.startsWith("/pt/")) {
    return pathname.replace(/^\/pt/, "") || "/";
  }

  return pathname;
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isPortuguese = pathname.startsWith("/pt");

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <Link
        href={getEnglishPath(pathname)}
        className={
          isPortuguese
            ? "text-neutral-500 hover:text-neutral-950"
            : "text-neutral-950"
        }
      >
        EN
      </Link>

      <span className="text-neutral-300">|</span>

      <Link
        href={getPortuguesePath(pathname)}
        className={
          isPortuguese
            ? "text-neutral-950"
            : "text-neutral-500 hover:text-neutral-950"
        }
      >
        PT
      </Link>
    </div>
  );
}