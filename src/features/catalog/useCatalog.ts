"use client";

import { useEffect, useMemo, useReducer } from "react";
import type {
  CatalogDraft,
  CatalogItem,
  CatalogState,
  CatalogType,
  FilterGenre,
  FilterRating,
  FilterType,
  GenreValue,
  RatingValue,
} from "@/features/catalog/types";
import { GENRES } from "@/features/catalog/types";
import { loadCatalogItems, saveCatalogItems } from "@/features/catalog/catalogStorage";

type Action =
  | { type: "INIT"; payload: CatalogItem[] }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_FILTER_TYPE"; payload: FilterType }
  | { type: "SET_FILTER_RATING"; payload: FilterRating }
  | { type: "SET_FILTER_GENRE"; payload: FilterGenre }
  | { type: "ADD"; payload: CatalogItem }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "UPDATE"; payload: CatalogItem };

const initialState: CatalogState = {
  items: [],
  search: "",
  filterType: "all",
  filterRating: "all",
  filterGenre: "all",
};

function reducer(state: CatalogState, action: Action): CatalogState {
  switch (action.type) {
    case "INIT":
      return { ...state, items: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_FILTER_TYPE":
      return { ...state, filterType: action.payload };
    case "SET_FILTER_RATING":
      return { ...state, filterRating: action.payload };
    case "SET_FILTER_GENRE":
      return { ...state, filterGenre: action.payload };
    case "ADD":
      return { ...state, items: [action.payload, ...state.items] };
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) };
    case "UPDATE":
      return { ...state, items: state.items.map((i) => (i.id === action.payload.id ? action.payload : i)) };
    default:
      return state;
  }
}

function makeId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function isValidGenre(value: string): value is GenreValue {
  return GENRES.some((g) => g.value === value);
}

function toRating(value: string): RatingValue | undefined {
  const v = value.trim();
  if (!v) return undefined;
  const n = Number(v);
  if (Number.isNaN(n)) return undefined;
  if (n < 1 || n > 5) return undefined;
  return n as RatingValue;
}

function validateDraft(draft: CatalogDraft): { ok: true } | { ok: false; message: string } {
  if (!draft.title.trim()) return { ok: false, message: "Título é obrigatório." };
  if (draft.title.trim().length < 2) return { ok: false, message: "Título muito curto (mín. 2 caracteres)." };

  if (draft.year.trim()) {
    const yearNum = Number(draft.year);
    const currentYear = new Date().getFullYear();
    if (Number.isNaN(yearNum)) return { ok: false, message: "Ano inválido." };
    if (yearNum < 1888 || yearNum > currentYear + 2)
      return { ok: false, message: `Ano deve ficar entre 1888 e ${currentYear + 2}.` };
  }

  if (draft.rating.trim()) {
    const r = toRating(draft.rating);
    if (!r) return { ok: false, message: "Avaliação deve ser de 1 a 5." };
  }

  if (draft.genre.trim()) {
    if (!isValidGenre(draft.genre)) return { ok: false, message: "Gênero inválido." };
  }

  return { ok: true };
}

type UseCatalogReturn = {
  state: CatalogState;
  visibleItems: CatalogItem[];
  actions: {
    setSearch: (value: string) => void;
    setFilterType: (value: FilterType) => void;
    setFilterRating: (value: FilterRating) => void;
    setFilterGenre: (value: FilterGenre) => void;
    addItem: (draft: CatalogDraft) => { ok: true } | { ok: false; message: string };
    removeItem: (id: string) => void;
    updateItem: (id: string, draft: CatalogDraft) => { ok: true } | { ok: false; message: string };
  };
};

export function useCatalog(): UseCatalogReturn {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stored = loadCatalogItems();
    dispatch({ type: "INIT", payload: stored });
  }, []);

  useEffect(() => {
    saveCatalogItems(state.items);
  }, [state.items]);

  const visibleItems = useMemo(() => {
    const q = normalizeText(state.search);

    return state.items.filter((item) => {
      const matchSearch =
        q.length === 0 ||
        normalizeText(item.title).includes(q) ||
        normalizeText(item.notes ?? "").includes(q);

      const matchType = state.filterType === "all" ? true : item.type === state.filterType;
      const matchRating = state.filterRating === "all" ? true : item.rating === state.filterRating;
      const matchGenre = state.filterGenre === "all" ? true : item.genre === state.filterGenre;

      return matchSearch && matchType && matchRating && matchGenre;
    });
  }, [state.items, state.search, state.filterType, state.filterRating, state.filterGenre]);

  function setSearch(value: string) {
    dispatch({ type: "SET_SEARCH", payload: value });
  }

  function setFilterType(value: FilterType) {
    dispatch({ type: "SET_FILTER_TYPE", payload: value });
  }

  function setFilterRating(value: FilterRating) {
    dispatch({ type: "SET_FILTER_RATING", payload: value });
  }

  function setFilterGenre(value: FilterGenre) {
    dispatch({ type: "SET_FILTER_GENRE", payload: value });
  }

  function addItem(draft: CatalogDraft) {
    const validation = validateDraft(draft);
    if (!validation.ok) return validation;

    const now = Date.now();
    const year = draft.year.trim() ? Number(draft.year) : undefined;
    const rating = toRating(draft.rating);
    const genre = draft.genre.trim() ? (draft.genre as GenreValue) : undefined;

    const newItem: CatalogItem = {
      id: makeId(),
      title: draft.title.trim(),
      type: draft.type as CatalogType,
      year,
      notes: draft.notes.trim() || undefined,
      rating,
      genre,
      createdAt: now,
      updatedAt: now,
    };

    dispatch({ type: "ADD", payload: newItem });
    return { ok: true as const };
  }

  function removeItem(id: string) {
    dispatch({ type: "REMOVE", payload: { id } });
  }

  function updateItem(id: string, draft: CatalogDraft) {
    const validation = validateDraft(draft);
    if (!validation.ok) return validation;

    const existing = state.items.find((i) => i.id === id);
    if (!existing) return { ok: false as const, message: "Item não encontrado." };

    const year = draft.year.trim() ? Number(draft.year) : undefined;
    const rating = toRating(draft.rating);
    const genre = draft.genre.trim() ? (draft.genre as GenreValue) : undefined;

    const updated: CatalogItem = {
      ...existing,
      title: draft.title.trim(),
      type: draft.type,
      year,
      notes: draft.notes.trim() || undefined,
      rating,
      genre,
      updatedAt: Date.now(),
    };

    dispatch({ type: "UPDATE", payload: updated });
    return { ok: true as const };
  }

  return {
    state,
    visibleItems,
    actions: {
      setSearch,
      setFilterType,
      setFilterRating,
      setFilterGenre,
      addItem,
      removeItem,
      updateItem,
    },
  };
}

// ✅ compatibilidade: se em algum lugar você usar `import useCatalog from ...`
export default useCatalog;
