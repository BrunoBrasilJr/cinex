"use client";

import { useMemo } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { FilterGenre, FilterRating } from "@/features/catalog/types";
import { GENRES } from "@/features/catalog/types";

type Props = {
  search: string;
  filterRating: FilterRating;
  filterGenre: FilterGenre;

  onSearchChange: (value: string) => void;
  onFilterRatingChange: (value: FilterRating) => void;
  onFilterGenreChange: (value: FilterGenre) => void;

  onClear: () => void;
  count?: number;
};

export default function CatalogToolbar({
  search,
  filterRating,
  filterGenre,
  onSearchChange,
  onFilterRatingChange,
  onFilterGenreChange,
  onClear,
  count,
}: Props) {
  const isDirty = useMemo(() => {
    return Boolean(search) || filterRating !== "all" || filterGenre !== "all";
  }, [search, filterRating, filterGenre]);

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-zinc-100">Filtros</h3>
          <p className="text-xs text-zinc-400">
            {typeof count === "number"
              ? `${count} item(ns)`
              : "Ajuste busca, avaliação e gênero."}
          </p>
        </div>

        {/* ✅ PADRÃO FINAL DO LIMPAR */}
        <Button
          variant="ghost"
          type="button"
          onClick={onClear}
          disabled={!isDirty}
        >
          Limpar
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="md:col-span-6">
          <label className="mb-1 block pl-3 text-xs text-zinc-400">Busca</label>
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título ou notas..."
          />
        </div>

        <div className="md:col-span-3">
          <label className="mb-1 block pl-3 text-xs text-zinc-400">
            Avaliação
          </label>
          <Select
            value={String(filterRating)}
            onChange={(e) => {
              const v = e.target.value;
              onFilterRatingChange(
                v === "all" ? "all" : (Number(v) as FilterRating)
              );
            }}
          >
            <option value="all">Todas</option>
            <option value="1">1 estrela</option>
            <option value="2">2 estrelas</option>
            <option value="3">3 estrelas</option>
            <option value="4">4 estrelas</option>
            <option value="5">5 estrelas</option>
          </Select>
        </div>

        <div className="md:col-span-3">
          <label className="mb-1 block pl-3 text-xs text-zinc-400">
            Gênero
          </label>
          <Select
            value={filterGenre}
            onChange={(e) => onFilterGenreChange(e.target.value as FilterGenre)}
          >
            <option value="all">Todos</option>
            {GENRES.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
