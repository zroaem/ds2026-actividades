import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});