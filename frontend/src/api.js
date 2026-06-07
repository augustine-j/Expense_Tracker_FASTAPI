import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
const token = localStorage.getItem("token");

if (token){
    config.headers.Authorization = `Bearer ${token}`;
}

return config;
});

export async function signUp(username,password) {
    try {
        const response  = await api.post("/auth/",{
            username,
            password,
        });
    }
    catch (error) { 
        alert.error("Error signing up:",error);
        throw error;
    }

    return response.data;
}


export async function login(username,password){
    const formData = new FormData();
    formData.append("username",username);
    formData.append("password",password);

    try{
        const response = await api.post("/auth/token/",formData);
        return response.data;
    }
    catch (error){
        alert("Login failed. Please check your credentials and try again.",error);
        throw error;
    }
}

export async function getExpenses(){
    try{
        const response = await api.get("/expenses/");
        return response.data;
    }
    catch (error){
        alert("Failed to fetch Expenses.",error);
        throw error;
    }
}

export async function createExpense(expense){
    try{
        const response = await api.post("/expenses/",expense);
        return response.data;
    }
    catch (error){
        alert("failed to create expense.",error);
        throw error;
    }
}

export async function updateExpense(expenseId, expense){
    try{
        const response = await api.put(`/expenses/${expense_id}`,expense);
        return response.data;
    }

    catch (error){
        alert("Failed to update expense",error)
        throw error;
    }
}


export async function deleteExpense(expenseId){
    try{
        const response = await api.delete(`/expenses/${expenseId}`);
        return response.data;
    }
    catch (error){
        alert("Failed to delete expense",error)
        throw error;
    }
}

export default api;