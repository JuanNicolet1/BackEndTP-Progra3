import express from "express";
import enviroments from "./src/api/config/enviroments.js"; //exportaciones necesarias
// import connection from "./src/api/database/db.js";  //exportacion de la base de datos para la conexion.
import cors from "cors";
import { productRoutes, viewRoutes } from "./src/api/routes/index_barril.js";
// Importamos las rutas de producto y vistas
import {join, __dirname} from "./src/api/utils/index.js";

const PORT = enviroments.port;
const app = express();

// Middlewares necesarios
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Configuramos EJS como motor de plantilla
app.set("view engine", "ejs");
// Definimos donde se estan almacenando las plantillas .ejs con join combinamos el directorio raiz con src/views
app.set("views", join(__dirname, "src/views"));
// Configuramos Express para sirva archivos estaticos desde la carpeta public/, style.css o logo.png seran accesibles desde HTTP
app.use(express.static(join(__dirname, "src/public")));

// Hace console.log de lo que haga (si hago un get, da GET/producto)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

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

app.use("/dashboard", viewRoutes); // Rutas vistas

app.use("/products", productRoutes); // Rutas productos

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