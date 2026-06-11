import { useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import ExpenseChart from "./components/ExpenseChart";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import TrendChart from "./components/TrendChart";
import Footer from "./components/Footer";

function App() {
  const [editingExpense, setEditingExpense] =
    useState(null);

  const [activePage, setActivePage] =
    useState("dashboard");

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-content">
        <div className="container py-4">

          {/* HEADER */}

          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="text-center mb-5"
          >
            <h1 className="dashboard-title">
              💰 Mini Expense Tracker
            </h1>

            <p className="text-muted fs-5">
              Manage Your Expenses Smartly
            </p>
          </motion.div>

          {/* DASHBOARD */}

          {activePage ===
            "dashboard" && (
            <>
              <SummaryCards />

              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <ExpenseForm
                    editingExpense={
                      editingExpense
                    }
                    setEditingExpense={
                      setEditingExpense
                    }
                  />
                </div>
              </div>

              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <TrendChart />
                </div>
              </div>
            </>
          )}

          {/* EXPENSES */}

          {activePage ===
            "expenses" && (
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <ExpenseTable
                  setEditingExpense={
                    setEditingExpense
                  }
                />
              </div>
            </div>
          )}

          {/* BUDGET */}

          {activePage ===
            "budget" && (
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <BudgetTracker />
              </div>
            </div>
          )}

          {/* ANALYTICS */}

          {activePage ===
            "analytics" && (
            <>
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <ExpenseChart />
                </div>
              </div>

              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <TrendChart />
                </div>
              </div>
            </>
          )}

          <Footer />

        </div>
      </div>
    </div>
  );
}

export default App;