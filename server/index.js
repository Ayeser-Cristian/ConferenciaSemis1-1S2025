const express = require("express");
const pool = require("./config/db");
require("dotenv").config();
const cors = require("cors");  

const app = express();
const PORT = 3001;

app.use(cors()); 

// Obtener todas las imágenes de la db de AWS
app.get("/imagenes", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM imagenes");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener imágenes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener todos los archivos de la db de AWS
app.get("/archivos", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM archivos");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener textos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


// Prueba de Conexión
app.get("/conection", async (req, res) => {
    try {
        
        res.json(
            {
                "status": "Conexión Exitosa"
            }
        );
    } catch (error) {
        console.error("Error al obtener textos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
