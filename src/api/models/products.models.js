import connection from "../database/db.js";

const SelectAllProducts = async() => {
    let sql = "SELECT * FROM products";
    return await connection.query(sql);
}

const SelectProductFromId = async (id) => {
    let sql = `SELECT * FROM products WHERE id_producto = ?`;
    return await connection.query(sql, [id]);
}


const insertNewProduct = async (category, image, name, price) => {
    const sql = 'INSERT INTO products (category, image, name, price) VALUES (?, ?, ?, ?)';
    return await connection.query(sql, [category, image, name, price]);
}

const deleteProduct = async (id) => {
    const sql = "DELETE FROM products WHERE id_producto = ?";
    return await connection.query(sql, [id]);
}


export default {
    SelectAllProducts,
    SelectProductFromId,
    insertNewProduct,
    deleteProduct
    
}