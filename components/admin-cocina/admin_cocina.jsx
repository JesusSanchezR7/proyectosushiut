import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";
import { Modal } from "react-bootstrap";

export const Admin_cocina = () => {
  const [products, setProducts] = useState([]);
  const [showProductPostModal, setShowProductPostModal] = useState(false);
  const [productToPost, setProductToPost] = useState({});

  const productList = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      },
    };
    try {
      const data = await fetch(import.meta.env.VITE_API_ORDENES, requestOptions);
      const productsData = await data.json();
      setProducts(productsData["data"]);
    } catch (error) {
      console.error("Error al obtener las reservaciones:", error);
    }
  };

  const handlePostInputChange = (e) => {
    const { name, value } = e.target;
    setProductToPost({
      ...productToPost,
      [name]: value,
    });
  };

  const deleteProduct = async (Id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      },
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ORDENES}/${Id}`,
        requestOptions
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("No se pudo eliminar la orden");
      }
    } catch (error) {
      console.error("Error al eliminar la orden:", error);
    }
  };

  const postProduct = async (ordenToPost) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      },
      body: JSON.stringify(ordenToPost),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ORDENES}`,
        requestOptions
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("No se pudo crear la orden");
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  const handleShowProductPostModal = () => {
    setShowProductPostModal(true);
  };

  const handleCloseProductPostModal = () => {
    setShowProductPostModal(false);
  };

  useEffect(() => {
    productList();
  }, []);

  return (
    <div>
      <div className="btn-group btn-group-lg">
        <button type="button" className="btn btn-primary" onClick={() => { window.location.href = '/admin'; }}>ADMIN PRODUCTOS</button>
        <button type="button" className="btn btn-primary" onClick={() => { window.location.href = '/adminreservaciones'; }}>ADMIN RESERVACIONES</button>
        <button type="button" className="btn btn-success" onClick={handleShowProductPostModal}>Crear Orden</button>
      </div>

      <div className="card">
        <div className="card-header">
          <a className="btn" data-bs-toggle="collapse" href="#collapseOne">
            ORDENES 
          </a>
        </div>
        <div id="collapseOne" className="collapse show" data-bs-parent="#accordion">
          <div className="reservation-container">
            {products
              .slice()
              .sort((a, b) => new Date(a.Fecha__c) - new Date(b.Fecha__c))
              .map((product, index) => (
                <div className="reservation-card" key={index}>
                  <div className="reservation-details">
                    <div><strong>ID de Orden:</strong><dl> {product.Id}</dl></div>
                    <div><strong>ID de Usuario:</strong> {product.IdUsuario__c}</div>
                    <div><strong>Productos:</strong> {product.Productos__c}</div>
                    <div><strong>Celular:</strong> {product.Celular__c}</div>
                    <div><strong>Tipo de Entrega:</strong> {product.Tipo_entrega__c}</div>
                    <div><strong>Tipo de Pago:</strong> {product.Tipo_pago__c}</div>
                    <div><strong>Total:</strong> {product.Total__c}</div>
                    <div><strong>Estado:</strong> {product.Estado__c}</div>
                  </div>
                  <button
                    type="button"
                    className="btn-eliminerservervacion"
                    onClick={() => deleteProduct(product.Id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Modal show={showProductPostModal} onHide={handleCloseProductPostModal}>
        <Modal.Header closeButton>
          <Modal.Title>CREEAR UNA ORDEN</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {productToPost && (
            <form>
              <div className="form-group">
                <label>Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  name="IdUsuario"
                  placeholder="Nombre"
                  value={productToPost ? productToPost.IdUsuario : ""}
                  onChange={handlePostInputChange}
                />
              </div>
              <div className="form-group">
                <label>Total</label>
                <input
                  type="number"
                  className="form-control"
                  name="Total"
                  placeholder="Precio"
                  value={productToPost ? productToPost.Total : ""}
                  onChange={handlePostInputChange}
                />
              </div>
              <div className="form-group">
                <label>Tipo pago:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Tipo_pago"
                  placeholder="Efectivo"
                  value={productToPost ? productToPost.Tipo_pago : ""}
                  onChange={handlePostInputChange}
                />
              </div>
              <div className="form-group">
                <label>Tipo entrega</label>
                <input
                  type="text"
                  className="form-control"
                  name="Tipo_entrega"
                  placeholder="Envio - Sucursal"
                  value={
                    productToPost ? productToPost.Tipo_entrega : ""
                  }
                  onChange={handlePostInputChange}
                />
              </div>
              <div className="form-group">
                <label>Celular</label>
                <input
                  type="number"
                  className="form-control"
                  name="Celular"
                  placeholder="000 000 0000"
                  value={productToPost ? productToPost.Celular : ""}
                  onChange={handlePostInputChange}
                />
              </div>
              <div className="form-group">
                <label>Productos</label>
                <input
                  type="text"
                  className="form-control"
                  name="Productos"
                  placeholder=""
                  value={productToPost ? productToPost.Productos : ""}
                  onChange={handlePostInputChange}
                />
              </div>
              <div className="form-group">
                <label>Direccion</label>
                <input
                  type="text"
                  className="form-control"
                  name="Direccion"
                  placeholder=""
                  value={productToPost ? productToPost.Direccion : ""}
                  onChange={handlePostInputChange}
                />
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => postProduct(productToPost)}
          >
            Crear
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCloseProductPostModal}
          >
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
