import Container from "@/components/layout/Container";
import type { FilterType } from "@/features/catalog/types";
import CatalogPage from "@/features/catalog/components/CatalogPage";

type Props = {
  title: string;
  subtitle: string;
  initialFilterType: FilterType;
};

export default function CatalogShell({
  title,
  subtitle,
  initialFilterType,
}: Props) {
  return (
    <Container>
      <section className="flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-zinc-400">{subtitle}</p>
        </header>

        <CatalogPage initialFilterType={initialFilterType} />
      </section>
    </Container>
  );
}
