"use client";

import PageFade from "@/components/layout/PageFade";
import CatalogShell from "@/features/catalog/components/CatalogShell";

export default function SeriesPage() {
  return (
    <PageFade>
      <CatalogShell
        title="Séries"
        subtitle="Gerencie seu catálogo com foco em séries (mas você pode cadastrar qualquer tipo)."
        initialFilterType="series"
      />
    </PageFade>
  );
}
