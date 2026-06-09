import StatCard from "./StatCard";

export default function StatsSection() {
  return (
    <div className="stat-grid">

      <StatCard
        label="Total spent"
        value="₹24,380"
        subtitle="18 expenses"
      />

      <StatCard
        label="This month"
        value="₹8,150"
        subtitle="June 2026"
      />

      <StatCard
        label="Average"
        value="₹1,354"
        subtitle="per transaction"
      />

      <StatCard
        label="Categories"
        value="5"
        subtitle="active"
      />

    </div>
  );
}