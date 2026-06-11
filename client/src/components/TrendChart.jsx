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

  // Group expenses by date
  const dateTotals = {};

  expenses.forEach((expense) => {
    if (!dateTotals[expense.date]) {
      dateTotals[expense.date] = 0;
    }

    dateTotals[expense.date] += Number(
      expense.amount
    );
  });

  const chartData = Object.entries(
    dateTotals
  )
    .map(([date, amount]) => ({
      date: new Date(
        date
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),

      amount,
    }))
    .sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    );

  return (
    <div>
      <div className="mb-4">
        <h3 className="fw-bold text-dark">
          📈 Expense Trend
        </h3>

        <p className="text-muted mb-0">
          Daily spending overview
        </p>
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
              dataKey="date"
            />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `₹${Number(
                  value
                ).toLocaleString(
                  "en-IN"
                )}`,
                "Amount",
              ]}
            />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={3}
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