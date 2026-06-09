import { useEffect, useState } from "react";
import { getExpenses } from "../api";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <p>Loading expenses...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-title">
        All Expenses
      </div>

      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        expenses.map((expenses) => (
          <ExpenseItem
            key={expenses.id}
            expenses={expenses}
          />
        ))
      )}

      <div className="tfoot">
        <span>
          Showing {expenses.length} expenses
        </span>

        <span>
          ₹
          {expenses
            .reduce(
              (sum, expense) =>
                sum + expense.expense_amount,
              0
            )
            .toLocaleString()}
        </span>
      </div>
    </div>
  );
}