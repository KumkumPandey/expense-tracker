import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaBullseye,
  FaWallet,
} from "react-icons/fa";

function BudgetTracker() {
  const [budget, setBudget] = useState(
    () =>
      localStorage.getItem(
        "monthlyBudget"
      ) || ""
  );

  const [expenses, setExpenses] =
    useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response =
          await API.get("/expenses");

        setExpenses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadExpenses();
  }, []);

  const handleBudgetChange = (
    value
  ) => {
    if (Number(value) < 0) return;

    setBudget(value);

    localStorage.setItem(
      "monthlyBudget",
      value
    );
  };

  const totalSpent = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const budgetValue =
    Number(budget) > 0
      ? Number(budget)
      : 0;

  const remaining =
    budgetValue - totalSpent;

  const progress =
    budgetValue > 0
      ? Math.min(
          (totalSpent /
            budgetValue) *
            100,
          100
        )
      : 0;

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body p-4">

        <div className="d-flex align-items-center mb-4">
          <FaBullseye
            size={28}
            className="text-primary me-3"
          />

          <h3 className="mb-0 fw-bold">
            Budget Tracker
          </h3>
        </div>

        <input
          type="number"
          min="0"
          className="form-control mb-2"
          placeholder="Enter Monthly Budget"
          value={budget}
          onChange={(e) =>
            handleBudgetChange(
              e.target.value
            )
          }
        />

        <p className="text-muted small mb-4">
          Set your monthly spending target
        </p>

        <div className="row text-center mb-4">

          <div className="col-4">
            <h6 className="text-muted">
              Budget
            </h6>

            <h4 className="text-primary fw-bold">
              ₹
              {budgetValue.toLocaleString(
                "en-IN"
              )}
            </h4>
          </div>

          <div className="col-4">
            <h6 className="text-muted">
              Spent
            </h6>

            <h4 className="text-warning fw-bold">
              ₹
              {totalSpent.toLocaleString(
                "en-IN"
              )}
            </h4>
          </div>

          <div className="col-4">
            <h6 className="text-muted">
              Remaining
            </h6>

            <h4
              className={
                remaining >= 0
                  ? "text-success fw-bold"
                  : "text-danger fw-bold"
              }
            >
              ₹
              {Math.abs(
                remaining
              ).toLocaleString(
                "en-IN"
              )}
            </h4>
          </div>

        </div>

        <div className="mb-3">

          <div className="d-flex justify-content-between mb-2">
            <span>
              Budget Usage
            </span>

            <span>
              {progress.toFixed(0)}%
            </span>
          </div>

          <div
            className="progress"
            style={{
              height: "12px",
            }}
          >
            <div
              className={`progress-bar ${
                progress < 70
                  ? "bg-success"
                  : progress < 90
                  ? "bg-warning"
                  : "bg-danger"
              }`}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

        </div>

        <div className="text-center mt-4">

          <FaWallet
            size={30}
            className="text-primary mb-2"
          />

          <h6
            className={
              remaining >= 0
                ? "text-success"
                : "text-danger"
            }
          >
            {remaining >= 0
              ? "Within Budget ✅"
              : "Budget Exceeded ⚠️"}
          </h6>

        </div>

      </div>
    </div>
  );
}

export default BudgetTracker;