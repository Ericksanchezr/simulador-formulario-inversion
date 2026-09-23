function formatCurrency(value) {
  return value.toLocaleString("es-CO", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function PortfolioSummary({ investments }) {
  const totalInvertido = investments.reduce((sum, inv) => sum + Number(inv.monto), 0);

  const rentabilidadPromedio =
    investments.length === 0
      ? 0
      : investments.reduce((sum, inv) => sum + Number(inv.rentabilidad), 0) /
        investments.length;

  const cards = [
    {
      label: "Total invertido",
      value: formatCurrency(totalInvertido),
      accent: "text-slate-900",
    },
    {
      label: "N° de inversiones",
      value: investments.length,
      accent: "text-slate-900",
    },
    {
      label: "Rentabilidad promedio",
      value: `${rentabilidadPromedio.toFixed(2)}%`,
      accent: rentabilidadPromedio >= 0 ? "text-emerald-600" : "text-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className={`mt-1 text-2xl font-semibold ${card.accent}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
