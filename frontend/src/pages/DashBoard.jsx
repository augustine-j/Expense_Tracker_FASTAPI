import Header from "../components/Header";
//import StatsSection from "../components/StatsSection";
//import CategoryChart from "../components/CategoryChart";
//import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
//import ActivityFeed from "../components/ActivityFeed";

import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <>
      <Header />

      <div className="body">

        

        <div className="row">

          <div>
           
            <ExpenseList />
          </div>

          

        </div>
      </div>
    </>
  );
}