import { Pencil, Trash2, Utensils, Car, HeartPulse, Smartphone, Zap, ShoppingBag, Plane, GraduationCap, HelpCircle, Tag } from "lucide-react";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getCategoryIcon(categoryName) {
  const name = categoryName?.toLowerCase() || "";
  if (name.includes("food") || name.includes("dining")) return <Utensils size={20} />;
  if (name.includes("transport") || name.includes("car")) return <Car size={20} />;
  if (name.includes("health") || name.includes("medical")) return <HeartPulse size={20} />;
  if (name.includes("phone") || name.includes("mobile")) return <Smartphone size={20} />;
  if (name.includes("utility") || name.includes("bills")) return <Zap size={20} />;
  if (name.includes("shopping")) return <ShoppingBag size={20} />;
  if (name.includes("travel")) return <Plane size={20} />;
  if (name.includes("education")) return <GraduationCap size={20} />;
  return <Tag size={20} />;
}

export default function ExpenseCard({ expense, maxAmount, onEdit, onDelete }) {
  const max = maxAmount ?? expense.expense_amount;
  const barPercent = Math.min((expense.expense_amount / (max || 1)) * 100, 100);

  return (
    <div className="expense-card">
      <div className="expense-card-top">
        <div className="expense-card-meta">
          <div className="expense-card-icon">
            {getCategoryIcon(expense.category_name)}
          </div>
          <div className="expense-card-details">
            <div className="expense-card-title">{expense.expense_name}</div>
            <div className="expense-card-subtitle">{expense.category_name}</div>
          </div>
        </div>
        <div className="expense-card-amount">₹{expense.expense_amount.toLocaleString("en-IN")}</div>
      </div>

      {expense.description && (
        <div className="expense-card-description">{expense.description}</div>
      )}

      <div className="expense-card-progress-group">
        <div className="expense-card-progress-label">
          <span>% of max spent</span>
          <span>{Math.round(barPercent)}%</span>
        </div>
        <div className="expense-card-progress-bar">
          <div className="expense-card-progress-fill" style={{ width: `${barPercent}%` }}></div>
        </div>
      </div>

      <div className="expense-card-footer">
        <div className="expense-card-date">Added {formatDate(expense.date)}</div>
        <div className="expense-card-actions">
          <button className="act" type="button" onClick={() => onEdit?.(expense)}>
            <Pencil size={14} />
          </button>
          <button className="act del" type="button" onClick={() => onDelete?.(expense)}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
