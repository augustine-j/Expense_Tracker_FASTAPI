import { useState, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";
import { getExpenses } from "../api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadExpenses() {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load expenses. Please log in and try again.");
      }
    }
    loadExpenses();
  }, []);

  function handleEdit(expense) {
    console.log("edit", expense);
  }

  function handleDelete(expense) {
    console.log("delete", expense);
  }

  return (
    <ExpenseList
      expenses={expenses}
      onAdd={() => console.log("open add modal")}
      onEdit={handleEdit}
      onDelete={handleDelete}
      error={error}
    />
  );
}
