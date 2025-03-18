import { Link } from "react-router-dom";
import { useState } from "react";
import "./styles/navBar.css";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <img 
          src="https://www.pngall.com/wp-content/uploads/12/Green-Check-PNG-Free-Image.png" 
          alt="Logo" 
          className="logo"
        />

        <div className={`menu ${isOpen ? "open" : ""}`}>
          <Link to="/imagen" className="nav-link" onClick={() => setIsOpen(false)}>Imagen</Link>
          <Link to="/galeria" className="nav-link" onClick={() => setIsOpen(false)}>Galeria</Link>
          <Link to="/texto" className="nav-link" onClick={() => setIsOpen(false)}>Subir Docs</Link>
          <Link to="/archivos" className="nav-link" onClick={() => setIsOpen(false)}>Archivos</Link>
          
          
        </div>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
}
