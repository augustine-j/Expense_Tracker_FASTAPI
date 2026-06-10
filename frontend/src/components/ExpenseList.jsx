import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import ExpenseCard from "./ExpenseCard";

export default function ExpenseList({ expenses = [], onAdd, onEdit, onDelete, error }) {
  const total = expenses.reduce((sum, e) => sum + e.expense_amount, 0);
  const avg = expenses.length ? Math.round(total / expenses.length) : 0;

  return (
    <div className="body">
      <div className="topbar">
        <div className="logo">
          <span className="logo-dot">E</span>
          Expense Tracker
        </div>
        <button className="add-btn" type="button" onClick={onAdd}>
          <PlusCircle size={16} /> Add expense
        </button>
      </div>

      <div className="stat-grid">
        <div className="stat">
          <div className="stat-label">Total spent</div>
          <div className="stat-val">₹{total.toLocaleString("en-IN")}</div>
          <div className="stat-sub">All expenses</div>
        </div>
        <div className="stat">
          <div className="stat-label">Transactions</div>
          <div className="stat-val">{expenses.length}</div>
          <div className="stat-sub">Expense entries</div>
        </div>
        <div className="stat">
          <div className="stat-label">Average</div>
          <div className="stat-val">₹{avg.toLocaleString("en-IN")}</div>
          <div className="stat-sub">Per transaction</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Your expenses ({expenses.length})</div>

        {error ? (
          <div className="error-message">{error}</div>
        ) : expenses.length === 0 ? (
          <div className="empty-message">No expenses yet. Add one to get started.</div>
        ) : (
          <div className="expense-grid">
            {expenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
              >
                <ExpenseCard
                  expense={expense}
                  maxAmount={Math.max(...expenses.map((e) => e.expense_amount))}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
