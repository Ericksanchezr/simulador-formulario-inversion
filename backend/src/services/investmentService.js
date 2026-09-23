const { investments, getNextId } = require("../data/investments");

function getAll() {
  return investments;
}

function create(data) {
  const investment = {
    id: getNextId(),
    cliente: data.cliente,
    activo: data.activo,
    monto: Number(data.monto),
    tipo: data.tipo,
    fecha: data.fecha,
    rentabilidad: Number(data.rentabilidad),
  };
  investments.push(investment);
  return investment;
}

function remove(id) {
  const index = investments.findIndex((inv) => inv.id === Number(id));
  if (index === -1) return false;
  investments.splice(index, 1);
  return true;
}

module.exports = { getAll, create, remove };
