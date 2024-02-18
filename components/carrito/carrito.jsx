import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";

export const Carrito = () => {
  const [producto, setProducto] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = "a0BHs00000XHhf4MAD"; // Aquí debes definir el ID específico que necesitas
      const requestOptions = {
        method: "GET",
        headers: {
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
        },
      };
      try {
        const data = await fetch(`${import.meta.env.VITE_API_KART}/${productId}`, requestOptions);
        const productData = await data.json();
        setProducto(productData);
        //console.log(productData); 
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // Llama a la función para obtener el producto al cargar el componente
    fetchProduct();
  }, []); 

  const calcularTotal = () => {
    if (producto) {
      const nuevoTotal = parseFloat(producto.Precio__c);
      setTotal(nuevoTotal);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Carrito de Compras</h1>
      {producto && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{producto.Id}</h5>
            <p className="card-text">Precio: ${producto.Precio__c}</p>
          </div>
        </div>
      )}
      <div className="mt-4">
        <button className="btn btn-danger" onClick={calcularTotal}>
          Calcular Total
        </button>
        {total > 0 && (
          <div className="mt-3">
            <h5>Total a pagar: ${total}</h5>
          </div>
        )}
      </div>
      <br />
      <a href="/DatosEnvio" className="btn btn-outline-danger">
        Continuar
      </a>
    </div>
  );
};
