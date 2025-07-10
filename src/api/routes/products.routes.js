import { Router } from "express";
import connection from "../database/db.js";
import { validateId } from "../middlewares/middlewares.js";
const router = Router();
import { getAllProducts, getProductById , createProduct, updateProduct, removeProduct} from "../controllers/produtcs.controllers.js";

// Ruta para obtener todos los productos
router.get("/", getAllProducts);

// Ruta para obtener un producto por ID (valida que el ID sea número)
router.get("/:id", validateId, getProductById);

// Ruta para crear un nuevo producto
router.post("/", createProduct);

// Ruta para modificar un producto existente (valida que el ID sea número)
router.put("/:id", validateId, updateProduct);

// Ruta para eliminar un producto por ID
router.delete("/:id", removeProduct);

// Exporta el router para usarlo en la app principal
export default router;

//¿Qué hace este archivo?
//Define las rutas de la API para productos.
//Cada ruta está asociada a una función controladora.
//Usa middlewares para validar datos antes de ejecutar la lógica principal.
//Permite separar la lógica de rutas de la lógica de negocio.