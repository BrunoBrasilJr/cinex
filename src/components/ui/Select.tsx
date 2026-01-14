"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type SelectOptionEl = React.ReactElement<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  "option"
>;

type Props = {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  children: React.ReactNode;

  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  hideChevron?: boolean;

  className?: string;
};

type Opt = {
  value: string;
  label: string;
  disabled?: boolean;
};

function isOptionElement(node: React.ReactNode): node is SelectOptionEl {
  return React.isValidElement(node) && node.type === "option";
}

export function Select({
  className,
  hideChevron,
  disabled,
  value,
  onChange,
  name,
  id,
  required,
  children,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const options = useMemo<Opt[]>(() => {
    const els = React.Children.toArray(children).filter(isOptionElement);
    return els.map((el) => {
      const v = String(el.props.value ?? "");
      const label = String(el.props.children ?? "");
      return { value: v, label, disabled: Boolean(el.props.disabled) };
    });
  }, [children]);

  const current = useMemo(() => {
    const v = String(value ?? "");
    return options.find((o) => o.value === v) ?? options[0] ?? null;
  }, [options, value]);

  const enabledOptions = useMemo(
    () => options.filter((o) => !o.disabled),
    [options]
  );

  const currentEnabledIndex = useMemo(() => {
    const v = current?.value ?? "";
    const idx = enabledOptions.findIndex((o) => o.value === v);
    return idx >= 0 ? idx : 0;
  }, [enabledOptions, current]);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(currentEnabledIndex);

  useEffect(() => {
    setActiveIndex(currentEnabledIndex);
  }, [currentEnabledIndex, open]);

  function close() {
    setOpen(false);
    setTimeout(() => buttonRef.current?.focus(), 0);
  }

  function openMenu() {
    if (disabled) return;
    setOpen(true);
    setTimeout(() => {
      const selected = listRef.current?.querySelector(
        `[data-value="${CSS.escape(current?.value ?? "")}"]`
      ) as HTMLElement | null;
      selected?.scrollIntoView({ block: "nearest" });
    }, 0);
  }

  function toggle() {
    if (disabled) return;
    setOpen((s) => !s);
  }

  function commit(nextValue: string) {
    onChange({ target: { value: nextValue } });
    close();
  }

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node | null;
      if (target && rootRef.current && !rootRef.current.contains(target))
        close();
    }
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;

    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openMenu();
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, enabledOptions.length - 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const opt = enabledOptions[activeIndex];
      if (opt) commit(opt.value);
    }
  }

  const hiddenValue = String(current?.value ?? "");

  return (
    <div ref={rootRef} className="relative">
      {name ? <input type="hidden" name={name} value={hiddenValue} /> : null}

      {/* base (igual Input) */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 rounded-md
          bg-zinc-950/70
          border border-zinc-800/80
          shadow-sm shadow-black/25
        "
      />

      {/* glow suave (igual Input) */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 rounded-md
          ring-1 ring-white/0
          transition duration-150
        "
      />

      <button
        ref={buttonRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-required={required || undefined}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className={cn(
          "relative z-10 h-9 w-full rounded-md px-3 pr-10 text-left text-sm",
          "bg-transparent text-zinc-100",
          "outline-none",
          "transition-colors duration-150",
          "hover:border-zinc-700/90",
          "focus:ring-2 focus:ring-cyan-300/15 focus:border-cyan-300/40",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
      >
        <span className="block truncate">{current?.label ?? ""}</span>

        {!hideChevron && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          className={cn(
            "absolute left-0 right-0 mt-2 z-50",
            "rounded-xl border border-zinc-800/80",
            "bg-zinc-950/95 backdrop-blur",
            "shadow-lg shadow-black/45"
          )}
        >
          <div className="max-h-64 overflow-auto py-1">
            {options.map((opt) => {
              const isSelected = String(current?.value ?? "") === opt.value;
              const isDisabled = Boolean(opt.disabled);
              const isActive =
                !isDisabled && enabledOptions[activeIndex]?.value === opt.value;

              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={isDisabled}
                  data-value={opt.value}
                  onMouseEnter={() => {
                    if (isDisabled) return;
                    const idx = enabledOptions.findIndex(
                      (o) => o.value === opt.value
                    );
                    if (idx >= 0) setActiveIndex(idx);
                  }}
                  onClick={() => {
                    if (isDisabled) return;
                    commit(opt.value);
                  }}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm",
                    "transition-colors",
                    isDisabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-zinc-900/65",
                    isSelected
                      ? "bg-zinc-900/75 text-zinc-100"
                      : "text-zinc-200",
                    isActive && "ring-1 ring-cyan-300/20"
                  )}
                >
                  <span className="block truncate">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
