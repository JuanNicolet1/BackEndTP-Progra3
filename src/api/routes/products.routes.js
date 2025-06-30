import { Router } from "express";
import connection from "../database/db.js";
import { validateId } from "../middlewares/middlewares.js";
const router = Router();

router.get("/", async (req, res) => { // Obtener una lista de todos los productos.
    try {
        let sql = "SELECT * FROM products";
        const [rows] = await connection.query(sql);
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados",
        });
    } catch (error) {
        console.error("error obtenido al procesar la consulta");
        res.status(500).json({
            error: "Error al obtener los productos",
        });
    }
});

router.post("/", async (req, res) => {  //Crear un nuevo producto en la colección de productos.
    try {
        const { category, image, name, price } = req.body;
        if (!category || !image || !name || !price) {
            return res.status(400).json({
                message: "Datos inválidos. Asegúrate de enviar los datos requeridos"
            });
        }
        const sql = 'INSERT INTO products (category, image, name, price) VALUES (?, ?, ?, ?)';
        const [result] = await connection.query(sql, [category, image, name, price]);
        res.status(201).json({
            message: "Producto insertado correctamente",
            productId: result.insertId,
            data: { category, image, name, price }
        });
    } catch (error) {
        console.error("Error al procesar el producto:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

router.put("/:id", validateId, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category, image } = req.body;

        if (!name || !price || !category || !image) {
            return res.status(400).json({
                message: "Datos inválidos. Asegúrate de enviar los datos requeridos"
            });
        }
        
        const sql = "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, image = ? WHERE id = ?";
        const [result] = await connection.query(sql, [name, description, price, stock, category, image, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

router.delete("/:id", validateId, async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM products WHERE id = ?";
        const [result] = await connection.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            message: "Producto eliminado correctamente"
        });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

export default router;