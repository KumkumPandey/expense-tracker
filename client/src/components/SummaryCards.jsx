import { useEffect, useState } from "react";
import API from "../services/api";

function SummaryCards() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response = await API.get("/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error(error);
      }
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

  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category;

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    categoryTotals[category] += Number(expense.amount);
  });

  return (
    <div>
      <h2>Summary</h2>

      <p>
        <strong>Total Spent:</strong>{" "}
        ₹{totalSpent}
      </p>

      <p>
        <strong>Highest Expense:</strong>{" "}
        ₹{highestExpense}
      </p>

      <p>
        <strong>Total Transactions:</strong>{" "}
        {expenses.length}
      </p>

      <h3>Category Totals</h3>

      <ul>
        {Object.entries(categoryTotals).map(
          ([category, total]) => (
            <li key={category}>
              {category}: ₹{total}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default SummaryCards;