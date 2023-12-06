import React from "react";
import { useState } from "react";
import { Carousel, Button } from "react-bootstrap";

export const Home = () => {
  const [contactInfo, setContactInfo] = useState({
    // Aquí puedes agregar la información de contacto
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
    // Función para manipular el contacto si es necesario
  };

  return (
    <div>
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://scontent.fmxl1-1.fna.fbcdn.net/v/t39.30808-6/272825895_4580286292080462_1397370603379805658_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9534ce&_nc_ohc=xJ7wWmg76vkAX-HShkz&_nc_oc=AQlBL62JkG5YXpcYH2Mj2h5efjzcmwwBoapKeMTsDwb-5HTgrAEdQBW7acVJ7VqNhMQ2MXyH3sZyMsVhrhptjmsG&_nc_ht=scontent.fmxl1-1.fna&cb_e2o_trans=t&oh=00_AfDjznCpuRMz3F9-Hh9WGQjJobpDppicJkHhv5cMN72Q7g&oe=65759A5D" className="d-block w-100" alt="Slide 1" />
          
        </div>
        <div className="carousel-item">
          <img src="https://scontent.fmxl1-1.fna.fbcdn.net/v/t39.30808-6/339018749_624298312454425_5235373230029821303_n.jpg?_nc_cat=&ccb=1-7&_nc_sid=3635dc&_nc_ohc=gllTBwi1P_QAX8i6OrW&_nc_ht=scontent.fmxl1-1.fna&cb_e2o_trans=t&oh=00_AfDFfSgf2tc9_V6qUzg4SfZ1Y3plXH15xnh3uK141R6yBg&oe=6575CC8C" className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="https://scontent.fmxl1-1.fna.fbcdn.net/v/t39.30808-6/299089338_5145917332184019_878055312932740422_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3635dc&_nc_ohc=pq-YAZepSeoAX_v08FO&_nc_ht=scontent.fmxl1-1.fna&cb_e2o_trans=t&oh=00_AfAZ3o6P9A_k8zXGCF3jJuakiKUFIqS0KkkcbfIb9J42Uw&oe=657608AC" className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="https://scontent.fmxl1-1.fna.fbcdn.net/v/t39.30808-6/299102230_5145912055517880_2713945587767683649_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3635dc&_nc_ohc=JaOS1h9j7_oAX8CPzST&_nc_ht=scontent.fmxl1-1.fna&cb_e2o_trans=t&oh=00_AfBEWrHQjI85VypjmBqpWfvRzgbYbU3FBHj_c7HKpcVH7Q&oe=6575BF7F" className="d-block w-100" alt="Slide 2" />
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
              src="https://lh3.googleusercontent.com/p/AF1QipMVuJvBC1j3K0OEn9pHsfBoBp5nSbPXecCgdEFq=s680-w680-h510"
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
              src="https://lh3.googleusercontent.com/p/AF1QipNa1VLlpCx6MQiXTUTKI15c3bQnjMpygJ959TV3=s680-w680-h510"
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
            {/* Agrega más información de contacto si es necesario */}
          </div>
          {/* Agrega más columnas o información de contacto si es necesario */}
        </div>
      </div>
    </div>
  </div>
  );
};

