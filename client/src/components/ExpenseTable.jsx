import { useEffect, useState } from "react";
import API from "../services/api";

function ExpenseTable({ setEditingExpense }) {
  const [expenses, setExpenses] = useState([]);
  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [dateFilter, setDateFilter] =
    useState("all");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response =
          await API.get("/expenses");

        const sortedExpenses = [
          ...response.data,
        ].sort(
          (a, b) =>
            new Date(b.date) -
            new Date(a.date)
        );

        setExpenses(sortedExpenses);
      } catch (error) {
        console.error(
          "Error fetching expenses:",
          error
        );
      }
    };

    loadExpenses();
  }, []);

  const deleteExpense = async (id) => {
    try {
      await API.delete(
        `/expenses/${id}`
      );

      setExpenses(
        (prevExpenses) =>
          prevExpenses.filter(
            (expense) =>
              expense.id !== id
          )
      );
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error
      );
    }
  };

  const filteredExpenses =
    expenses.filter((expense) => {
      const categoryMatch =
        categoryFilter === "All" ||
        expense.category ===
          categoryFilter;

      const searchMatch =
        expense.category
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        (expense.note || "")
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const today =
        new Date();

      const expenseDate =
        new Date(expense.date);

      let dateMatch = true;

      if (
        dateFilter ===
        "thisMonth"
      ) {
        dateMatch =
          expenseDate.getMonth() ===
            today.getMonth() &&
          expenseDate.getFullYear() ===
            today.getFullYear();
      } else if (
        dateFilter ===
        "lastMonth"
      ) {
        const lastMonth =
          today.getMonth() - 1;

        dateMatch =
          expenseDate.getMonth() ===
            lastMonth &&
          expenseDate.getFullYear() ===
            today.getFullYear();
      } else if (
        dateFilter ===
        "custom"
      ) {
        dateMatch =
          (!startDate ||
            expense.date >=
              startDate) &&
          (!endDate ||
            expense.date <=
              endDate);
      }

      return (
        categoryMatch &&
        searchMatch &&
        dateMatch
      );
    });

  const exportCSV = () => {
    const headers = [
      "Date",
      "Category",
      "Amount",
      "Note",
    ];

    const rows =
      filteredExpenses.map(
        (expense) => [
          expense.date,
          expense.category,
          expense.amount,
          expense.note,
        ]
      );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row.join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const link =
      document.createElement(
        "a"
      );

    link.href =
      URL.createObjectURL(
        blob
      );

    link.download =
      "expenses.csv";

    link.click();
  };

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark mb-0">
          📋 Expense History
        </h2>

        <button
          className="btn btn-primary"
          onClick={exportCSV}
        >
          Export CSV
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search category or note..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />
      </div>

      <div className="filter-section mb-4">

        <div className="row g-3">

          <div className="col-md-4">
            <label className="form-label">
              Category
            </label>

            <select
              className="form-select"
              value={
                categoryFilter
              }
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Categories
              </option>

              <option value="Food">
                Food
              </option>

              <option value="Transport">
                Transport
              </option>

              <option value="Bills">
                Bills
              </option>

              <option value="Entertainment">
                Entertainment
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Date Filter
            </label>

            <select
              className="form-select"
              value={
                dateFilter
              }
              onChange={(e) =>
                setDateFilter(
                  e.target.value
                )
              }
            >
              <option value="all">
                All Time
              </option>

              <option value="thisMonth">
                This Month
              </option>

              <option value="lastMonth">
                Last Month
              </option>

              <option value="custom">
                Custom Range
              </option>
            </select>
          </div>

        </div>

        {dateFilter ===
          "custom" && (
          <div className="row mt-3">

            <div className="col-md-6">
              <label className="form-label">
                Start Date
              </label>

              <input
                type="date"
                className="form-control"
                value={
                  startDate
                }
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                End Date
              </label>

              <input
                type="date"
                className="form-control"
                value={
                  endDate
                }
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
              />
            </div>

          </div>
        )}

      </div>

      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredExpenses.length ===
            0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-5"
                >
                  <h4 className="text-muted">
                    No Expenses Found
                  </h4>

                  <p className="text-muted">
                    Add your first
                    expense to get
                    started.
                  </p>
                </td>
              </tr>
            ) : (
              filteredExpenses.map(
                (expense) => (
                  <tr
                    key={
                      expense.id
                    }
                  >
                    <td>
                      {new Date(
                        expense.date
                      ).toLocaleDateString(
                        "en-IN"
                      )}
                    </td>

                    <td>
                      <span className="badge bg-primary rounded-pill">
                        {
                          expense.category
                        }
                      </span>
                    </td>

                    <td className="fw-semibold">
                      {new Intl.NumberFormat(
                        "en-IN",
                        {
                          style:
                            "currency",
                          currency:
                            "INR",
                        }
                      ).format(
                        expense.amount
                      )}
                    </td>

                    <td>
                      {
                        expense.note
                      }
                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          setEditingExpense(
                            expense
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Delete this expense?"
                            )
                          ) {
                            deleteExpense(
                              expense.id
                            );
                          }
                        }}
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ExpenseTable;