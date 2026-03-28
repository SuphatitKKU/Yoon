"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navLinks = [
    { name: "หน้าแรก", path: "/", icon: "home" },
    { name: "สแกนดวง", path: "/analysis", icon: "center_focus_strong" },
    { name: "คำทำนาย", path: "/forecast", icon: "auto_awesome" },
    { name: "รายงาน", path: "/report", icon: "history_edu" },
  ];

  return (
    <nav className="flex md:hidden fixed bottom-0 left-0 w-full h-[60px] bg-surface dark:bg-on-background items-center justify-around z-[70] shadow-[0px_-2px_10px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
      {navLinks.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link
            key={link.path}
            href={link.path}
            className={`flex-1 flex flex-col items-center justify-center h-full gap-1 transition-all duration-300 ${
              isActive ? "text-primary" : "text-on-surface-variant hover:text-primary opacity-60 hover:opacity-100"
            }`}
          >
            <span
              className="material-symbols-outlined text-xl mb-0.5 transition-transform duration-300"
              style={{
                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                transform: isActive ? "scale(1.1)" : "scale(1)"
              }}
            >
              {link.icon}
            </span>
            <span className={`text-[9px] uppercase font-label tracking-wide ${isActive ? "font-bold" : ""}`}>
              {link.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
