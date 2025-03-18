import { useState, useRef } from "react";
import "./styles/form.css";

export default function UploadTxt() {
    const API_URL_FILE = import.meta.env.VITE_API_FILE_URL;

    const [descripcion, setDescripcion] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Función para convertir el archivo a Base64
    const convertFileToBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // Eliminamos la parte de "data:text/plain;base64," y dejamos solo el contenido Base64
                const base64String = reader.result?.toString().split(",")[1];
                resolve(base64String || null);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!descripcion || !file) {
            alert("Por favor ingresa una descripción y selecciona un archivo .txt.");
            return;
        }

        try {
            const base64File = await convertFileToBase64(file);

            if (!base64File) {
                alert("Error al convertir el archivo.");
                return;
            }
            const payload = {
                descripcion,
                fileContent: base64File, 
                fileName: `${Date.now()}-${file.name}`, // Nombre único para el archivo
            };

            const response = await fetch(`${API_URL_FILE}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Error al subir el archivo.");
            }

            const data = await response.json();
            console.log("Respuesta:", data);

            setDescripcion("");
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            alert("Archivo subido con éxito");
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            alert("Hubo un problema al subir el archivo.");
        }
    };

    return (
        <div className="main-form">
            <div className="form-container">
                <h2>Subir Archivo TXT</h2>
                <form onSubmit={handleSubmit}>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />

                    <label>Seleccionar archivo:</label>
                    <input
                        type="file"
                        accept=".txt"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        required
                    />

                    <button type="submit">Subir Archivo</button>
                </form>
            </div>
        </div>
    );
}
