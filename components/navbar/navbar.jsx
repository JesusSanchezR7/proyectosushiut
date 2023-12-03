import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const Navbar = () => {
  return (
    <div className="Navbar">
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
  <a className="navbar-brand-center" href="/Home">
            <img src="/favicon.ico" alt="Logo" width="33" height="30" />
          </a> 

          
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor04">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" href="/Home">Inicio
            <span class="visually-hidden">(current)</span>
          </a>
        </li>
      
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menú
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/Charolas">Charolas</a>
          <a className="dropdown-item" href="/Combos">Combos</a>
          <a className="dropdown-item" href="/Entradas">Entradas</a>
          <a className="dropdown-item" href="/Hamburguesas">Hamburguesas</a>
          <a className="dropdown-item" href="/Ramen">Ramen</a>
          <a className="dropdown-item" href="/Sushi">Sushi</a>
          <a className="dropdown-item" href="/Sushivip">Sushi VIP</a>
          <a className="dropdown-item" href="/Teriyaki">Teriyaki</a>
          <a className="dropdown-item" href="/Wings">Wings</a>
        </div>
      </li>
        <li class="nav-item">
          <a class="nav-link" href="/Reservar">Reservar</a>
        </li>
      </ul>
      <form class="d-flex">

      <a className="nav-link" href="/Carrito">
      <img src="./img/carrito.ico" alt="Logo" width="33" height="30" />
            </a>
      </form>
    </div>
  </div>
</nav>

  </div>
  );
};


