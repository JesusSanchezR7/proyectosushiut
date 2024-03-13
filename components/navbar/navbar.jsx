import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import iconImage from "/icon.png";

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <a className="navbar-brand-center" href="/Home">
          <img src={iconImage} alt="Logo" width="70" height="40" />          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor04"
            aria-controls="navbarColor04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor04">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link " href="/Home">
                  Inicio
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/menu">
                  Menú
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/Reservar">
                  Reservaciones
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="">
                  
                </a>
              </li>
            </ul>
            <div class="d-flex align-items-center">
              <a
                data-mdb-ripple-init
                class="btn btn-primary me-3"
                href="/"
                role="button"
              >
                Salir
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
