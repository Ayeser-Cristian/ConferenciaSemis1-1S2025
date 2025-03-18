CREATE DATABASE IF NOT EXISTS mi_almacenamiento;

USE mi_almacenamiento;

CREATE TABLE IF NOT EXISTS imagenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    url_imagen TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS archivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    url_archivo TEXT NOT NULL
);
