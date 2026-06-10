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
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += Number(
      expense.amount
    );
  });

  return (
    <>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h3>
                ₹
                {totalSpent.toLocaleString(
                  "en-IN"
                )}
              </h3>
              <p className="mb-0">
                Total Spent
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h3>
                ₹
                {highestExpense.toLocaleString(
                  "en-IN"
                )}
              </h3>
              <p className="mb-0">
                Highest Expense
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h3>{expenses.length}</h3>
              <p className="mb-0">
                Transactions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow border-0 mb-4">
        <div className="card-body">
          <h4 className="mb-3">
            Category Totals
          </h4>

          <div className="row">
            {Object.entries(
              categoryTotals
            ).map(([category, total]) => (
              <div
                className="col-md-4 mb-3"
                key={category}
              >
                <div className="border rounded p-3">
                  <strong>
                    {category}
                  </strong>

                  <div>
                    ₹
                    {total.toLocaleString(
                      "en-IN"
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SummaryCards;