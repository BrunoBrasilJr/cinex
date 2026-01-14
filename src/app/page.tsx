import Container from "@/components/layout/Container";
import Link from "next/link";
import PageFade from "@/components/layout/PageFade";

export default function Page() {
  return (
    <PageFade>
      <Container>
        <section className="flex flex-col gap-6">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 shadow-sm shadow-black/20">
            <h2 className="text-xl font-semibold tracking-tight">
              Um catálogo simples, rápido e com UX decente.
            </h2>
            <p className="mt-2 text-sm text-zinc-300/80">
              Cadastre filmes e séries, use busca e filtros, edite e remova —
              tudo salvo no seu navegador.
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/movies"
                className="w-full sm:w-auto rounded-md border border-zinc-800/80 bg-zinc-950/60 px-3 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-900/70 hover:border-zinc-700 transition-colors duration-150"
              >
                Ir para Filmes →
              </Link>
              <Link
                href="/series"
                className="w-full sm:w-auto rounded-md border border-zinc-800/80 bg-zinc-950/60 px-3 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-900/70 hover:border-zinc-700 transition-colors duration-150"
              >
                Ir para Séries →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 shadow-sm shadow-black/20 transition-transform duration-150 hover:-translate-y-0.5 hover:border-zinc-700/90">
              <p className="text-sm font-semibold">CRUD completo</p>
              <p className="mt-1 text-sm text-zinc-300/80">
                Adicionar, editar e remover no front-end.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 shadow-sm shadow-black/20 transition-transform duration-150 hover:-translate-y-0.5 hover:border-zinc-700/90">
              <p className="text-sm font-semibold">Busca + filtros</p>
              <p className="mt-1 text-sm text-zinc-300/80">
                Encontre por texto e filtre por tipo.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 shadow-sm shadow-black/20 transition-transform duration-150 hover:-translate-y-0.5 hover:border-zinc-700/90">
              <p className="text-sm font-semibold">Persistência</p>
              <p className="mt-1 text-sm text-zinc-300/80">
                localStorage com proteção pra SSR.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </PageFade>
  );
}
