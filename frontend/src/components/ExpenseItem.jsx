import { Pencil, Trash2 } from "lucide-react";

export default function ExpenseItem({ expenses }) {
  const categoryColors = {
    Food: "#1D9E75",
    Transport: "#378ADD",
    Shopping: "#D4537E",
    Health: "#E24B4A",
    Utilities: "#BA7517",
  };

  const color =
    categoryColors[expenses.category_id?.category_name] ||
    "#6B7280";

  return (
    <div className="expense-row">
      <div
        className="dot"
        style={{ background: color }}
      />

      <div className="exp-info">
        <div className="exp-title">
          {expenses.expense_name}
        </div>

        <div className="exp-meta">
          {expenses.category_id?.category_name} •{" "}
          {new Date(expenses.date).toLocaleDateString()}
        </div>
      </div>

      <div className="exp-amt">
        ₹{expenses.expense_amount}
      </div>

      <div className="action-btns">
        <button className="act">
          <Pencil size={14} />
        </button>

        <button className="act del">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}