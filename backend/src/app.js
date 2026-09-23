const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const investmentRoutes = require("./routes/investmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "Investment API" });
});

app.use("/login", authRoutes);
app.use("/inversiones", investmentRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = app;
