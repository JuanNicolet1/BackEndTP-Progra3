import express from "express";
import environments from "./src/api/config/enviroments.js";
import cors from "cors";
import { productRoutes } from "./src/api/routes/index_barril.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";

const PORT = 3002;
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(loggerUrl);


// Usar el enrutador de productos para todas las rutas bajo /products
app.use("/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});