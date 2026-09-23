const investmentService = require("../services/investmentService");

const REQUIRED_FIELDS = ["cliente", "activo", "monto", "tipo", "fecha", "rentabilidad"];

function validateInvestmentPayload(body) {
  const missing = REQUIRED_FIELDS.filter((field) => body[field] === undefined || body[field] === "");
  if (missing.length > 0) {
    return `Faltan campos requeridos: ${missing.join(", ")}`;
  }
  if (Number.isNaN(Number(body.monto)) || Number(body.monto) <= 0) {
    return "El campo 'monto' debe ser un número mayor a 0";
  }
  if (Number.isNaN(Number(body.rentabilidad))) {
    return "El campo 'rentabilidad' debe ser un número";
  }
  return null;
}

function getAll(req, res) {
  return res.json(investmentService.getAll());
}

function create(req, res) {
  const error = validateInvestmentPayload(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const investment = investmentService.create(req.body);
  return res.status(201).json(investment);
}

function remove(req, res) {
  const { id } = req.params;
  const deleted = investmentService.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: "Inversión no encontrada" });
  }

  return res.status(204).send();
}

module.exports = { getAll, create, remove };
