import { useState } from "react";
import API from "../services/api";

function ExpenseForm() {
  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const today = new Date().toISOString().split("T")[0];

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    if (!formData.category) {
      setError("Please select a category");
      return;
    }

    if (!formData.date) {
      setError("Please select a date");
      return;
    }

    if (formData.date > today) {
      setError("Future dates are not allowed");
      return;
    }

    try {
      await API.post("/expenses", formData);

      alert("Expense Added");

      setFormData({
        amount: "",
        category: "Food",
        date: "",
        note: "",
      });
    } catch (error) {
  console.error(error);
  setError("Failed to add expense");
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) =>
          setFormData({
            ...formData,
            amount: e.target.value,
          })
        }
      />

      <br />
      <br />

      <select
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
          })
        }
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>

      <br />
      <br />

      <input
        type="date"
        value={formData.date}
        onChange={(e) =>
          setFormData({
            ...formData,
            date: e.target.value,
          })
        }
      />

      <br />
      <br />

      <input
        placeholder="Note"
        value={formData.note}
        onChange={(e) =>
          setFormData({
            ...formData,
            note: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button type="submit">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;