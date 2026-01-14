import type { ToastItem } from "@/components/ui/toast/useToast";
import { cn } from "@/lib/cn";

type Props = {
  toasts: ToastItem[];
  onClose: (id: string) => void;
};

function variantStyles(variant: ToastItem["variant"]) {
  switch (variant) {
    case "success":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-100";
    case "error":
      return "border-red-500/30 bg-red-500/10 text-red-100";
    case "info":
    default:
      return "border-zinc-700 bg-zinc-900/60 text-zinc-100";
  }
}

export default function ToastViewport({ toasts, onClose }: Props) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-[min(92vw,360px)] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "rounded-lg border p-3 shadow-sm backdrop-blur",
            "transition-opacity duration-150",
            variantStyles(t.variant)
          )}
          role={t.variant === "error" ? "alert" : "status"}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-5">{t.title}</p>
              {t.description ? (
                <p className="mt-1 text-sm text-zinc-200/80">{t.description}</p>
              ) : null}
            </div>

            <button
              onClick={() => onClose(t.id)}
              className="rounded-md border border-zinc-700/70 bg-zinc-950/30 px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800 transition-colors duration-150"
              aria-label="Fechar notificação"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
