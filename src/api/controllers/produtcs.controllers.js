import connection from "../database/db.js";
import products from "../models/products.models.js";

//get
export const getAllProducts = async (req, res) => { // Obtener una lista de todos los productos.
        try { //exporte esta logica de la base de datos a "models":
            //let sql = "SELECT * FROM products";  
            //const [rows] = await connection.query(sql);
            const [rows] = await products.SelectAllProducts();
            res.status(200).json({
                payload: rows,
                message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados",
            });
        } catch (error) {
            console.error("Error obtenido al procesar la consulta:", error);
            res.status(500).json({
                error: "Error al obtener los productos",
            });
        }
}

//get products by id:
export const getProductById = async (req, res) => {
    try { //exportado a models
            const { id } = req.params;
            //let sql = `SELECT * FROM products WHERE id_producto = ?`;
            //const [rows] = await connection.query(sql, [id]);
            const [rows] = await products.SelectProductFromId(id);
            
            if (rows.length > 0) {
                res.status(200).json({
                    payload: rows[0],
                    message: 'Producto encontrado'
                });
            } else {
                res.status(404).json({
                    error: `No se encontró producto con ID ${id}`
                });
            }
        } catch(error) {
            console.error("Error obteniendo el producto", error);
            res.status(500).json({
                error: "Error interno del servidor al obtener producto",
                details: error.message
            });
        }
}

//Post //crear nuevo producto
export const createProduct =  async (req, res) => {  //Crear un nuevo producto en la colección de productos.
    try {
        const { category, image, name, price } = req.body;
        if (!category || !image || !name || !price) {
            return res.status(400).json({
                message: "Datos inválidos. Asegúrate de enviar los datos requeridos"
            });
        }
        const [result] = await products.insertNewProduct(category, image, name, price);
        //const sql = 'INSERT INTO products (category, image, name, price) VALUES (?, ?, ?, ?)';
        //const [result] = await connection.query(sql, [category, image, name, price]);
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
}

//modify product // put
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category, image } = req.body;

        if (!name || !price || !category || !image) {
            return res.status(400).json({
                error: "Faltan campos obligatorios"
            });
        }

        let sql = `
            UPDATE products
            SET name = ?, price = ?, category = ?, image = ?
            WHERE id_producto = ?
        `;

        let [result] = await connection.query(sql, [name, price, category, image, id]);

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se actualizó el producto"
            });
        }

        res.status(200).json({
            message: "Producto actualizado"
        });

    } catch (error) {
        console.error("Error actualizando el producto", error);
        res.status(500).json({
            error: "Error interno del servidor al actualizar producto",
        });
    }
};

//delete //Remove Product
export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await products.deleteProduct(id);

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
}
