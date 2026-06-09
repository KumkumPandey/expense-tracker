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

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});