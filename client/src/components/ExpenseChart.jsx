import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart() {
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

  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += Number(
      expense.amount
    );
  });

  const chartData = Object.keys(categoryTotals).map(
    (category) => ({
      name: category,
      value: categoryTotals[category],
    })
  );

  return (
    <div>
      <h2>Expense Distribution</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          />

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;