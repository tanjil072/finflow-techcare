import type { ReactNode } from "react";

interface DashboardChartSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const DashboardChartSection = ({
  title,
  description,
  children,
}: DashboardChartSectionProps) => {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold text-slate-900">{title}</h2>
      {description && (
        <p className="mb-3 text-sm text-slate-500">{description}</p>
      )}
      <div className="h-72">{children}</div>
    </article>
  );
};
