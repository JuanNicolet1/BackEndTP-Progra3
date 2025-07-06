import { Router } from "express";
import connection from "../database/db.js";
import { validateId } from "../middlewares/middlewares.js";
const router = Router();
import { getAllProducts, getProductById , createProduct, updateProduct, removeProduct} from "../controllers/produtcs.controllers.js";

router.get("/", getAllProducts);

router.get("/:id", validateId, getProductById);

router.post("/", createProduct);

router.put("/:id", validateId, updateProduct);

router.delete("/:id", removeProduct);

export default router;