import { useState, useEffect } from "react";
import "./styles/cards.css";

interface Textos {
    id: number;
    descripcion: string;
    url_archivo: string;
}

export default function Archivos() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [ListaTextos, setListaTextos] = useState<Textos[]>([]);

    useEffect(() => {
        const fetchTextos = async () => {
            try {

                const response = await fetch(`${API_URL}/archivos`);

                if (!response.ok) {
                    throw new Error("Error al obtener textos");
                }
                const data = await response.json(); 

                setListaTextos(data); 
            } catch (error) {
                console.error("Error al obtener textos:", error);
            }
        };

        fetchTextos();
    }, []); 



    return (
        <div className="cards-container">
            <h2>Textos</h2>
            <div className="cards-grid">
                {ListaTextos.map((texto) => (
                    <div key={texto.id} className="box-card">
                        <a href={texto .url_archivo} target="_blank" rel="noreferrer">
                            <img src="https://images.icon-icons.com/3376/PNG/512/download_icon_212139.png" style={{width:"20%"}} alt={texto.url_archivo} />
                        </a>
                        <h3>{texto.descripcion}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
