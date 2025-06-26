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
    // Manejo de errores con try/catch
    try{
      let sql = `SELECT * FROM producto`; // Crea la sentencia sql
      const [rows] = await connection.query(sql); // Ejecuta la sentencia. [rows] extrae las filas

      res.status(200).json({ // status 200 quiere decir que salió todo bien
          payload: rows,
          message: rows.length === 0 ? 'No se encontraron usuarios': 'Usuarios encontrados'
    })
    } catch(error) {
        console.error("Error obteniendo los productos", error);
        res.status(500).json({ // status 500 es un error del servidor
            error: "Error interno del servidor al obtener productos" // Lo que ve el cliente
        })
    }
    //const resultado = await connection.query(sql);
    // console.log(resultado);
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})