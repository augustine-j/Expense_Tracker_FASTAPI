import { useState, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";
import EditExpense from "../components/EditExpense";
import { deleteExpense } from "../api";
import { getExpenses } from "../api";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const navigate = useNavigate();


  async function loadExpenses() {
    try {
      const data = await getExpenses();
      setExpenses(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load expenses. Please log in and try again.");
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  function handleEdit(expense) {
    setSelectedExpense(expense);
    setShowEditModal(true);
  }

  async function handleDelete(expense) {
    const confirmed = window.confirm(
      `Delete "${expense.expense_name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteExpense(expense.id);
      await loadExpenses();
    }
    catch (error) {
      console.error("Failed to delete expense", error);
    }
  }

  return (
    <>
      <ExpenseList
        expenses={expenses}
        onAdd={handleEdit}
        onEdit={handleEdit}
        onDelete={handleDelete}
        error={error}
      />

      {showEditModal && selectedExpense && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditExpense
              expense={selectedExpense}
              onClose={() => {
                setShowEditModal(false);
                setSelectedExpense(null);
              }}
              onSuccess={loadExpenses}

            />
          </div>
        </div>
      )}
    </>
  );
}
