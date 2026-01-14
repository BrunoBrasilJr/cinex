"use client";

import PageFade from "@/components/layout/PageFade";
import CatalogShell from "@/features/catalog/components/CatalogShell";

export default function MoviesPage() {
  return (
    <PageFade>
      <CatalogShell
        title="Filmes"
        subtitle="Gerencie seu catálogo com foco em filmes (mas você pode cadastrar qualquer tipo)."
        initialFilterType="movie"
      />
    </PageFade>
  );
}
