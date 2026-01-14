import { Button } from "@/components/ui/Button";
import type { CatalogItem } from "@/features/catalog/types";
import { GENRES } from "@/features/catalog/types";

type Props = {
  item: CatalogItem;
  onEdit: () => void;
  onRemove: () => void;
};

function typeLabel(type: CatalogItem["type"]) {
  return type === "movie" ? "Filme" : "Série";
}

function genreLabel(value?: CatalogItem["genre"]) {
  if (!value) return null;
  return GENRES.find((g) => g.value === value)?.label ?? null;
}

function stars(rating?: CatalogItem["rating"]) {
  if (!rating) return null;
  return "★".repeat(rating);
}

export default function ItemCard({ item, onEdit, onRemove }: Props) {
  const gLabel = genreLabel(item.genre);
  const s = stars(item.rating);

  return (
    <article
      className={[
        "rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 shadow-sm",
        "transition-all duration-200",
        "hover:bg-zinc-900/55 hover:border-zinc-700 hover:shadow-md hover:-translate-y-1px",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="truncate text-base font-semibold">{item.title}</h4>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
            <span className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-1">
              {typeLabel(item.type)}
            </span>

            {typeof item.year === "number" ? (
              <span className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-1">
                {item.year}
              </span>
            ) : null}

            {gLabel ? (
              <span className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-1">
                {gLabel}
              </span>
            ) : null}

            {s ? (
              <span className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-1 text-amber-200/90">
                {s}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {item.notes ? (
        <p className="mt-3 line-clamp-3 text-sm text-zinc-200/90">
          {item.notes}
        </p>
      ) : (
        <p className="mt-3 text-sm text-zinc-400">Sem notas.</p>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onEdit}>
          Editar
        </Button>
        <Button variant="danger" onClick={onRemove}>
          Remover
        </Button>
      </div>
    </article>
  );
}
