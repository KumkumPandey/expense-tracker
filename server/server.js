const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");

const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH =
  "./data/expenses.json";

/* Create JSON file if missing */
const initializeFile = async () => {
  try {
    const exists =
      await fs.pathExists(
        FILE_PATH
      );

    if (!exists) {
      await fs.outputJson(
        FILE_PATH,
        []
      );
    }
  } catch (error) {
    console.error(
      "Error creating file:",
      error
    );
  }
};

initializeFile();

/* Root Route */
app.get("/", (req, res) => {
  res.send(
    "Mini Expense Tracker Backend Running 🚀"
  );
});

/* GET ALL EXPENSES */
app.get(
  "/expenses",
  async (req, res) => {
    try {
      const expenses =
        await fs.readJson(
          FILE_PATH
        );

      const sortedExpenses =
        [...expenses].sort(
          (a, b) =>
            new Date(
              b.date
            ).getTime() -
            new Date(
              a.date
            ).getTime()
        );

      res.json(
        sortedExpenses
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Error reading expenses",
      });
    }
  }
);

/* ADD EXPENSE */
app.post(
  "/expenses",
  async (req, res) => {
    try {
      const {
        amount,
        category,
        date,
        note,
      } = req.body;

      if (
        !amount ||
        Number(amount) <= 0
      ) {
        return res
          .status(400)
          .json({
            message:
              "Amount must be greater than 0",
          });
      }

      if (!category) {
        return res
          .status(400)
          .json({
            message:
              "Category is required",
          });
      }

      if (!date) {
        return res
          .status(400)
          .json({
            message:
              "Date is required",
          });
      }

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      if (date > today) {
        return res
          .status(400)
          .json({
            message:
              "Future dates are not allowed",
          });
      }

      const expenses =
        await fs.readJson(
          FILE_PATH
        );

      const newExpense = {
        id: Date.now(),

        amount:
          Number(amount),

        category,

        date,

        note:
          note || "",

        createdAt:
          new Date().toISOString(),
      };

      expenses.push(
        newExpense
      );

      await fs.writeJson(
        FILE_PATH,
        expenses,
        {
          spaces: 2,
        }
      );

      res
        .status(201)
        .json(newExpense);
    } catch (error) {
      res.status(500).json({
        message:
          "Error adding expense",
      });
    }
  }
);

/* UPDATE EXPENSE */
app.put(
  "/expenses/:id",
  async (req, res) => {
    try {
      const {
        amount,
        category,
        date,
      } = req.body;

      if (
        !amount ||
        Number(amount) <= 0
      ) {
        return res
          .status(400)
          .json({
            message:
              "Amount must be greater than 0",
          });
      }

      if (!category) {
        return res
          .status(400)
          .json({
            message:
              "Category is required",
          });
      }

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      if (date > today) {
        return res
          .status(400)
          .json({
            message:
              "Future dates are not allowed",
          });
      }

      const expenses =
        await fs.readJson(
          FILE_PATH
        );

      let found =
        false;

      const updatedExpenses =
        expenses.map(
          (expense) => {
            if (
              expense.id ===
              Number(
                req.params.id
              )
            ) {
              found =
                true;

              return {
                ...expense,
                ...req.body,
              };
            }

            return expense;
          }
        );

      if (!found) {
        return res
          .status(404)
          .json({
            message:
              "Expense not found",
          });
      }

      await fs.writeJson(
        FILE_PATH,
        updatedExpenses,
        {
          spaces: 2,
        }
      );

      res.json({
        message:
          "Expense updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Error updating expense",
      });
    }
  }
);

/* DELETE EXPENSE */
app.delete(
  "/expenses/:id",
  async (req, res) => {
    try {
      const expenses =
        await fs.readJson(
          FILE_PATH
        );

      const expenseExists =
        expenses.find(
          (expense) =>
            expense.id ===
            Number(
              req.params.id
            )
        );

      if (
        !expenseExists
      ) {
        return res
          .status(404)
          .json({
            message:
              "Expense not found",
          });
      }

      const updatedExpenses =
        expenses.filter(
          (expense) =>
            expense.id !==
            Number(
              req.params.id
            )
        );

      await fs.writeJson(
        FILE_PATH,
        updatedExpenses,
        {
          spaces: 2,
        }
      );

      res.json({
        message:
          "Expense deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Error deleting expense",
      });
    }
  }
);

const PORT =
  process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});