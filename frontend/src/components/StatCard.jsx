export default function StatCard({
  label,
  value,
  subtitle
}) {
  return (
    <div className="stat">
      <div className="stat-label">
        {label}
      </div>

      <div className="stat-val">
        {value}
      </div>

      <div className="stat-sub">
        {subtitle}
      </div>
    </div>
  );
}