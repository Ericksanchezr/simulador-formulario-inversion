import { useState } from "react";
import { TIPOS_ACTIVO } from "../data/mockInvestments";

const emptyForm = {
  activo: "",
  tipo: TIPOS_ACTIVO[0],
  monto: "",
  rentabilidad: "",
  fecha: "",
};

export default function InvestmentForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.activo.trim() || !form.monto || !form.rentabilidad || !form.fecha) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (Number(form.monto) <= 0) {
      setError("El monto debe ser mayor a 0.");
      return;
    }

    onAdd({
      activo: form.activo.trim(),
      tipo: form.tipo,
      monto: Number(form.monto),
      rentabilidad: Number(form.rentabilidad),
      fecha: form.fecha,
    });

    setForm(emptyForm);
    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4"
    >
      <h2 className="text-lg font-semibold text-slate-800">Agregar inversión</h2>

      {error && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Activo</label>
          <input
            type="text"
            name="activo"
            value={form.activo}
            onChange={handleChange}
            placeholder="Ej. Tesla Inc. (TSLA)"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Tipo</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {TIPOS_ACTIVO.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Monto (USD)</label>
          <input
            type="number"
            name="monto"
            value={form.monto}
            onChange={handleChange}
            placeholder="1000"
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Rentabilidad (%)
          </label>
          <input
            type="number"
            name="rentabilidad"
            value={form.rentabilidad}
            onChange={handleChange}
            placeholder="8.5"
            step="0.01"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-600 mb-1">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
      >
        Agregar inversión
      </button>
    </form>
  );
}
