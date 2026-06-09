import { useState } from "react";
import API from "../services/api";

function ExpenseForm() {
  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/expenses", formData);

    alert("Expense Added");

    setFormData({
      amount: "",
      category: "Food",
      date: "",
      note: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <select
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
          })
        }
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Bills</option>
        <option>Entertainment</option>
        <option>Other</option>
      </select>

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

      <button type="submit">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;