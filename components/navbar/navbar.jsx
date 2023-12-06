import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand-center" href="/Home">
            <img src="./img/icon.png" alt="Logo" width="60" height="40" />
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor04">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/Home">Inicio
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/menu">Menú</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Reservar">Reservar</a>
              </li>
            </ul>
            <form className="d-flex">
              <a className="nav-link" href="#" onClick={openModal}>
                <img src="./img/carrito.ico" alt="Logo" width="33" height="30" />
              </a>
            </form>
          </div>
        </div>
      </nav>

      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" style={{ borderRadius: '10px' }}>
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#343a40', color: 'white', borderBottom: '1px solid #dee2e6' }}>
              <h5 className="modal-title" style={{ marginBottom: '0' }}>PEDIDO</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              {/* Aquí puedes agregar el contenido de tu carrito de compras */}
              <p>Contenido del carrito...</p>
            </div>
            <div className="modal-footer" style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
              <button type="button" className="btn-close btn-close-white" onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
