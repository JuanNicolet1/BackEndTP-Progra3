// Se importa express.Router
import { Router } from 'express';
import { vistaListado, vistaConsultarId, vistaCrearProducto, vistaModificarProducto, vistaEliminarProducto } from '../controllers/view.controllers.js';

const router = Router();

// Vista listado producto
router.get("/", vistaListado);

// Vista consultar producto por id
router.get("/consultar", vistaConsultarId);


// Vista crear producto
router.get("/crear", vistaCrearProducto);

// Vista modificar producto
router.get("/modificar", vistaModificarProducto);

// Vista eliminar producto
router.get("/eliminar", vistaEliminarProducto);

// Exportamos las rutas de vista
export default router;