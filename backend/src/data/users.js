const bcrypt = require("bcryptjs");

// Usuarios hardcodeados en memoria. Contraseñas en texto plano solo para
// referencia; se guardan y comparan como hash con bcrypt.
const users = [
  {
    id: 1,
    username: "admin",
    passwordHash: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    id: 2,
    username: "analyst",
    passwordHash: bcrypt.hashSync("analyst123", 10),
    role: "analyst",
  },
];

module.exports = { users };
