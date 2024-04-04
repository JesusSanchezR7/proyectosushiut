import React from "react";
import { useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import fondo1 from "/fondo1.jpg";
import fondo2 from "/fondo2.jpg"; 
import tienda1 from "/tienda1.jpg"; 
import tienda2 from "/tienda2.jpg"; 
import promocion from "/promocion.png"; 
import imagen1 from "/imagen1.png";

import "./home.css";

export const Home = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: "653 517 0396",
    email: "facturasenorsushi@gmail.com",
    address: "C. 43 4300, Progreso, 83458 San Luis Río Colorado, Son.",
    
  });

  const sectionStyle = {
    padding: "20px",
    background: "linear-gradient(to bottom, #FFFFFF)",
    minHeight: "100vh",
  };
  
  const carouselItemStyle = {
    textAlign: "center",
    maxHeight: "400px",
    overflow: "hidden",
    position: "relative",
  };

  const carouselImgStyle = {
    maxHeight: "300px",
    width: "auto",
    margin: "0 auto",
    filter: "brightness(50%)",
  };

  const contactStyle = {
    color: "#333",
    paddingTop: "40px",
  };

  const buttonStyle = {
    backgroundColor: "red",
    border: "none",
    width: "150px",
  };

  const handleContactClick = () => {
    // Función para manipular el contacto 
  };

  return (
    <div>
    <div className="home-container">
    </div>  
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
           <img src={fondo2} className="d-block w-100" alt="Slide 1" />          
        </div>
        <div className="carousel-item">
           <img src={fondo1} className="d-block w-100" alt="Slide 2" /> </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
        <div style={sectionStyle}>
      

      <div className="container mt-4">
        <Carousel interval={null} style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Carousel.Item style={carouselItemStyle}>
            <img
              className="d-block w-100"
                src={tienda1}
              alt="Imagen 1"
              style={carouselImgStyle}
            />
            <Carousel.Caption>
              <h3>Señor Sushi & Teriyaki 2-Go</h3>
              <p>
                <Button
                  variant="primary"
                  href="https://maps.app.goo.gl/LtEq1t23FJxqg3mo6"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleContactClick}
                  style={{ backgroundColor: "red", border: "none", width: "150px" }}
                  block
                >
                  Ir a mapa
                </Button>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={carouselItemStyle}>
            <img
              className="d-block w-100"
              src={tienda2}
              alt="Imagen 1"
              style={carouselImgStyle}
            />
            <Carousel.Caption>
              <h3>Señor Sushi</h3>
              <p>
                <Button
                  variant="primary"
                  href="https://maps.app.goo.gl/4QDxcRM8PpzqDoM1A"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleContactClick}
                  style={{ backgroundColor: "red", border: "none", width: "150px" }}
                  block
                >
                  Ir a mapa
                </Button>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div><br></br>
      <div className="d-flex justify-content-center">
      <img src={promocion} alt="Descripción de la imagen" />
    </div>
              {/* Footer mejorado */}
              <footer style={{ backgroundColor: "#333", color: "#fff", padding: "20px 0", textAlign: "center", marginTop: "40px" }}>
          <div className="container_footer">
            <div className="row">
              <div className="col-md-6">
                <h4>Contacto</h4>
                <p>
                Teléfono: {contactInfo.phone} <br />
                Email: {contactInfo.email} <br />
                Dirección: {contactInfo.address}
              </p>
              </div>
              <div className="col-md-6">
                <h4>Síguenos en Redes Sociales</h4>
                <p>¡No te pierdas nuestras promociones y novedades!</p>
                {/* Agrega aquí los íconos de redes sociales */}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>&copy; 2024 UT_MasterCodi. Todos los derechos reservados.</p>
              </div>
            </div>
          </div>
        </footer>
    </div>

  </div>
  );
};
