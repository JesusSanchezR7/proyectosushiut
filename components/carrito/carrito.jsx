import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";

export const Carrito = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Producto 1", precio: 10 },
    { id: 2, nombre: "Producto 2", precio: 15 },
    { id: 3, nombre: "Producto 3", precio: 20 },
    // Puedes agregar más productos aquí
  ]);

  const [total, setTotal] = useState(0);

  const calcularTotal = () => {
    const nuevoTotal = productos.reduce(
      (accumulator, current) => accumulator + current.precio,
      0
    );
    setTotal(nuevoTotal);
  };

  return (
    <div className="container mt-4">
      <h1>Carrito de Compras</h1>
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">Precio: ${producto.precio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="btn btn-danger" onClick={calcularTotal}>
          Calcular Total
        </button>
        {total > 0 && (
          <div className="mt-3">
            <h5>Total a pagar: ${total}</h5>
          </div>
        )}
      </div><br></br>
        <a href="/DatosEnvio" class="btn btn-outline-danger">Continuar</a>
    </div>
  );
};
