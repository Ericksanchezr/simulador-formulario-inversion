function formatCurrency(value) {
  return Number(value).toLocaleString("es-CO", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function InvestmentTable({ investments, onDelete }) {
  if (investments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
        No hay inversiones registradas todavía.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Activo</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Tipo</th>
            <th className="px-4 py-3 text-right font-semibold text-slate-600">Monto</th>
            <th className="px-4 py-3 text-right font-semibold text-slate-600">Rentabilidad</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-600">Fecha</th>
            <th className="px-4 py-3 text-right font-semibold text-slate-600">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {investments.map((inv) => (
            <tr key={inv.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-800">{inv.activo}</td>
              <td className="px-4 py-3 text-slate-600">{inv.tipo}</td>
              <td className="px-4 py-3 text-right text-slate-800">
                {formatCurrency(inv.monto)}
              </td>
              <td
                className={`px-4 py-3 text-right font-semibold ${
                  Number(inv.rentabilidad) >= 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {Number(inv.rentabilidad) >= 0 ? "+" : ""}
                {Number(inv.rentabilidad).toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-slate-600">{inv.fecha}</td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onDelete(inv.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                  aria-label={`Eliminar ${inv.activo}`}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
