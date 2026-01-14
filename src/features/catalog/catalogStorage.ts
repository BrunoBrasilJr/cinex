import type { CatalogItem } from "@/features/catalog/types";
import { storageGet, storageSet } from "@/lib/safeStorage";

const STORAGE_KEY = "catalog_v1_items";

export function loadCatalogItems(): CatalogItem[] {
  const data = storageGet<CatalogItem[]>(STORAGE_KEY);
  if (!data) return [];
  if (!Array.isArray(data)) return [];
  return data;
}

export function saveCatalogItems(items: CatalogItem[]) {
  storageSet(STORAGE_KEY, items);
}
