import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import SummaryCards from "./components/SummaryCards";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [editingExpense, setEditingExpense] =
    useState(null);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 fw-bold">
        💰 Expense Tracker Dashboard
      </h1>

      <div className="mb-4">
        <SummaryCards />
      </div>

      <div className="card shadow border-0 mb-4">
        <div className="card-body">
          <ExpenseChart />
        </div>
      </div>

      <div className="card shadow border-0 mb-4">
        <div className="card-body">
          <ExpenseForm
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />
        </div>
      </div>

      <div className="card shadow border-0">
        <div className="card-body">
          <ExpenseTable
            setEditingExpense={setEditingExpense}
          />
        </div>
      </div>
    </div>
  );
}

export default App;