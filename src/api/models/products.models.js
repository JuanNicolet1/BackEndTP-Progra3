import connection from "../database/db.js";

// Modelo para obtener todos los productos
const SelectAllProducts = async() => {
    let sql = "SELECT * FROM products";
    return await connection.query(sql);
}

// Modelo para obtener un producto por su ID
const SelectProductFromId = async (id) => {
    let sql = `SELECT * FROM products WHERE id_producto = ?`;
    return await connection.query(sql, [id]);
}

// Modelo para insertar un nuevo producto
const insertNewProduct = async (category, image, name, price) => {
    const sql = 'INSERT INTO products (category, image, name, price) VALUES (?, ?, ?, ?)';
    return await connection.query(sql, [category, image, name, price]);
}

// Modelo para eliminar un producto por su ID
const deleteProduct = async (id) => {
    const sql = "DELETE FROM products WHERE id_producto = ?";
    return await connection.query(sql, [id]);
}

// Exporta todas las funciones del modelo
export default {
    SelectAllProducts,
    SelectProductFromId,
    insertNewProduct,
    deleteProduct
}