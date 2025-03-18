import { Routes, Route, Navigate } from "react-router-dom";
/*Páginas de la aplicación */
import NewImagen from "../pages/NewImagen";
import Galeria from "../pages/galeria";
import NewTxt from "../pages/NewTxt";
import Archivos from "../pages/archivos";
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/imagen" />} />
            <Route path="/imagen" element={<NewImagen />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/archivos" element={<Archivos />} />
            <Route path="/texto" element={<NewTxt />} />
        </Routes>
    );
}


