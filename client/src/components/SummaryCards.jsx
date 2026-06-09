import { useEffect, useState } from "react";
import API from "../services/api";

function SummaryCards() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      const response = await API.get("/expenses");
      setExpenses(response.data);
    };
    loadExpenses();
  }, []);

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((e) => Number(e.amount)))
      : 0;

  return (
    <div>
      <h2>Summary</h2>

      <p>Total Spent: ₹{totalSpent}</p>

      <p>Highest Expense: ₹{highestExpense}</p>

      <p>Total Transactions: {expenses.length}</p>
    </div>
  );
}

export default SummaryCards;