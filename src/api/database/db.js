// Importamos el modulo mysql2 en modo promesa para usar async/await en la conexión a la Base de Datos MySQL
import mysql from "mysql2/promise"; 

// Traemos los datos de conexión de nuestro archivo de variables de entorno
import enviroments from "../config/enviroments.js";

const { database } = enviroments; // Desestructura la database de enviroments

const connection = mysql.createPool({ //funcion que crea un conjunto de conexiones. 
    host: database.host,
    port: 3000, // Puerto de MySQL en XAMPP
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;