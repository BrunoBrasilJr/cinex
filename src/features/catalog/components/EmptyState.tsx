type Props = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/20 p-8 text-center">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>

      <div className="mt-6 text-xs text-zinc-500">
        ✅ Layout responsivo • ✅ Validação básica • ✅ Persistência local
      </div>
    </div>
  );
}
