import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className, ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-150 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 " +
    "disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-fuchsia-400/20 via-zinc-900/0 to-cyan-300/20 border border-zinc-700 " +
      "text-zinc-50 hover:border-zinc-600 hover:bg-zinc-900/40",

    secondary:
      "bg-zinc-900/50 border border-zinc-800 text-zinc-100 hover:bg-zinc-900/70 hover:border-zinc-700",

    // ✅ ghost mais aparente (perfeito pro “Limpar”)
    ghost:
      "border border-zinc-700/90 bg-zinc-950/35 text-zinc-100 " +
      "hover:bg-zinc-900/55 hover:border-zinc-600 " +
      "active:bg-zinc-900/70",

    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={cn(base, variants[variant], "h-9 px-3", className)}
      {...props}
    />
  );
}
