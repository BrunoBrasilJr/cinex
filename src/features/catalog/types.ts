export type CatalogType = "movie" | "series";

export const GENRES = [
  { value: "action", label: "Ação" },
  { value: "comedy", label: "Comédia" },
  { value: "drama", label: "Drama" },
  { value: "scifi", label: "Ficção Científica" },
  { value: "horror", label: "Terror" },
  { value: "romance", label: "Romance" },
  { value: "thriller", label: "Suspense" },
  { value: "animation", label: "Animação" },
  { value: "documentary", label: "Documentário" },
  { value: "fantasy", label: "Fantasia" },
] as const;

export type GenreValue = (typeof GENRES)[number]["value"];
export type RatingValue = 1 | 2 | 3 | 4 | 5;

export type CatalogItem = {
  id: string;
  title: string;
  type: CatalogType;
  year?: number;
  notes?: string;

  rating?: RatingValue;
  genre?: GenreValue;

  createdAt: number;
  updatedAt: number;
};

export type FilterType = "all" | CatalogType;
export type FilterRating = "all" | RatingValue;
export type FilterGenre = "all" | GenreValue;

export type CatalogState = {
  items: CatalogItem[];
  search: string;

  filterType: FilterType;
  filterRating: FilterRating;
  filterGenre: FilterGenre;
};

export type CatalogDraft = {
  title: string;
  type: CatalogType;
  year: string;
  notes: string;

  rating: string; // form
  genre: string; // form
};
