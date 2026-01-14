"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type Props = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="relative inline-flex items-center px-1 text-base sm:text-sm font-medium text-zinc-300 transition-colors hover:text-zinc-100"
    >
      <span className="leading-none">{label}</span>

      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 right-0 h-2px rounded-full bg-cyan-300/90"
          transition={{ type: "spring", stiffness: 520, damping: 32 }}
        />
      )}
    </Link>
  );
}
