"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  CatalogItem,
  CatalogType,
  RatingValue,
} from "@/features/catalog/types";

type GenreValue = CatalogItem["genre"];

type NewItemInput = {
  title: string;
  type: CatalogType;
  year?: number; // ✅ undefined
  notes?: string; // ✅ undefined
  rating?: RatingValue; // ✅ undefined
  genre?: GenreValue; // ✅ undefined
};

type UpdateItemInput = Partial<NewItemInput>;

type CatalogState = {
  items: CatalogItem[];

  addItem: (input: NewItemInput) => void;
  updateItem: (id: string, input: UpdateItemInput) => void;
  removeItem: (id: string) => void;
};

function uid() {
  return (
    globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random())
  );
}

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (input) =>
        set((state) => {
          const now = Date.now();

          const newItem: CatalogItem = {
            id: uid(),
            createdAt: now,
            updatedAt: now,
            title: input.title,
            type: input.type,
            ...(input.year !== undefined ? { year: input.year } : {}),
            ...(input.notes !== undefined ? { notes: input.notes } : {}),
            ...(input.rating !== undefined ? { rating: input.rating } : {}),
            ...(input.genre !== undefined ? { genre: input.genre } : {}),
          };

          return { items: [newItem, ...state.items] };
        }),

      updateItem: (id, input) =>
        set((state) => {
          const now = Date.now();

          return {
            items: state.items.map((it) => {
              if (it.id !== id) return it;

              // ✅ aplica update e sempre atualiza updatedAt
              const next: CatalogItem = {
                ...it,
                ...input,
                updatedAt: now,
              };

              return next;
            }),
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((it) => it.id !== id),
        })),
    }),
    {
      name: "cinex.catalog.v1",
      version: 1,
    }
  )
);
