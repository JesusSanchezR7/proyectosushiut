import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import "./admin_reservacion.css";

export const Admin_reservacion = () => {
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
      const data = await fetch(import.meta.env.VITE_API_RESERVACION, requestOptions);
      const productsData = await data.json();
      setProducts(productsData["data"]);
    } catch (error) {
      console.error("Error Reservaciones:", error);
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
        `${import.meta.env.VITE_API_RESERVACION}/${Id}`,
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

  const postProduct = async (productToPost) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      },
      body: JSON.stringify({
        Fecha: productToPost.Nombre__c,
        Hora: parseInt(productToPost.Precio__c),
        Personas: parseInt(productToPost.Porciones__c),
        Celular: productToPost.Tiempo_de_preparacion__c,
        Tipo_pago: productToPost.Imagen__c,
        Anotaciones: productToPost.Imagen__c,
        IdUsuario: productToPost.Imagen__c,

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
      console.log("Reservacion not found.");
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
  
  // filtracion de check box 
  const [lugaresSeleccionados, setLugaresSeleccionados] = useState([]);
  
    // Función para manejar el cambio de estado cuando se selecciona un lugar
    const handleCheckboxChange = lugar => {
      if (lugaresSeleccionados.includes(lugar)) {
        // Si ya está seleccionado, lo eliminamos
        setLugaresSeleccionados(lugaresSeleccionados.filter(item => item !== lugar));
      } else {
        // Si no está seleccionado, lo agregamos
        setLugaresSeleccionados([...lugaresSeleccionados, lugar]);
      }
    };
    // Función para verificar si un lugar está seleccionado
    const isLugarSeleccionado = lugar => lugaresSeleccionados.includes(lugar);
    // Función para verificar si ningún lugar está seleccionado
    const noHayLugaresSeleccionados = lugaresSeleccionados.length === 0;

  return (
    <div>

      <div class="btn-group btn-group-lg">
        <button type="button" class="btn btn-primary"  onClick={() => { window.location.href = '/admin'; }}>ADMIN PRODUCTOS</button>
        <button type="button" class="btn btn-primary"  onClick={() => {  window.location.href = '/admincocina';  }}>COCINA</button>
        <button type="button" class="btn btn-success" onClick={() => handleShowProductPostModal()} >Creear Reservacion</button>
      </div>

      <div className="reservation-checkbox">
          {/* Checkboxes para filtrar por lugar */}
          <div>
            <label>
              <input
                type="checkbox"
                checked={isLugarSeleccionado('Calzada Monterrey')}
                onChange={() => handleCheckboxChange('Calzada Monterrey')}
              />
              Señor Sushi
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isLugarSeleccionado('Libertad y 43')}
                onChange={() => handleCheckboxChange('Libertad y 43')}
              />
              Señor Sushi 43
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isLugarSeleccionado('Av Insurgentes y 2da Cd. Gpe Victoria')}
                onChange={() => handleCheckboxChange('Av Insurgentes y 2da Cd. Gpe Victoria')}
              />
              Señor Sushi KM 43
            </label>
          </div>
      </div>

      <div class="card">
        <div class="card-header">
          <a class="btn" data-bs-toggle="collapse" href="#collapseOne">
            RESERVACIONES
          </a>
        </div>
          <div id="collapseOne" class="collapse show" data-bs-parent="#accordion">
          <div className="reservation-container">
              {products
            .filter(product => noHayLugaresSeleccionados || lugaresSeleccionados.includes(product.Anotaciones__c))
            .slice() .sort((a, b) => new Date(a.Fecha__c) - new Date(b.Fecha__c)) 
                .map((product, index) => (
                  <div className="reservation-card" key={index}>
                    <div className="reservation-details">
                      <div><strong>ID de Reservación:</strong><dl> {product.Id}</dl></div>
                      <div><strong>ID de Usuario:</strong> {product.IdUsuario__c}</div>
                      <div><strong>Celular:</strong> {product.Celular__c}</div>
                      <div>Día de la Reservación:<strong> {product.Fecha__c}</strong> </div>
                      <div>Hora de la Reservación: <strong>{product.Hora__c}</strong> </div>
                      <div><strong>Lugar de la Reservación:</strong> {product.Anotaciones__c}</div>
                      <div><strong>Personas:</strong> {product.Personas__c}</div>
                      <div><strong>Tipo de Pago:</strong> {product.Tipo_pago__c}</div>
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
          <Modal.Title>CREEAR UNA RESERVACION</Modal.Title>
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
                <label>Celular</label>
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
                <label>Fecha:</label>
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
                <label>Lugar</label>
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
                <label>Personas</label>
                <input
                  type="text"
                  className="form-control"
                  name=""
                  placeholder=""
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
