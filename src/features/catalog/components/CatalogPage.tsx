"use client";

import { useMemo, useState } from "react";

import CatalogToolbar from "@/features/catalog/components/CatalogToolbar";
import ItemForm from "@/features/catalog/components/ItemForm";

import { useCatalogStore } from "@/features/catalog/store";
import { useToast } from "@/components/ui/toast/ToastProvider";

import type {
  CatalogDraft,
  CatalogItem,
  FilterGenre,
  FilterRating,
  FilterType,
  RatingValue,
} from "@/features/catalog/types";
import { normalizeText } from "@/lib/normalizeText";

type Props = {
  initialFilterType: FilterType; // "movie" | "series" | "all"
};

export default function CatalogPage({ initialFilterType }: Props) {
  const { toast } = useToast();

  const items = useCatalogStore((s) => s.items);
  const addItem = useCatalogStore((s) => s.addItem);
  const updateItem = useCatalogStore((s) => s.updateItem);
  const removeItem = useCatalogStore((s) => s.removeItem);

  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState<FilterRating>("all");
  const [filterGenre, setFilterGenre] = useState<FilterGenre>("all");

  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const q = normalizeText(search);

    return items
      .filter((item) => {
        if (initialFilterType !== "all" && item.type !== initialFilterType)
          return false;

        if (q) {
          const hay = normalizeText(`${item.title} ${item.notes ?? ""}`);
          if (!hay.includes(q)) return false;
        }

        if (filterRating !== "all" && item.rating !== filterRating)
          return false;
        if (filterGenre !== "all" && item.genre !== filterGenre) return false;

        return true;
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [items, initialFilterType, search, filterRating, filterGenre]);

  function handleClearFilters() {
    setSearch("");
    setFilterRating("all");
    setFilterGenre("all");
  }

  function handleEdit(item: CatalogItem) {
    setFormError(null);
    setEditing(item);
  }

  function handleCancelEdit() {
    setFormError(null);
    setEditing(null);
  }

  function handleRemove(id: string) {
    removeItem(id);
    toast({ title: "Removido", description: "Item removido do catálogo." });
  }

  function validateDraft(draft: CatalogDraft): string | null {
    if (!draft.title.trim()) return "Título é obrigatório.";
    if (draft.title.trim().length < 2) return "Título muito curto.";
    if (draft.year && !/^\d{4}$/.test(draft.year))
      return "Ano deve ter 4 dígitos.";
    if (draft.rating && !/^[1-5]$/.test(draft.rating))
      return "Avaliação inválida.";
    return null;
  }

  function handleSubmit(draft: CatalogDraft) {
    setFormError(null);

    const safeDraft: CatalogDraft = {
      ...draft,
      type: initialFilterType === "all" ? draft.type : initialFilterType,
    };

    const err = validateDraft(safeDraft);
    if (err) {
      setFormError(err);
      return;
    }

    const year = safeDraft.year ? Number(safeDraft.year) : undefined;
    const notes = safeDraft.notes?.trim() ? safeDraft.notes.trim() : undefined;
    const rating = safeDraft.rating
      ? (Number(safeDraft.rating) as RatingValue)
      : undefined;
    const genre = safeDraft.genre
      ? (safeDraft.genre as CatalogItem["genre"])
      : undefined;

    if (editing) {
      updateItem(editing.id, {
        title: safeDraft.title.trim(),
        type: safeDraft.type,
        year,
        notes,
        rating,
        genre,
      });

      toast({
        title: "Atualizado",
        description: "Item atualizado com sucesso.",
      });
      setEditing(null);
      return;
    }

    addItem({
      title: safeDraft.title.trim(),
      type: safeDraft.type,
      year,
      notes,
      rating,
      genre,
    });

    toast({ title: "Adicionado", description: "Item adicionado ao catálogo." });
  }

  return (
    <div className="flex flex-col gap-4">
      <ItemForm
        key={editing?.id ?? "new"}
        mode={editing ? "edit" : "create"}
        allowedTypes={
          initialFilterType === "all"
            ? ["movie", "series"]
            : [initialFilterType]
        }
        defaultValues={
          editing
            ? {
                title: editing.title,
                type: editing.type,
                year: editing.year ? String(editing.year) : "",
                notes: editing.notes ?? "",
                rating: editing.rating ? String(editing.rating) : "",
                genre: editing.genre ?? "",
              }
            : {
                title: "",
                type: initialFilterType === "all" ? "movie" : initialFilterType,
                year: "",
                notes: "",
                rating: "",
                genre: "",
              }
        }
        error={formError}
        onCancel={editing ? handleCancelEdit : undefined}
        onSubmit={handleSubmit}
      />

      <CatalogToolbar
        search={search}
        filterRating={filterRating}
        filterGenre={filterGenre}
        onSearchChange={setSearch}
        onFilterRatingChange={setFilterRating}
        onFilterGenreChange={setFilterGenre}
        onClear={handleClearFilters}
        count={filteredItems.length}
      />

      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-4">
        {filteredItems.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm font-semibold text-zinc-100">
              Nada por aqui… ainda.
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Cadastre itens acima ou ajuste os filtros.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-zinc-800/80 bg-zinc-950/30 p-4 transition-transform duration-150 hover:-translate-y-0.5 hover:border-zinc-700/90"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-100">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      {item.type === "movie" ? "Filme" : "Série"}
                      {item.year ? ` • ${item.year}` : ""}
                      {item.rating ? ` • ${"★".repeat(item.rating)}` : ""}
                      {item.genre ? ` • ${item.genre}` : ""}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="rounded-md border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-900/50 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="rounded-md border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-900/50 transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                </div>

                {item.notes ? (
                  <p className="mt-3 line-clamp-2 text-sm text-zinc-300/80">
                    {item.notes}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
