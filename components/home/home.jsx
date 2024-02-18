import React from "react";
import { useState } from "react";
import { Carousel, Button } from "react-bootstrap";

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
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="./img/fondo2.jpg" className="d-block w-100" alt="Slide 1" />
          
        </div>
        <div className="carousel-item">
          <img src="./img/fondo1.jpg" className="d-block w-100" alt="Slide 2" />
        </div>
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
      <h1 style={{ textAlign: "center", marginTop: "40px" }}>BIENVENIDO AL SEÑOR SUSHI</h1>
      <p style={{ textAlign: "center", fontSize: "1.2em", fontStyle: "italic" }}>
        Disfruta de la exquisitez oriental en cada bocado con Señor Sushi, donde la tradición se fusiona con el sabor contemporáneo.
      </p>

      <div className="container mt-4">
        <Carousel interval={null} style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Carousel.Item style={carouselItemStyle}>
            <img
              className="d-block w-100"
              src="../img/tienda1.jpg"
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
              src="../img/tienda2.jpg"
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
      <img src="./img/promocion.png" alt="Descripción de la imagen" />
    </div>
      <div className="container mt-4" style={contactStyle}>
        <div className="row">
          <div className="col-md-6">
            <h2>Contacto</h2>
            <p>
              Teléfono: {contactInfo.phone} <br />
              Email: {contactInfo.email} <br />
              Dirección: {contactInfo.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

