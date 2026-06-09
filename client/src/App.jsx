import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import SummaryCards from "./components/SummaryCards";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  return (
    <div>
      <h1>Expense Tracker</h1>

      <SummaryCards />

      <ExpenseChart />

      <ExpenseForm />

      <ExpenseTable />
    </div>
  );
}

export default App;