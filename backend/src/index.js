const express = require("express");
const cors = require("cors");
const formRoutes = require("./routes/form.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Joi validation backend is running" });
});

app.use("/api/forms", formRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Backend Joi server running on http://localhost:${PORT}`);
});
