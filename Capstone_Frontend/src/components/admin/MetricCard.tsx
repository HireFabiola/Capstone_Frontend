import type { MetricCardProps } from "../../types/MetricCard";

// MetricCard component to display a single metric with a title, value, and optional subtitle. It is styled with Tailwind CSS classes to create a card-like appearance.
const MetricCard = ({ title, value, subtitle }: MetricCardProps) => {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-3 text-3xl font-bold text-slate-950">{value}</p>

      {subtitle && (
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      )}
    </article>
  );
};

export default MetricCard;