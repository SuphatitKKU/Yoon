import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  if (variant === "secondary") {
    return (
      <button
        className={`px-10 py-5 border border-secondary border-opacity-40 text-secondary hover:bg-secondary hover:bg-opacity-5 transition-all uppercase tracking-widest font-label ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`group relative px-12 py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold tracking-widest uppercase transition-all hover:scale-105 ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-1000"></div>
      {/* Mandarin Dots */}
      <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary"></div>
      <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary"></div>
    </button>
  );
}
