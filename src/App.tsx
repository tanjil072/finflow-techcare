import { Toaster } from "sonner";
import { DashboardSummary } from "./components/DashboardSummary";
import TransactionSummary from "./components/TransactionSummary";

function App() {
  return (
    <>
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-6">
            <DashboardSummary />
            <TransactionSummary />
          </div>
        </div>
      </main>

      <Toaster richColors position="bottom-right" />
    </>
  );
}

export default App;
