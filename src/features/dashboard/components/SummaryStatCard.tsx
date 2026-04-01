interface SummaryStatCardProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export const SummaryStatCard = ({
  label,
  value,
  valueClassName = "text-slate-900",
}: SummaryStatCardProps) => {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${valueClassName}`}>{value}</p>
    </article>
  );
};
