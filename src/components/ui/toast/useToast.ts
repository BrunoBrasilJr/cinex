export type ToastVariant = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  createdAt: number;
};

export type ToastInput = Omit<ToastItem, "id" | "createdAt">;

export function makeToastId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
