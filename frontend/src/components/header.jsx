import { Wallet, Plus } from "lucide-react";

export default function Header(){
    return (
        <div className="topbar">
            <div className="logo">
                <div className="logo-dot">
                    <Wallet size={14} />
                </div>
                Expense Tracker
            </div>
            <button className="add-btn">
                <Plus size={14} />
                Add Expense
            </button>
        </div>
    );
}