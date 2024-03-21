import React, { useState } from 'react';
import './Content.css'; // Archivo CSS para los estilos
import foto1 from "../../../assets/2.jpeg";
import foto2 from "../../../assets/1.jpeg";
import foto3 from "../../../assets/3.jpeg";
const Content = () => {
  return (
    <div className="slider-container">
      <div className="slider">
        <img
          src={foto1}
          alt="Imagen 1"
        />
        <img
          src={foto2}
          alt="Imagen 2"
        />
        <img
          src={foto3}
          alt="Imagen 3"
        />
      </div>
    </div>
  );
};

export default Content;

