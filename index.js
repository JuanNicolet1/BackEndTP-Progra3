import express from "express";
import enviroments from "./src/api/config/enviroments.js"; //exportaciones necesarias
import connection from "./src/api/database/db.js";  //exportacion de la base de datos para la conexion.
import cors from "cors";

const PORT = enviroments.port;
const app = express();

// Middlewares necesarios
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Middleware para CORS
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
*/

app.get("/", (req, res) => {  //default
    res.send("Hola Mundo");
})

//1// GET - Traer todos los productos:
app.get("/producto", async (req, res) => {
    try {
        let sql = `SELECT * FROM producto`; // Crea la sentencia sql
        const [rows] = await connection.query(sql);

        console.log(rows); // <-- Esto imprime los productos en la consola

        res.status(200).json({ // status 200 quiere decir que salió todo bien
            payload: rows,
            message: rows.length === 0 ? 'No se encontraron productos': 'Productos encontrados'
        });
    } catch(error) {
        console.error("Error obteniendo los productos", error);
        res.status(500).json({ // status 500 es un error del servidor
            error: "Error interno del servidor al obtener productos",
            details: error.message
        });
    }
});

//2// GET - Traer un producto específico por ID:
app.get("/producto/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let sql = `SELECT * FROM producto WHERE id_producto = ?`;
        const [rows] = await connection.query(sql, [id]);

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
});

//3// POST - Crear nuevo producto:
app.post("/producto", async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;
        
        // Validar datos requeridos
        if (!nombre || !precio) {
            return res.status(400).json({
                error: "Nombre y precio son obligatorios"
            });
        }

        let sql = `INSERT INTO producto (Nombre, Precio, Tipo) VALUES (?, ?, ?)`;
        const [result] = await connection.query(sql, [nombre, precio, tipo]);

        // Obtener el producto creado
        const [productoCreado] = await connection.query(`SELECT * FROM producto WHERE id_producto = ?`, [result.insertId]);

        res.status(201).json({
            payload: productoCreado[0],
            message: 'Producto creado exitosamente'
        });
    } catch(error) {
        console.error("Error creando el producto", error);
        res.status(500).json({
            error: "Error interno del servidor al crear producto",
            details: error.message
        });
    }
});

//4// PUT - Actualizar producto:
app.put("/producto/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;
        
        // Validar que el producto existe
        const [productoExistente] = await connection.query(`SELECT * FROM producto WHERE id_producto = ?`, [id]);
        
        if (productoExistente.length === 0) {
            return res.status(404).json({
                error: `No se encontró producto con ID ${id}`
            });
        }

        let sql = `UPDATE producto SET Nombre = ?, Precio = ?, Tipo = ? WHERE id_producto = ?`;
        await connection.query(sql, [nombre, precio, tipo]);

        // Obtener el producto actualizado
        const [productoActualizado] = await connection.query(`SELECT * FROM producto WHERE id_producto = ?`, [id]);

        res.status(200).json({
            payload: productoActualizado[0],
            message: 'Producto actualizado exitosamente'
        });
    } catch(error) {
        console.error("Error actualizando el producto", error);
        res.status(500).json({
            error: "Error interno del servidor al actualizar producto",
            details: error.message
        });
    }
});

//5// DELETE - Eliminar producto:
app.delete("/producto/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar que el producto existe
        const [productoExistente] = await connection.query(`SELECT * FROM producto WHERE id_producto = ?`, [id]);
        
        if (productoExistente.length === 0) {
            return res.status(404).json({
                error: `No se encontró producto con ID ${id}`
            });
        }

        let sql = `DELETE FROM producto WHERE id_producto = ?`;
        await connection.query(sql, [id]);

        res.status(200).json({
            message: 'Producto eliminado exitosamente',
            payload: productoExistente[0]
        });
    } catch(error) {
        console.error("Error eliminando el producto", error);
        res.status(500).json({
            error: "Error interno del servidor al eliminar producto",
            details: error.message
        });
    }
});

// Ruta de prueba para verificar que el servidor funciona
app.get("/test", (req, res) => {
    res.json({ message: "Servidor funcionando correctamente" });
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware para manejar errores globales
app.use((error, req, res, next) => {
    console.error("Error global:", error);
    res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})