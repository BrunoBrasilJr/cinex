import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-zinc-800/80 bg-zinc-950/70 backdrop-blur supports-backdrop-filter:bg-zinc-950/55">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-400">
          © {year} <span className="text-zinc-200">Cinéx</span>. Todos os
          direitos reservados.
        </p>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/"
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Filmes
          </Link>
          <Link
            href="/series"
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Séries
          </Link>
        </div>
      </div>
    </footer>
  );
}
