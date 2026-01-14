"use client";

import React from "react";
import { cn } from "@/lib/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return (
    <div className="relative">
      {/* base */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 rounded-md
          bg-zinc-950/70
          border border-zinc-800/80
          shadow-sm shadow-black/25
        "
      />

      {/* glow suave */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 rounded-md
          ring-1 ring-white/0
          transition duration-150
        "
      />

      <input
        className={cn(
          "relative z-10 h-9 w-full rounded-md px-3 text-sm",
          "bg-transparent text-zinc-100 placeholder:text-zinc-500",
          "outline-none",
          "transition-colors duration-150",
          "hover:border-zinc-700/90",
          "focus:ring-2 focus:ring-cyan-300/15 focus:border-cyan-300/40",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
        {...props}
      />
    </div>
  );
}
