"use client";

import Link from "next/link";
import NavLink from "@/components/layout/NavLink";

export default function Navigation() {
  return (
    <nav className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur supports backdrop-filter:bg-zinc-950/55">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center">
        {/* Nome do site */}
        <Link
          href="/"
          className="text-lg sm:text-base font-semibold leading-none tracking-wide text-zinc-100 transition-colors hover:text-white"
        >
          Cinéx
        </Link>

        <div className="sm:flex-1" />

        {/* Links: wrap no mobile, direita no desktop */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:flex-nowrap sm:justify-end sm:gap-8">
          <NavLink href="/" label="Home" />
          <NavLink href="/movies" label="Filmes" />
          <NavLink href="/series" label="Séries" />
        </div>
      </div>
    </nav>
  );
}
