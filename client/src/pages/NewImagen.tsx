import { useState, useRef } from "react";
import "./styles/form.css";

export default function Home() {
    const API_URL_IMAGE = import.meta.env.VITE_API_IMAGE_URL;

    const [descripcion, setDescripcion] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Función para convertir la imagen a Base64
    const convertToBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                //Usamos split para separar en dos partes
                //Es decir quitamos la parte de "data:image/png;base64" y nos quedamos con el contenido en base64
                const base64String = reader.result?.toString().split(",")[1];
                resolve(base64String || null);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!descripcion || !image) {
            alert("Por favor ingresa una descripción y selecciona una imagen.");
            return;
        }

        try {
            // Convertir la imagen a Base64
            const base64Image = await convertToBase64(image);

            if (!base64Image) {
                alert("Error al convertir la imagen.");
                return;
            }

            const payload = {
                descripcion,
                image: base64Image,
                fileName: `${Date.now()}-${image.name}`, //Nombre unico para la imagen
            };
            const response = await fetch(`${API_URL_IMAGE}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Error al enviar la actividad.");
            }

            const data = await response.json();
            console.log("Respuesta:", data);
            setDescripcion("");
            setImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            alert("Actividad subida con éxito");
        } catch (error) {
            console.error("Error al enviar la actividad:", error);
            alert("Hubo un problema al subir la actividad.");
        }
    };

    return (
        <div className="main-form">
            <div className="form-container">
                <h2>Ingresar Foto</h2>
                <form onSubmit={handleSubmit}>
                    <label>Descripción</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                    <label>Cargar imagen:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        ref={fileInputRef}
                        required
                    />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
}
