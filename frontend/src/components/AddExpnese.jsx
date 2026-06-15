import { useEffect, useState } from "react";
import { createExpense } from "../api";
import { getCategories } from "../api";
import { useNavigate } from "react-router-dom";


function AddExpense({ onClose, onSuccess }) {

    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState("");
    const [expense_name, setExpense_name] = useState("");
    const [expense_amount, setExpense_amount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        loadCategories();
    }, []);


    async function loadCategories() {
        try {
            const data = await getCategories();
            setCategories(data);
        }
        catch (error) {
            console.error(error);
        }
    }


    async function handleExpense(e) {

        e.preventDefault();
        try {
            const expense = {
                category_id: Number(category_id),
                expense_name,
                expense_amount: Number(expense_amount),
                description,
                date
            };

            await createExpense(expense);

            setMessage("Expense Added");
            if (onSuccess) {
                onSuccess();
            }
            onClose();


        }

        catch (error) {
            console.error("Failed to Add expense!", error);
            setMessage("Failed to Add expense!")

        }
    }


    return (
        <div className="expense-form-container">
            <h2 className="expense-form-title">
                Add New Expense
            </h2>

            <form
                className="expense-form"
                onSubmit={handleExpense}
            >
                <div className="form-group">
                    <label>Category</label>

                    <select
                        value={category_id}
                        onChange={(e) =>
                            setCategoryId(e.target.value)
                        }
                    >
                        <option value="">
                            Select Category
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Expense Name</label>

                    <input
                        type="text"
                        placeholder="e.g. Lunch at Restaurant"
                        value={expense_name}
                        onChange={(e) =>
                            setExpense_name(e.target.value)
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Amount (₹)</label>

                    <input
                        type="number"
                        placeholder="0.00"
                        value={expense_amount}
                        onChange={(e) =>
                            setExpense_amount(e.target.value)
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        rows="3"
                        placeholder="Optional notes..."
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Date</label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Save Expense
                    </button>
                </div>
            </form>
        </div>
    );
}


export default AddExpense;