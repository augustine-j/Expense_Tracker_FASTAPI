import {useEffect, useState} from 'react';
import { getCategories, updateExpense } from '../api';
import { useNavigate } from 'react-router-dom';
 
function EditExpense({onClose,onSuccess,expense}){

    const [categories,setCategories] = useState([]);
    const [category_id,setCategoryId] = useState("");
    const [expense_name,setExpense_name]=useState("");
    const [expense_amount,setExpense_amount] = useState("");
    const [description,setDescription] = useState("");
    const [date,setDate] = useState("");
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
        loadCategories();
    },[]);


    useEffect(()=>{
        if(expense){
            setCategoryId(expense.category_id ?? "");
            setExpense_name(expense.expense_name ?? "");
            setExpense_amount(expense.expense_amount ?? "");
            setDescription(expense.description ?? "");
            setDate(expense.date ?? "");
        }
    },[expense]);

    async function loadCategories(){

        try{
            const data= await getCategories();
            setCategories(data);
        }
        catch(error){

            console.error(error);
        }
    }


    async function editExpense(e){
        e.preventDefault();

        try{
            const expenseData = {
                category_id:Number(category_id),
                expense_name,
                expense_amount:Number(expense_amount),
                description,
                date
            };

            await updateExpense(expense.id,expenseData);
            setMessage("Expense Updated");
            
            if(onSuccess){
              await  onSuccess();
            }
            onClose();
        }




        catch(error){
            console.error("Failed to update expense!",error);
            setMessage("Failed to update expense!")
        }
    }


    return (
    <div className="expense-form-container">
      <h2 className="expense-form-title">Edit Expense</h2>

      <form className="expense-form" onSubmit={editExpense}>
        <div className="form-group">
          <label>Category</label>
          <select
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
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
            onChange={(e) => setExpense_name(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            placeholder="0.00"
            value={expense_amount}
            onChange={(e) => setExpense_amount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="3"
            placeholder="Optional notes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {message && <p className="form-message">{message}</p>}

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className="submit-btn">
            Update Expense
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditExpense;