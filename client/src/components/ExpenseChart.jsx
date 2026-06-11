import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];

function ExpenseChart() {
  const [expenses, setExpenses] = useState([]);

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

  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += Number(
      expense.amount
    );
  });

  const chartData = Object.keys(
    categoryTotals
  ).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">
          📊 Expense Analytics
        </h2>

        <p className="text-muted mb-0">
          Category-wise expense distribution
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">
            No expense data available
          </h5>

          <p className="text-muted">
            Add some expenses to see
            analytics
          </p>
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={420}
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={140}
              innerRadius={70}
              paddingAngle={4}
              label
            >
              {chartData.map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

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

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpenseChart;