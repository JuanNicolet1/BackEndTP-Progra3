import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Hola Mundo");
})

app.get(3000, () => {
    console.log("Servidor corriendo");
})