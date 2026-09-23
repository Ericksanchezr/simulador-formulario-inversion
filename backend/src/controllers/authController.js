const authService = require("../services/authService");

function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username y password son requeridos" });
  }

  const result = authService.login(username, password);

  if (!result) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  return res.json(result);
}

module.exports = { login };
