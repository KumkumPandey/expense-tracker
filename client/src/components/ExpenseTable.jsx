import { useEffect, useState } from "react";
import API from "../services/api";

function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await API.get("/expenses");

    const sortedExpenses = response.data.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setExpenses(sortedExpenses);
  };

  return (
    <div>
      <h2>Expenses</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
              <td>₹{expense.amount}</td>
              <td>{expense.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;