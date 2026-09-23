function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "No tienes permisos para esta acción" });
    }
    next();
  };
}

module.exports = requireRole;
