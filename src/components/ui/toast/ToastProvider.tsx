"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type ToastInput = {
  title: string;
  description?: string;
};

type ToastItem = ToastInput & {
  id: string;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function toast(input: ToastInput) {
    const id =
      globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random());
    const item: ToastItem = { id, ...input };

    setToasts((prev) => [item, ...prev].slice(0, 3));

    // auto-dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }

  const value = useMemo(() => ({ toast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* viewport */}
      <div className="fixed bottom-4 right-4 z-60 flex w-[320px] max-w-[calc(100vw-2rem)] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-3 shadow-lg shadow-black/30 backdrop-blur"
          >
            <p className="text-sm font-semibold text-zinc-100">{t.title}</p>
            {t.description ? (
              <p className="mt-1 text-xs text-zinc-300/80">{t.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
