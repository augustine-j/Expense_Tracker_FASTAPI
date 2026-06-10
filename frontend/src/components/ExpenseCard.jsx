// src/components/ui/ExpenseCard.jsx
import { Pencil, Trash2, Utensils, Car, HeartPulse, Smartphone, Zap, ShoppingBag, Plane, GraduationCap, HelpCircle } from "lucide-react";

const CATEGORY_MAP = {
  1: { label: "Food & Drink", icon: <Utensils size={16} />, color: "#1D9E75" },
  2: { label: "Transport", icon: <Car size={16} />, color: "#378ADD" },
  3: { label: "Health", icon: <HeartPulse size={16} />, color: "#E24B4A" },
  4: { label: "Electronics", icon: <Smartphone size={16} />, color: "#8B5CF6" },
  5: { label: "Utilities", icon: <Zap size={16} />, color: "#F59E0B" },
  6: { label: "Shopping", icon: <ShoppingBag size={16} />, color: "#DB2777" },
  7: { label: "Travel", icon: <Plane size={16} />, color: "#38BDF8" },
  12: { label: "Education", icon: <GraduationCap size={16} />, color: "#F97316" },
};

const DEFAULT_CATEGORY = {
  label: "Other",
  icon: <HelpCircle size={16} />,
  color: "#64748B",
};

function getCategory(id) {
  return CATEGORY_MAP[id] ?? DEFAULT_CATEGORY;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ExpenseCard({ expense, maxAmount, onEdit, onDelete }) {
  const category = getCategory(expense.category_id);
  const max = maxAmount ?? expense.expense_amount;
  const barPercent = Math.min((expense.expense_amount / max) * 100, 100);

  return (
    <div className="expense-card">
      <div className="expense-card-top">
        <div className="expense-card-meta">
          <div className="expense-card-icon" style={{ background: category.color + "22", color: category.color }}>
            {category.icon}
          </div>
          <div className="expense-card-details">
            <div className="expense-card-title">{expense.expense_name}</div>
            <div className="expense-card-subtitle">{category.label}</div>
          </div>
        </div>
        <div className="expense-card-amount">₹{expense.expense_amount.toLocaleString("en-IN")}</div>
      </div>

      {expense.description && (
        <div className="expense-card-description">{expense.description}</div>
      )}

      <div className="expense-card-progress-group">
        <div className="expense-card-progress-bar">
          <div className="expense-card-progress-fill" style={{ width: `${barPercent}%`, background: category.color }} />
        </div>
        <div className="expense-card-progress-label">{expense.expense_amount.toLocaleString("en-IN")}</div>
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
