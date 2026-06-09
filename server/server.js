const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");

const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = "./data/expenses.json";

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend Running");
});

app.get("/expenses", async (req, res) => {
  try {
    const expenses = await fs.readJson(FILE_PATH);

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Error reading expenses",
    });
  }
});

app.post("/expenses", async (req, res) => {
  try {
    const expenses = await fs.readJson(FILE_PATH);

    const newExpense = {
      id: Date.now(),
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
      note: req.body.note || ""
    };

    expenses.push(newExpense);

    await fs.writeJson(FILE_PATH, expenses, {
      spaces: 2
    });

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({
      message: "Error adding expense"
    });
  }
});

app.delete("/expenses/:id", async (req, res) => {
  try {
    const expenses = await fs.readJson(FILE_PATH);

    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== Number(req.params.id)
    );

    await fs.writeJson(FILE_PATH, updatedExpenses, {
      spaces: 2,
    });

    res.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting expense",
    });
  }
});

app.put("/expenses/:id", async (req, res) => {
  try {
    const expenses = await fs.readJson(FILE_PATH);

    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === Number(req.params.id)) {
        return {
          ...expense,
          ...req.body,
        };
      }

      return expense;
    });

    await fs.writeJson(FILE_PATH, updatedExpenses, {
      spaces: 2,
    });

    res.json({
      message: "Expense updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating expense",
    });
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});