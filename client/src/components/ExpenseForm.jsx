import { useState, useMemo } from "react";
import API from "../services/api";

function ExpenseForm({
  editingExpense,
  setEditingExpense,
}) {
  const initialData = useMemo(() => ({
    amount: editingExpense?.amount || "",
    category: editingExpense?.category || "",
    customCategory: "",
    date: editingExpense?.date || "",
    note: editingExpense?.note || "",
  }), [editingExpense]);

  const [formData, setFormData] = useState(initialData);

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

    if (!formData.category) {
      setError(
        "Please select a category"
      );
      return;
    }

    if (
      formData.category === "Other" &&
      !formData.customCategory.trim()
    ) {
      setError(
        "Please enter custom category"
      );
      return;
    }

    if (!formData.date) {
      setError(
        "Please select a date"
      );
      return;
    }

    if (formData.date > today) {
      setError(
        "Future dates are not allowed"
      );
      return;
    }

    const expenseData = {
      ...formData,
      category:
        formData.category ===
        "Other"
          ? formData.customCategory
          : formData.category,
    };

    try {
      if (editingExpense) {
        await API.put(
          `/expenses/${editingExpense.id}`,
          expenseData
        );

        alert(
          "Expense Updated Successfully"
        );

        setEditingExpense(null);
      } else {
        await API.post(
          "/expenses",
          expenseData
        );

        alert(
          "Expense Added Successfully"
        );
      }

      setFormData({
        amount: "",
        category: "",
        customCategory: "",
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
    <form
      onSubmit={handleSubmit}
      className="expense-form"
    >
      <h2 className="mb-4 fw-bold text-dark">
        {editingExpense
          ? "✏️ Edit Expense"
          : "➕ Add Expense"}
      </h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-3">
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
                amount:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Category
          </label>

          <select
            className="form-select"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category:
                  e.target.value,
              })
            }
          >
            <option value="">
              Select Category
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Transport">
              Transport
            </option>

            <option value="Bills">
              Bills
            </option>

            <option value="Entertainment">
              Entertainment
            </option>

            <option value="Other">
              Other
            </option>
          </select>

          {formData.category ===
            "Other" && (
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter custom category"
              value={
                formData.customCategory
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customCategory:
                    e.target.value,
                })
              }
            />
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
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
                date:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="col-md-8 mb-3">
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
                note:
                  e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="mt-3">
        <button
          type="submit"
          className="btn btn-primary px-4"
        >
          {editingExpense
            ? "Update Expense"
            : "Add Expense"}
        </button>

        {editingExpense && (
          <button
            type="button"
            className="btn btn-secondary ms-2 px-4"
            onClick={() => {
              setEditingExpense(null);

              setFormData({
                amount: "",
                category: "",
                customCategory: "",
                date: "",
                note: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;