"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "หน้าแรก", path: "/" },
    { name: "สแกนดวง", path: "/analysis" },
    { name: "คำทำนาย", path: "/forecast" },
    { name: "รายงาน", path: "/report" },
  ];

  return (
    <header className="hidden md:flex fixed top-0 w-full justify-center md:justify-between items-center px-6 md:px-8 py-4 bg-surface/90 backdrop-blur-md z-[60] shadow-[0px_2px_10px_rgba(0,0,0,0.02)] border-b border-surface-variant/20">
      <div className="flex items-center gap-2 md:w-1/3 justify-center md:justify-start">
        <Link href="/">
          <span className="text-xl md:text-2xl font-bold text-primary uppercase tracking-tighter">
            โหงวเฮ้งยุคใหม่
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 items-center justify-center md:w-1/3">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              className={`font-headline font-bold text-lg tracking-wide transition-colors ${
                isActive
                  ? "text-primary border-b-2 border-secondary pb-1"
                  : "text-on-surface-variant hover:text-primary"
              }`}
              href={link.path}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Empty spacer block to maintain flex center for Desktop exactly like before */}
      <div className="hidden md:block md:w-1/3"></div>
    </header>
  );
}
