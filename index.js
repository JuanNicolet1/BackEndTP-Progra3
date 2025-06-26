import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import connection from "./src/api/database/db.js";

const PORT = enviroments.port;
const app = express();

app.get("/", (req, res) => {
    res.send("Hola Mundo");
})

// Traer todos los productos
app.get("/producto", async (req, res) => {
    let sql = `SELECT * FROM producto`; // Crea la sentencia sql
    const resultado = await connection.query(sql); // Ejecuta la sentencia

    console.log(resultado);
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})