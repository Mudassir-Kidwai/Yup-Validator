const express = require("express");
const cors = require("cors");
const formRoutes = require("./routes/form.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Joi validation backend is running" });
});

app.use("/api/forms", formRoutes);

app.use("/api", (_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
