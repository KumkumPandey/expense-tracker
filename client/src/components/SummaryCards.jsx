import { useEffect, useState } from "react";
import API from "../services/api";

import {
  FaMoneyBillWave,
  FaChartLine,
  FaReceipt,
  FaCalculator,
} from "react-icons/fa";

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

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthExpenses = expenses.filter(
    (expense) => {
      const expenseDate = new Date(
        expense.date
      );

      return (
        expenseDate.getMonth() ===
          currentMonth &&
        expenseDate.getFullYear() ===
          currentYear
      );
    }
  );

  const totalSpentThisMonth =
    thisMonthExpenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map((expense) =>
            Number(expense.amount)
          )
        )
      : 0;

  const averageExpense =
    expenses.length > 0
      ? (
          expenses.reduce(
            (sum, expense) =>
              sum +
              Number(expense.amount),
            0
          ) / expenses.length
        ).toFixed(0)
      : 0;

  return (
    <div className="row g-4 mb-5">

      {/* THIS MONTH */}
      <div className="col-xl-3 col-lg-6 col-md-6">
        <div className="card stat-card-1 border-0 h-100">
          <div className="card-body text-center">

            <FaMoneyBillWave
              size={36}
              className="mb-3 text-white"
            />

            <h3 className="fw-bold text-white">
              ₹
              {totalSpentThisMonth.toLocaleString(
                "en-IN"
              )}
            </h3>

            <p className="text-white mb-0">
              This Month Spending
            </p>

          </div>
        </div>
      </div>

      {/* HIGHEST */}
      <div className="col-xl-3 col-lg-6 col-md-6">
        <div className="card stat-card-2 border-0 h-100">
          <div className="card-body text-center">

            <FaChartLine
              size={36}
              className="mb-3 text-white"
            />

            <h3 className="fw-bold text-white">
              ₹
              {highestExpense.toLocaleString(
                "en-IN"
              )}
            </h3>

            <p className="text-white mb-0">
              Highest Expense
            </p>

          </div>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="col-xl-3 col-lg-6 col-md-6">
        <div className="card stat-card-3 border-0 h-100">
          <div className="card-body text-center">

            <FaReceipt
              size={36}
              className="mb-3 text-white"
            />

            <h3 className="fw-bold text-white">
              {expenses.length}
            </h3>

            <p className="text-white mb-0">
              Transactions
            </p>

          </div>
        </div>
      </div>

      {/* AVERAGE */}
      <div className="col-xl-3 col-lg-6 col-md-6">
        <div className="card stat-card-4 border-0 h-100">
          <div className="card-body text-center">

            <FaCalculator
              size={36}
              className="mb-3 text-white"
            />

            <h3 className="fw-bold text-white">
              ₹
              {Number(
                averageExpense
              ).toLocaleString("en-IN")}
            </h3>

            <p className="text-white mb-0">
              Average Expense
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}

export default SummaryCards;