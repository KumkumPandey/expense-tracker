import { useEffect, useState } from "react";
import API from "../services/api";

function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response = await API.get("/expenses");

        const sortedExpenses = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setExpenses(sortedExpenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    loadExpenses();
  }, []);

  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch =
      categoryFilter === "All" ||
      expense.category === categoryFilter;

    const dateMatch =
      (!startDate || expense.date >= startDate) &&
      (!endDate || expense.date <= endDate);

    return categoryMatch && dateMatch;
  });

  return (
    <div>
      <h2>Expenses</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Category: </label>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Start Date: </label>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label style={{ marginLeft: "10px" }}>
          End Date:
        </label>

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan="5">
                No expenses found
              </td>
            </tr>
          ) : (
            filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>

                <td>{expense.category}</td>

                <td>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(expense.amount)}
                </td>

                <td>{expense.note}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteExpense(expense.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;