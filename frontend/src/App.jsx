import { useState } from "react";
import { initialInvestments } from "./data/mockInvestments";
import PortfolioSummary from "./components/PortfolioSummary";
import InvestmentTable from "./components/InvestmentTable";
import InvestmentForm from "./components/InvestmentForm";

export default function App() {
  const [investments, setInvestments] = useState(initialInvestments);

  function handleAdd(newInvestment) {
    setInvestments((prev) => [
      ...prev,
      { ...newInvestment, id: prev.length ? Math.max(...prev.map((i) => i.id)) + 1 : 1 },
    ]);
  }

  function handleDelete(id) {
    setInvestments((prev) => prev.filter((inv) => inv.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h1 className="text-2xl font-bold">Simulador de Portafolio</h1>
          <p className="text-slate-300 text-sm mt-1">
            Vista del portafolio de inversiones de un cliente
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        <PortfolioSummary investments={investments} />
        <InvestmentTable investments={investments} onDelete={handleDelete} />
        <InvestmentForm onAdd={handleAdd} />
      </main>
    </div>
  );
}
