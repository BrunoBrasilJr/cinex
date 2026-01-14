"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { CatalogDraft, CatalogType } from "@/features/catalog/types";
import { GENRES } from "@/features/catalog/types";

export type ItemFormMode = "create" | "edit";

export type ItemFormProps = {
  mode: ItemFormMode;
  defaultValues: CatalogDraft;
  error: string | null;
  allowedTypes?: CatalogType[];
  onSubmit: (draft: CatalogDraft) => void;
  onCancel?: () => void;
};

export default function ItemForm({
  mode,
  defaultValues,
  error,
  allowedTypes = ["movie", "series"],
  onSubmit,
  onCancel,
}: ItemFormProps) {
  const [draft, setDraft] = useState<CatalogDraft>(defaultValues);

  const title = mode === "edit" ? "Editar item" : "Adicionar item";
  const subtitle =
    mode === "edit"
      ? "Edite e salve. O item será atualizado."
      : "Adicione um filme ou série. Isso ficará salvo no navegador.";

  const submitLabel = mode === "edit" ? "Salvar alterações" : "Adicionar";

  const typeOptions = useMemo(() => {
    return allowedTypes.map((type) => ({
      value: type,
      label: type === "movie" ? "Filme" : "Série",
    }));
  }, [allowedTypes]);

  const isTypeLocked = allowedTypes.length === 1;

  // ✅ dirty (pra Limpar e também pra Editar)
  const isDirty = useMemo(() => {
    return JSON.stringify(draft) !== JSON.stringify(defaultValues);
  }, [draft, defaultValues]);

  // ✅ validação leve pro botão Adicionar/Salvar
  const titleOk = useMemo(() => draft.title.trim().length >= 2, [draft.title]);
  const yearOk = useMemo(() => {
    if (!draft.year) return true; // vazio pode
    return /^\d{4}$/.test(draft.year);
  }, [draft.year]);

  // rating já vem como string "" | "1".."5"
  const ratingOk = useMemo(() => {
    if (!draft.rating) return true;
    return /^[1-5]$/.test(draft.rating);
  }, [draft.rating]);

  // ✅ regra final:
  // create: precisa ser válido + ter título
  // edit: precisa ser válido + ter mudanças (senão não faz sentido salvar)
  const canSubmit = useMemo(() => {
    const valid = titleOk && yearOk && ratingOk;
    if (!valid) return false;
    if (mode === "edit") return isDirty;
    return true;
  }, [titleOk, yearOk, ratingOk, mode, isDirty]);

  function handleClearAll() {
    setDraft(defaultValues);
  }

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
          <p className="text-xs text-zinc-400">{subtitle}</p>
        </div>

        <Button
          variant="ghost"
          type="button"
          onClick={handleClearAll}
          disabled={!isDirty}
        >
          Limpar
        </Button>
      </div>

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSubmit) return;
          onSubmit(draft);
        }}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-7">
            <label className="mb-1 block text-xs text-zinc-400">Título *</label>
            <Input
              value={draft.title}
              onChange={(e) =>
                setDraft((s) => ({ ...s, title: e.target.value }))
              }
              placeholder="Ex: Interestelar"
              maxLength={80}
            />
          </div>

          <div className="md:col-span-3">
            <label className="mb-1 block pl-3 text-xs text-zinc-400">
              Tipo
            </label>
            <Select
              value={draft.type}
              onChange={(e) =>
                setDraft((s) => ({ ...s, type: e.target.value as CatalogType }))
              }
              disabled={isTypeLocked}
              hideChevron={isTypeLocked}
            >
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>

            {isTypeLocked && (
              <p className="mt-1 text-xs text-zinc-500">
                Nesta página, o tipo é fixo.
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-xs text-zinc-400">Ano</label>
            <Input
              value={draft.year}
              onChange={(e) =>
                setDraft((s) => ({ ...s, year: e.target.value }))
              }
              placeholder="2014"
              inputMode="numeric"
              maxLength={4}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-3">
            <label className="mb-1 block pl-3 text-xs text-zinc-400">
              Avaliação
            </label>
            <Select
              value={draft.rating}
              onChange={(e) =>
                setDraft((s) => ({ ...s, rating: e.target.value }))
              }
            >
              <option value="">Sem avaliação</option>
              <option value="1">1 estrela</option>
              <option value="2">2 estrelas</option>
              <option value="3">3 estrelas</option>
              <option value="4">4 estrelas</option>
              <option value="5">5 estrelas</option>
            </Select>
          </div>

          <div className="md:col-span-9">
            <label className="mb-1 block pl-3 text-xs text-zinc-400">
              Gênero
            </label>
            <Select
              value={draft.genre}
              onChange={(e) =>
                setDraft((s) => ({ ...s, genre: e.target.value }))
              }
            >
              <option value="">Sem gênero</option>
              {GENRES.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-400">Notas</label>
          <Input
            value={draft.notes}
            onChange={(e) => setDraft((s) => ({ ...s, notes: e.target.value }))}
            placeholder="Ex: Assisti com a família / Recomendar pra alguém / etc."
            maxLength={120}
          />
        </div>

        {error && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button variant="ghost" type="button" onClick={onCancel}>
              Cancelar
            </Button>
          )}

          {/* ✅ AGORA SÓ ATIVA QUANDO FAZ SENTIDO */}
          <Button type="submit" variant="primary" disabled={!canSubmit}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
