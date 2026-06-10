import { useState } from "react";
import API from "../services/api";

function ExpenseForm({
  editingExpense,
  setEditingExpense,
}) {
  const [formData, setFormData] = useState(
    editingExpense
      ? {
          amount: editingExpense.amount,
          category: editingExpense.category,
          date: editingExpense.date,
          note: editingExpense.note,
        }
      : { amount: "", category: "Food", date: "", note: "" }
  );

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const today = new Date()
      .toISOString()
      .split("T")[0];

    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {
      setError(
        "Amount must be greater than 0"
      );
      return;
    }

    if (!formData.date) {
      setError("Please select a date");
      return;
    }

    if (formData.date > today) {
      setError(
        "Future dates are not allowed"
      );
      return;
    }

    try {
      if (editingExpense) {
        await API.put(
          `/expenses/${editingExpense.id}`,
          formData
        );

        alert("Expense Updated");

        setEditingExpense(null);
      } else {
        await API.post(
          "/expenses",
          formData
        );

        alert("Expense Added");
      }

      setFormData({
        amount: "",
        category: "Food",
        date: "",
        note: "",
      });

      window.location.reload();
    } catch (error) {
      console.error(error);

      setError(
        "Failed to save expense"
      );
    }
  };

  return (
  <form onSubmit={handleSubmit}>
    <h2 className="mb-4">
      {editingExpense
        ? "✏️ Edit Expense"
        : "➕ Add Expense"}
    </h2>

    {error && (
      <div className="alert alert-danger">
        {error}
      </div>
    )}

    <div className="mb-3">
      <label className="form-label">
        Amount
      </label>

      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={formData.amount}
        onChange={(e) =>
          setFormData({
            ...formData,
            amount: e.target.value,
          })
        }
      />
    </div>

    <div className="mb-3">
      <label className="form-label">
        Category
      </label>

      <select
        className="form-select"
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
          })
        }
      >
        <option value="Food">Food</option>
        <option value="Transport">
          Transport
        </option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">
          Entertainment
        </option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div className="mb-3">
      <label className="form-label">
        Date
      </label>

      <input
        type="date"
        className="form-control"
        value={formData.date}
        onChange={(e) =>
          setFormData({
            ...formData,
            date: e.target.value,
          })
        }
      />
    </div>

    <div className="mb-3">
      <label className="form-label">
        Note
      </label>

      <textarea
        className="form-control"
        rows="3"
        placeholder="Optional note"
        value={formData.note}
        onChange={(e) =>
          setFormData({
            ...formData,
            note: e.target.value,
          })
        }
      />
    </div>

    <button
      type="submit"
      className="btn btn-primary"
    >
      {editingExpense
        ? "Update Expense"
        : "Add Expense"}
    </button>

    {editingExpense && (
      <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={() => {
          setEditingExpense(null);

          setFormData({
            amount: "",
            category: "Food",
            date: "",
            note: "",
          });
        }}
      >
        Cancel
      </button>
    )}
  </form>
);
}

export default ExpenseForm;