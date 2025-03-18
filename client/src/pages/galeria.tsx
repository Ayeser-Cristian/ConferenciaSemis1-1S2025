import { useState, useEffect } from "react";
import "./styles/cards.css";

interface Fotos {
    id: number;
    descripcion: string;
    url_imagen: string;
}

export default function Galeria() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [ListaFotos, setListaFotos] = useState<Fotos[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${API_URL}/imagenes`);

                if (!response.ok) {
                    throw new Error("Error al obtener actividades");
                }

                const data = await response.json(); 

                setListaFotos(data);
            } catch (error) {
                console.error("Error al obtener actividades:", error);
            }
        };
        fetchActivities(); 
    }, []);  

    return (
        <div className="cards-container">
            <h2>Galeria</h2>
            <div className="cards-grid">
                {ListaFotos.map((foto) => (
                    <div key={foto.id} className="box-card">
                        <img src={foto.url_imagen} alt={foto.url_imagen} />
                        <h3>{foto.descripcion}</h3>
                    </div>
                ))}
            </div>
        </div>

    );
}
