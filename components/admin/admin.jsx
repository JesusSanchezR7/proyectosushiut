import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import "./admin.css";

export const Admin = () => {
  const [products, setProducts] = useState([]);
  const [showProductPutModal, setShowProductPutModal] = useState(false);
  const [showProductPostModal, setShowProductPostModal] = useState(false);
  const [productToPut, setProductToPut] = useState([]);
  const [productToPost, setProductToPost] = useState([]);

  const productList = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      },
    };
    try {
      const data = await fetch(import.meta.env.VITE_API_MENU, requestOptions);
      const productsData = await data.json();
      setProducts(productsData["data"]);
    } catch (error) {
      console.error("Error products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductToPut({
      ...productToPut,
      [name]: value,
    });
  };

  const handlePostInputChange = (e) => {
    const { name, value } = e.target;
    setProductToPost({
      ...productToPost,
      [name]: value,
    });
  };

  const deleteProduct = async (productId) => {
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
        `${import.meta.env.VITE_API_MENU}/${productId}`,
        requestOptions
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("No Borrado");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const putProduct = async (productToPut) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      },
      body: JSON.stringify({
        Id: productToPut.Id,
        Nombre: productToPut.Nombre__c,
        Precio: parseInt(productToPut.Precio__c),
        Porciones: parseInt(productToPut.Porciones__c),
        Tiempo: productToPut.Tiempo_de_preparacion__c,
        Imagen: productToPut.Imagen__c,
      }),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_MENU}/${productToPut.Id}`,
        requestOptions
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("No Editado");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postProduct = async (productToPost) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      },
      body: JSON.stringify({
        Nombre: productToPost.Nombre__c,
        Precio: parseInt(productToPost.Precio__c),
        Porciones: parseInt(productToPost.Porciones__c),
        Tiempo: productToPost.Tiempo_de_preparacion__c,
        Imagen: productToPost.Imagen__c,
      }),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_MENU}`,
        requestOptions
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("No Creado");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProduct = async (productId) => {
    const foundProduct = products.find((products) => products.Id === productId);
    if (foundProduct) {
      setProductToPut(foundProduct);
    } else {
      console.log("Product not found.");
    }
  };

  useEffect(() => {
    productList();
  }, []);

  const handleShowProductPutModal = async (productId) => {
    await getProduct(productId);
    setShowProductPutModal(true);
  };

  const handleCloseProductPutModal = () => {
    setShowProductPutModal(false);
  };

  const handleShowProductPostModal = async () => {
    setShowProductPostModal(true);
  };

  const handleCloseProductPostModal = () => {
    setShowProductPostModal(false);
  };

  return (
    <div>

      <div class="btn-group btn-group-lg">
        <button type="button" class="btn btn-primary"  onClick={() => {  window.location.href = '/adminreservaciones';  }}>ADMIN RESERVACIONES</button>
        <button type="button" class="btn btn-primary"  onClick={() => {  window.location.href = '/admincocina';  }}>COCINA</button>
        <button type="button" class="btn btn-success"   onClick={() => handleShowProductPostModal()} >Añadir Nuevo Producto</button>
      </div>

      <h1 class="reservation-title"></h1>

      <div class="card">
    <div class="card-header">
      <a class="btn" data-bs-toggle="collapse" href="#collapseOne">
         PRODUCTOS
      </a>
    </div>
    <div id="collapseOne" class="collapse show" data-bs-parent="#accordion">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Porciones</th>
            <th>Preparacion</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="col">
              <td>
                <img src={product.Imagen__c} width="50px" />
              </td>
              <td>{product.Id}</td>
              <td>{product.Nombre__c}</td>
              <td>{product.Precio__c}</td>
              <td>{product.Porciones__c}</td>
              <td>{product.Tiempo_de_preparacion__c}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => handleShowProductPutModal(product.Id)}
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product.Id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

      
      <Modal show={showProductPutModal} onHide={handleCloseProductPutModal}>
        <Modal.Header closeButton>
          <Modal.Title>EDITAR PRODUCTO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToPut && (
            <form>
              <div className="text-center">
                <img
                  src={productToPut.Imagen__c}
                  width="135px"
                  className="mx-auto d-block border border-dark"
                  alt="Product Image"
                />
              </div>{" "}
              <div className="form-group">
                <label>ID:</label>
                <input
                  type="text"
                  className="form-control"
                  value={productToPut.Id}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Nombre__c"
                  value={productToPut ? productToPut.Nombre__c : ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Precio:</label>
                <input
                  type="number"
                  className="form-control"
                  name="Precio__c"
                  value={productToPut ? productToPut.Precio__c : ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Porciones:</label>
                <input
                  type="number"
                  className="form-control"
                  name="Porciones__c"
                  value={productToPut ? productToPut.Porciones__c : ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Tiempo de preparacion:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Tiempo_de_preparacion__c"
                  value={
                    productToPut ? productToPut.Tiempo_de_preparacion__c : ""
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Imagen(Link)</label>
                <input
                  type="text"
                  className="form-control"
                  name="Imagen__c"
                  value={productToPut ? productToPut.Imagen__c : ""}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => putProduct(productToPut)}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCloseProductPutModal}
          >
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={showProductPostModal} onHide={handleCloseProductPostModal}>
        <Modal.Header closeButton>
          <Modal.Title>CREAR PRODUCTO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToPost && (
            <form>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Nombre__c"
                  placeholder="Nombre"
                  value={productToPost ? productToPost.Nombre__c : ""}
                  onChange={handlePostInputChange}
                />
              </div>
              <div className="form-group">
                <label>Precio:</label>
                <input
                  type="number"
                  className="form-control"
                  name="Precio__c"
                  placeholder="Precio"
                  value={productToPost ? productToPost.Precio__c : ""}
                  onChange={handlePostInputChange}
                />
              </div>
              <div className="form-group">
                <label>Porciones:</label>
                <input
                  type="number"
                  className="form-control"
                  name="Porciones__c"
                  placeholder="Porciones"
                  value={productToPost ? productToPost.Porciones__c : ""}
                  onChange={handlePostInputChange}
                />
              </div>
              <div className="form-group">
                <label>Tiempo de preparacion:</label>
                <input
                  type="text"
                  className="form-control"
                  name="Tiempo_de_preparacion__c"
                  placeholder="Tiempo de preparacion"
                  value={
                    productToPost ? productToPost.Tiempo_de_preparacion__c : ""
                  }
                  onChange={handlePostInputChange}
                />
              </div>
              <div className="form-group">
                <label>Imagen(Link)</label>
                <input
                  type="text"
                  className="form-control"
                  name="Imagen__c"
                  placeholder="Imagen(Link)"
                  value={productToPost ? productToPost.Imagen__c : ""}
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
