import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";

function App() {
  return (
    <div>
      <h1>Expense Tracker</h1>

      <ExpenseForm />

      <ExpenseTable />
    </div>
  );
}

export default App;