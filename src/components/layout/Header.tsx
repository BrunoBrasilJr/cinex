import Container from "@/components/layout/Container";
import NavLink from "@/components/layout/NavLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800/70 bg-zinc-950/75 backdrop-blur">
      <Container className="py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <h1 className="text-base font-semibold tracking-tight">
              Cadastro de Filmes & Séries
            </h1>
            <p className="text-xs text-zinc-400">
              CRUD + Busca + Filtro + localStorage • Front-end only
            </p>
          </div>

          <nav className="flex items-center gap-2">
            <NavLink href="/" label="Home" />
            <NavLink href="/movies" label="Filmes" />
            <NavLink href="/series" label="Séries" />
          </nav>
        </div>
      </Container>
    </header>
  );
}
