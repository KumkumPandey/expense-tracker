import { useEffect, useState } from "react";
import API from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function TrendChart() {
  const [expenses, setExpenses] =
    useState([]);

  const [viewType, setViewType] =
    useState("month");

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

  const groupedData = {};

  expenses.forEach((expense) => {
    const expenseDate =
      new Date(expense.date);

    const key =
      viewType === "year"
        ? expenseDate.getFullYear()
        : `${expenseDate.getFullYear()}-${String(
            expenseDate.getMonth() + 1
          ).padStart(2, "0")}`;

    if (!groupedData[key]) {
      groupedData[key] = 0;
    }

    groupedData[key] += Number(
      expense.amount
    );
  });

  const chartData = Object.entries(
    groupedData
  )
    .map(([period, amount]) => ({
      period,
      amount,
    }))
    .sort((a, b) => {
      if (viewType === "year") {
        return (
          Number(a.period) -
          Number(b.period)
        );
      }

      return (
        new Date(
          `${a.period}-01`
        ) -
        new Date(
          `${b.period}-01`
        )
      );
    });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h3 className="fw-bold text-dark">
            📈 Expense Trend
          </h3>

          <p className="text-muted mb-0">
            Analyze your spending pattern
          </p>
        </div>

        <div>
          <button
            className={`btn me-2 ${
              viewType === "month"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() =>
              setViewType("month")
            }
          >
            Monthly
          </button>

          <button
            className={`btn ${
              viewType === "year"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() =>
              setViewType("year")
            }
          >
            Yearly
          </button>
        </div>

      </div>

      {chartData.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">
            No data available
          </h5>
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <LineChart
            data={chartData}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="period"
              tickFormatter={(
                value
              ) => {
                if (
                  viewType === "year"
                )
                  return value;

                const [
                  year,
                  month,
                ] =
                  value.split(
                    "-"
                  );

                return new Date(
                  year,
                  month - 1
                ).toLocaleString(
                  "default",
                  {
                    month:
                      "short",
                    year:
                      "2-digit",
                  }
                );
              }}
            />

            <YAxis />

            <Tooltip
              formatter={(
                value
              ) => [
                `₹${Number(
                  value
                ).toLocaleString(
                  "en-IN"
                )}`,
                "Spent",
              ]}
            />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#7c3aed"
              strokeWidth={4}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default TrendChart;