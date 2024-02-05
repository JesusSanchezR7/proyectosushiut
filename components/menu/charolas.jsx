import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

//import { loadStripe } from '@stripe/stripe-js';
//const STRIPE_PUBLISHABLE_KEY = "pk_live_51OEyMGBjijcwt0H4bNg365p71CoMb3f83Tubqi4kpkDTW2UatepMPaFF7oHgweC6bzycFwaWQihXI7kVafBEYIIc00rluZqG32";

export default function Charolas() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]); 
  const [showCartModal, setShowCartModal] = useState(false);
  
  //Consumo API
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
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    productList();
  }, []);

  const addToCart = (productId) => {
    const selected = products.find(product => product.Id === productId);
    const existingCartItem = cartItems.find(item => item.Id === productId);

    if (existingCartItem) {
      const updatedCartItems = cartItems.map(item => {
        if (item.Id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      const newCartItem = {
        ...selected,
        quantity: 1,
      };
      setCartItems([...cartItems, newCartItem]);
    }
  };
  
  const handleShowCartModal = () => {
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  const redirigirAEnlace = () => {
    window.location.href = 'https://buy.stripe.com/28oaHMepf4T13GU8xw';
  };
  
  return (
    <div className="container">
      <div className="row">
        <button className="btn btn-danger" style={{ width: "100px", float: "left" }} onClick={handleShowCartModal}>
          <img src="./img/carrito.ico" alt="Logo" width="20" height="20" /> 
        </button>
        <div className="col-12 text-center">
          <h5>ENCUENTRA TUS FAVORITOS</h5>
          <h1>EXPLORA NUESTRO MENÚ</h1>
          <div id="accordion">
            <div className="card">
              <div className="card-header" style={{ backgroundColor: "black" }}>
                <a className="btn" data-bs-toggle="collapse" href="#categoria1">
                  <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "white" }}>COMBOS</h1>
                </a>
              </div>
              <div id="categoria1" className="collapse-show" data-bs-parent="#accordion">
              <div className="card-body row row-cols-1 row-cols-md-3 g-4">
              {products
                  .filter(product => {
                      const productName = product.Nombre__c.toLowerCase();
                      return productName.includes('combos') || productName.includes('combo');
                  })
                  .map((product, index) => (
                      <div key={index} className="col">
                          <div className="card h-100">
                              <div className="card-body">
                                  <h5 className="card-title">{product.Nombre__c}</h5>
                                  <h2 className="card-text">{product.Precio__c}$</h2>
                                  {product.quantity > 0 ? (
                                      <div className="row align-items-center">
                                          <div className="col-6">PRODUCTOS: {product.quantity}</div>

                                          <button
                                              type="button"
                                              className="btn btn-danger w-100 mt-4"
                                              onClick={() => deleteItem(product.Id)}
                                          >
                                              REMOVER DEL CARRITO
                                          </button>
                                      </div>
                                  ) : (
                                      <button
                                          className="btn btn-danger w-100"
                                          onClick={() => addToCart(product.Id)}
                                      >
                                          AGREGAR AL CARRITO
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                  ))}
          </div>
              </div>
            </div>

            <div class="card">
            <div class="card-header"style={{ backgroundColor: "black" }}>
              <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria2">
              <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>CHAROLAS</h1>
              </a>
            </div>
            <div id="categoria2" class="collapse" data-bs-parent="#accordion">
              <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                  {products
                      .filter(product => {
                          const productName = product.Nombre__c.toLowerCase();
                          return productName.includes('charola') || productName.includes('charola');
                      })
                      .map((product, index) => (
                          <div key={index} className="col">
                              <div className="card h-100">
                                  <div className="card-body">
                                      <h5 className="card-title">{product.Nombre__c}</h5>
                                      <h2 className="card-text">{product.Precio__c}$</h2>
                                      {product.quantity > 0 ? (
                                          <div className="row align-items-center">
                                              <div className="col-6">PRODUCTOS: {product.quantity}</div>

                                              <button
                                                  type="button"
                                                  className="btn btn-danger w-100 mt-4"
                                                  onClick={() => deleteItem(product.Id)}
                                              >
                                                  REMOVER DEL CARRITO
                                              </button>
                                          </div>
                                      ) : (
                                          <button
                                              className="btn btn-danger w-100"
                                              onClick={() => addToCart(product.Id)}
                                          >
                                              AGREGAR AL CARRITO
                                          </button>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}
              </div>
          </div>
          </div>

          <div class="card">
            <div class="card-header"style={{ backgroundColor: "black" }}>
              <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria3">
              <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>ENTRADAS</h1>
              </a>
            </div>
            <div id="categoria3" class="collapse" data-bs-parent="#accordion">
                  <div className="card-body row row-cols-1 row-cols-md-3 g-4">
              {products
                  .filter(product => {
                      const productName = product.Nombre__c.toLowerCase();
                      return productName.includes('Entradas') || productName.includes('Entrada');
                  })
                  .map((product, index) => (
                      <div key={index} className="col">
                          <div className="card h-100">
                              <div className="card-body">
                                  <h5 className="card-title">{product.Nombre__c}</h5>
                                  <h2 className="card-text">{product.Precio__c}$</h2>
                                  {product.quantity > 0 ? (
                                      <div className="row align-items-center">
                                          <div className="col-6">PRODUCTOS: {product.quantity}</div>

                                          <button
                                              type="button"
                                              className="btn btn-danger w-100 mt-4"
                                              onClick={() => deleteItem(product.Id)}
                                          >
                                              REMOVER DEL CARRITO
                                          </button>
                                      </div>
                                  ) : (
                                      <button
                                          className="btn btn-danger w-100"
                                          onClick={() => addToCart(product.Id)}
                                      >
                                          AGREGAR AL CARRITO
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                  ))}
          </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"style={{ backgroundColor: "black" }}>
              <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria4">
              <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>SUSHI</h1>
              </a>
            </div>
            <div id="categoria4" class="collapse" data-bs-parent="#accordion">
              <div class="card-body">
                <h3>TRADICIONALES</h3>
                <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                {products
                    .filter(product => {
                        const productName = product.Nombre__c.toLowerCase();
                        return productName.includes('tradicional') || productName.includes('sushi');
                    })
                    .map((product, index) => (
                        <div key={index} className="col">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{product.Nombre__c}</h5>
                                    <h2 className="card-text">{product.Precio__c}$</h2>
                                    {product.quantity > 0 ? (
                                        <div className="row align-items-center">
                                            <div className="col-6">PRODUCTOS: {product.quantity}</div>

                                            <button
                                                type="button"
                                                className="btn btn-danger w-100 mt-4"
                                                onClick={() => deleteItem(product.Id)}
                                            >
                                                REMOVER DEL CARRITO
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="btn btn-danger w-100"
                                            onClick={() => addToCart(product.Id)}
                                        >
                                            AGREGAR AL CARRITO
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
                 </div>
              <div class="card-body">
              <h3>VIP</h3>
              <div className="card-body row row-cols-1 row-cols-md-3 g-4">
              {products
                  .filter(product => {
                      const productName = product.Nombre__c.toLowerCase();
                      return productName.includes('VIP') || productName.includes('sushi');
                  })
                  .map((product, index) => (
                      <div key={index} className="col">
                          <div className="card h-100">
                              <div className="card-body">
                                  <h5 className="card-title">{product.Nombre__c}</h5>
                                  <h2 className="card-text">{product.Precio__c}$</h2>
                                  {product.quantity > 0 ? (
                                      <div className="row align-items-center">
                                          <div className="col-6">PRODUCTOS: {product.quantity}</div>

                                          <button
                                              type="button"
                                              className="btn btn-danger w-100 mt-4"
                                              onClick={() => deleteItem(product.Id)}
                                          >
                                              REMOVER DEL CARRITO
                                          </button>
                                      </div>
                                  ) : (
                                      <button
                                          className="btn btn-danger w-100"
                                          onClick={() => addToCart(product.Id)}
                                      >
                                          AGREGAR AL CARRITO
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                  ))}
          </div>
                 </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" style={{ backgroundColor: "black" }}>
              <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria5">
              <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>TERIYAKI</h1>
              </a>
            </div>
            <div id="categoria5" class="collapse" data-bs-parent="#accordion">
            <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                  {products
                      .filter(product => {
                          const productName = product.Nombre__c.toLowerCase();
                          return productName.includes('teriyaqui');
                      })
                      .map((product, index) => (
                          <div key={index} className="col">
                              <div className="card h-100">
                                  <div className="card-body">
                                      <h5 className="card-title">{product.Nombre__c}</h5>
                                      <h2 className="card-text">{product.Precio__c}$</h2>
                                      {product.quantity > 0 ? (
                                          <div className="row align-items-center">
                                              <div className="col-6">PRODUCTOS: {product.quantity}</div>

                                              <button
                                                  type="button"
                                                  className="btn btn-danger w-100 mt-4"
                                                  onClick={() => deleteItem(product.Id)}
                                              >
                                                  REMOVER DEL CARRITO
                                              </button>
                                          </div>
                                      ) : (
                                          <button
                                              className="btn btn-danger w-100"
                                              onClick={() => addToCart(product.Id)}
                                          >
                                              AGREGAR AL CARRITO
                                          </button>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" style={{ backgroundColor: "black" }}>
              <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria6">
              <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>WINGS</h1>
              </a>
            </div>
            <div id="categoria6" class="collapse" data-bs-parent="#accordion">
            <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                  {products
                      .filter(product => {
                          const productName = product.Nombre__c.toLowerCase();
                          return productName.includes('wings');
                      })
                      .map((product, index) => (
                          <div key={index} className="col">
                              <div className="card h-100">
                                  <div className="card-body">
                                      <h5 className="card-title">{product.Nombre__c}</h5>
                                      <h2 className="card-text">{product.Precio__c}$</h2>
                                      {product.quantity > 0 ? (
                                          <div className="row align-items-center">
                                              <div className="col-6">PRODUCTOS: {product.quantity}</div>

                                              <button
                                                  type="button"
                                                  className="btn btn-danger w-100 mt-4"
                                                  onClick={() => deleteItem(product.Id)}
                                              >
                                                  REMOVER DEL CARRITO
                                              </button>
                                          </div>
                                      ) : (
                                          <button
                                              className="btn btn-danger w-100"
                                              onClick={() => addToCart(product.Id)}
                                          >
                                              AGREGAR AL CARRITO
                                          </button>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}
              </div>  
            </div>
          </div>
          <div class="card" >
            <div class="card-header" style={{ backgroundColor: "black" }}>
              <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria7">
              <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>HAMBURGESAS Y MAS</h1>
              </a>
            </div>
            <div id="categoria7" class="collapse" data-bs-parent="#accordion">
            <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                  {products
                      .filter(product => {
                          const productName = product.Nombre__c.toLowerCase();
                          return productName.includes('Hamburgesa');
                      })
                      .map((product, index) => (
                          <div key={index} className="col">
                              <div className="card h-100">
                                  <div className="card-body">
                                      <h5 className="card-title">{product.Nombre__c}</h5>
                                      <h2 className="card-text">{product.Precio__c}$</h2>
                                      {product.quantity > 0 ? (
                                          <div className="row align-items-center">
                                              <div className="col-6">PRODUCTOS: {product.quantity}</div>

                                              <button
                                                  type="button"
                                                  className="btn btn-danger w-100 mt-4"
                                                  onClick={() => deleteItem(product.Id)}
                                              >
                                                  REMOVER DEL CARRITO
                                              </button>
                                          </div>
                                      ) : (
                                          <button
                                              className="btn btn-danger w-100"
                                              onClick={() => addToCart(product.Id)}
                                          >
                                              AGREGAR AL CARRITO
                                          </button>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}
              </div> 
            </div>
          </div>
          <div class="card">
            <div class="card-header"style={{ backgroundColor: "black" }}>
              <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria8">
              <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>RAMEN</h1>
              </a>
            </div>
            <div id="categoria8" class="collapse" data-bs-parent="#accordion">
            <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                  {products
                      .filter(product => {
                          const productName = product.Nombre__c.toLowerCase();
                          return productName.includes('ramen');
                      })
                      .map((product, index) => (
                          <div key={index} className="col">
                              <div className="card h-100">
                                  <div className="card-body">
                                      <h5 className="card-title">{product.Nombre__c}</h5>
                                      <h2 className="card-text">{product.Precio__c}$</h2>
                                      {product.quantity > 0 ? (
                                          <div className="row align-items-center">
                                              <div className="col-6">PRODUCTOS: {product.quantity}</div>

                                              <button
                                                  type="button"
                                                  className="btn btn-danger w-100 mt-4"
                                                  onClick={() => deleteItem(product.Id)}
                                              >
                                                  REMOVER DEL CARRITO
                                              </button>
                                          </div>
                                      ) : (
                                          <button
                                              className="btn btn-danger w-100"
                                              onClick={() => addToCart(product.Id)}
                                          >
                                              AGREGAR AL CARRITO
                                          </button>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}
              </div> 
            </div>
          </div>
          <div class="card">
            <div class="card-header"style={{ backgroundColor: "black" }}>
              <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria9">
              <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>OTROS</h1>
              </a>
            </div>
            <div id="categoria9" class="collapse" data-bs-parent="#accordion">
            <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                  {products
                      .filter(product => {
                          const productName = product.Nombre__c.toLowerCase();
                          return productName.includes('otros') || productName.includes('Ensalda');
                      })
                      .map((product, index) => (
                          <div key={index} className="col">
                              <div className="card h-100">
                                  <div className="card-body">
                                      <h5 className="card-title">{product.Nombre__c}</h5>
                                      <h2 className="card-text">{product.Precio__c}$</h2>
                                      {product.quantity > 0 ? (
                                          <div className="row align-items-center">
                                              <div className="col-6">PRODUCTOS: {product.quantity}</div>

                                              <button
                                                  type="button"
                                                  className="btn btn-danger w-100 mt-4"
                                                  onClick={() => deleteItem(product.Id)}
                                              >
                                                  REMOVER DEL CARRITO
                                              </button>
                                          </div>
                                      ) : (
                                          <button
                                              className="btn btn-danger w-100"
                                              onClick={() => addToCart(product.Id)}
                                          >
                                              AGREGAR AL CARRITO
                                          </button>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}
              </div> 
            </div>
          </div>
          <div class="card">
            <div class="card-header"style={{ backgroundColor: "black" }}>
              <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria10">
              <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>ENSALADAS</h1>
              </a>
            </div>
            <div id="categoria10" class="collapse" data-bs-parent="#accordion">
            <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                  {products
                      .filter(product => {
                          const productName = product.Nombre__c.toLowerCase();
                          return productName.includes('E');
                      })
                      .map((product, index) => (
                          <div key={index} className="col">
                              <div className="card h-100">
                                  <div className="card-body">
                                      <h5 className="card-title">{product.Nombre__c}</h5>
                                      <h2 className="card-text">{product.Precio__c}$</h2>
                                      {product.quantity > 0 ? (
                                          <div className="row align-items-center">
                                              <div className="col-6">PRODUCTOS: {product.quantity}</div>

                                              <button
                                                  type="button"
                                                  className="btn btn-danger w-100 mt-4"
                                                  onClick={() => deleteItem(product.Id)}
                                              >
                                                  REMOVER DEL CARRITO
                                              </button>
                                          </div>
                                      ) : (
                                          <button
                                              className="btn btn-danger w-100"
                                              onClick={() => addToCart(product.Id)}
                                          >
                                              AGREGAR AL CARRITO
                                          </button>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}
              </div> 
            </div>
          </div>
          </div>
        </div>
      </div>

      <Modal show={showCartModal} onHide={handleCloseCartModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contenido del Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.map((item, index) => (
            <div key={index}>
              <h5>{item.Nombre__c}</h5>
              <p>Precio: {item.Precio__c}$</p>
              <hr/>
            </div>

          ))}
        </Modal.Body>
        <Modal.Footer> <Button variant="secondary" onClick={redirigirAEnlace}> REALIZAR COMPRAR </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
