import express from "express";
import cors from "cors";
import productsRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>API Productos</h1><p>Servidor funcionando correctamente</p>");
});

app.get("/up", (req, res) => {
  res.json({ status: "ok", message: "Servidor activo" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;
