export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-surface-border bg-surface/60 px-4 py-12 text-center sm:rounded-3xl sm:px-6 sm:py-16">
      <p className="text-lg font-bold text-foreground sm:text-xl">{title}</p>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
