// Almacenamiento en memoria de inversiones (se reinicia al reiniciar el servidor).
let investments = [
  {
    id: 1,
    cliente: "Juan Pérez",
    activo: "Apple Inc. (AAPL)",
    monto: 5000,
    tipo: "Acción",
    fecha: "2025-01-15",
    rentabilidad: 12.4,
  },
  {
    id: 2,
    cliente: "Juan Pérez",
    activo: "Bono Tesoro EE.UU. 10Y",
    monto: 8000,
    tipo: "Bono",
    fecha: "2024-11-02",
    rentabilidad: 4.1,
  },
  {
    id: 3,
    cliente: "María Gómez",
    activo: "Fondo Índice S&P 500",
    monto: 12000,
    tipo: "Fondo",
    fecha: "2025-03-20",
    rentabilidad: 9.8,
  },
];

let nextId = investments.length + 1;

module.exports = {
  investments,
  getNextId: () => nextId++,
};
