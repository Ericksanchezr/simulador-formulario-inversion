const bcrypt = require("bcryptjs");
const { users } = require("../data/users");
const { signToken } = require("../utils/jwt");

function login(username, password) {
  const user = users.find((u) => u.username === username);
  if (!user) return null;

  const isValid = bcrypt.compareSync(password, user.passwordHash);
  if (!isValid) return null;

  const token = signToken({ id: user.id, username: user.username, role: user.role });
  return { token, user: { id: user.id, username: user.username, role: user.role } };
}

module.exports = { login };
