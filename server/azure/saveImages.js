const mysql = require("mysql2/promise");
const { Buffer } = require("buffer");

module.exports = async function (context, req) {
    try {
        let { descripcion, fileContent, fileName } = req.body;

        if (!fileContent || !fileName || !descripcion) {
            context.res = { status: 400, body: "Faltan datos requeridos." };
            return;
        }

        // Configurar conexión a MySQL
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,     
            user: process.env.DB_USER,     
            password: process.env.DB_PASS,  
            database: process.env.DB_NAME  
        });

        // Convertir Base64 a Buffer
        const buffer = Buffer.from(fileContent, "base64");

        // Guardar en Azure Blob Storage
        context.bindings.outputBlob = buffer;

        // URL del archivo en Blob Storage
        const storageAccountName = "conferenciasemis";
        const containerName = "archivos";
        const fileUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName}`;

        // Guardar en MySQL
        const query = "INSERT INTO archivos (descripcion, url_archivo) VALUES (?, ?)";
        await connection.execute(query, [descripcion, fileUrl]);

        // Cerrar conexión
        await connection.end();

        context.res = {
            status: 200,
            body: { message: "Archivo guardado con éxito", fileUrl }
        };

    } catch (error) {
        context.log(error.message);
        context.res = { status: 500, body: error.message };
    }
};
