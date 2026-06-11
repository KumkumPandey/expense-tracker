import {
  FaChartPie,
  FaMoneyBillWave,
  FaWallet,
  FaChartLine,
} from "react-icons/fa";

function Sidebar({
  activePage,
  setActivePage,
}) {
  return (
    <div className="sidebar">

      <div className="logo-section">

        <div className="logo-container">
          <span className="logo-icon">
            💰
          </span>

          <span className="logo-text">
            Mini Expense Tracker
          </span>
        </div>

        <p className="sidebar-subtitle">
          Track Your Daily Expenses
        </p>

      </div>

      <ul className="sidebar-menu">

        <li
          className={
            activePage === "dashboard"
              ? "active"
              : ""
          }
          onClick={() =>
            setActivePage("dashboard")
          }
        >
          <FaChartPie />
          <span>Dashboard</span>
        </li>

        <li
          className={
            activePage === "expenses"
              ? "active"
              : ""
          }
          onClick={() =>
            setActivePage("expenses")
          }
        >
          <FaMoneyBillWave />
          <span>Expenses</span>
        </li>

        <li
          className={
            activePage === "budget"
              ? "active"
              : ""
          }
          onClick={() =>
            setActivePage("budget")
          }
        >
          <FaWallet />
          <span>Budget</span>
        </li>

        <li
          className={
            activePage === "analytics"
              ? "active"
              : ""
          }
          onClick={() =>
            setActivePage("analytics")
          }
        >
          <FaChartLine />
          <span>Analytics</span>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;