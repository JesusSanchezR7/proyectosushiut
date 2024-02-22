import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

export default function Charolas() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]); 
  const [showCartModal, setShowCartModal] = useState(false);
  
    //MUESTRA LOS PRODUCTOS DE LA API 
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

    useEffect(() => {
        productList();
    }, []);

    //Agregar a carrito
    const addToCart = (productId) => {
    const selected = products.find(product => product.Id === productId);
    const existingCartItem = cartItems.find(item => item.Id === productId);
    // Verificar si la cantidad total de productos en el carrito es menor que 10
    if (calculateTotalItems() < 10) {
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
    } else {
       alert('Solo puedes agregar hasta 10 productos al carrito.');
     }
    };
  
    // Eliminar del carrito
    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.Id === productId) {
            return {
                ...item,
                quantity: item.quantity - 1,
            };
            }
            return item;
        }).filter(item => item.quantity > 0); // Elimina los productos con cantidad cero o menos
        
        setCartItems(updatedCartItems);
        };

    // Calcula el total de los precios en el carrito
    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
        total += item.Precio__c * item.quantity;
        });
        return total.toFixed(2); // Redondea el total a 2 decimales
    }; 

    // Calcula la cantidad total de productos en el carrito
    const calculateTotalItems = () => {
        let totalItems = 0;
        cartItems.forEach(item => {
        totalItems += item.quantity;
        });
        return totalItems;
    };
        
    // Modal
    const handleShowCartModal = () => {
        setShowCartModal(true);
    };

    const handleCloseCartModal = () => {
        setShowCartModal(false);
    };

 
  
  return (
    <div className="container">
      <div className="row">
      <button className="btn btn-danger" style={{ backgroundColor: "#cd1818", width: "100px", float: "left", position: "relative" }} onClick={handleShowCartModal}>
        <img src="./img/carrito.ico" alt="Logo" width="20" height="20" />
        {calculateTotalItems() > 0 && (
        <span style={{ position: "absolute", top: "-10px", right: "-10px", fontSize: "19px", backgroundColor: "#cd1818", color: "#fff", borderRadius: "50%", padding: "5px", width: "40px", height: "40px", textAlign: "center" }}>
        {calculateTotalItems()}
            </span>
        )}
        </button>
        <div className="col-12 text-center">
          <h5>ENCUENTRA TUS FAVORITOS</h5>
          <h1>EXPLORA NUESTRO MENÚ</h1>
          <div id="accordion">
                {/*PESTAÑA COMBOS*/}
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
                        const productid = product.Porciones__c.toLowerCase();
                        return productid.startsWith('1');
                    })
                    .map((product, index) => (
                        <div key={index} className="col">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-4">
                                <div className="d-flex text-black">
                                    
                                    <div className="flex-shrink-0">
                                    <img
                                        src={product.Imagen__c}
                                        alt="Señor Sushi"
                                        className="img-fluid"
                                        style={{ width: "150px",height:"122px", borderRadius: "10px" }}
                                    />
                                    </div>

                                    <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">{product.Nombre__c}</h6>
                                    <h2 className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{product.Precio__c} </h2>
                                    <div className="d-flex pt-1">
                                        <button className="btn btn-danger mr-2" onClick={() => addToCart(product.Id)}> Agregar </button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
                </div>
                </div>
                {/*PESTAÑA CHAROLAS */}
                <div class="card">
                    <div class="card-header"style={{ backgroundColor: "black" }}>
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria2">
                    <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>CHAROLAS</h1>
                    </a>
                    </div>
                    <div id="categoria2" class="collapse-show" data-bs-parent="#accordion">
                    <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                        {products
                            .filter(product => {
                                const productid = product.Porciones__c.toLowerCase();
                                return productid.startsWith('2');
                            })
                            .map((product, index) => (
                                <div key={index} className="col">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                            style={{ width: "150px",height:"122px", borderRadius: "10px" }}
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{product.Precio__c} </h2>
                                        <div className="d-flex pt-1">
                                        <button  className="btn btn-danger w-100" onClick={() => addToCart(product.Id)}>Agregar</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                    </div>
                </div>
                </div>
                {/*PESTAÑA ESTRADAS*/}
                <div class="card">
                    <div class="card-header"style={{ backgroundColor: "black" }}>
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria3">
                    <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>ENTRADAS</h1>
                    </a>
                    </div>
                    <div id="categoria3" class="collapse-show" data-bs-parent="#accordion">
                        <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                    {products
                        .filter(product => {
                            const productid = product.Porciones__c.toLowerCase();
                            return productid.startsWith('3');
                        })
                        .map((product, index) => (
                            <div key={index} className="col">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-4">
                                <div className="d-flex text-black">
                                    
                                    <div className="flex-shrink-0">
                                    <img
                                        src={product.Imagen__c}
                                        alt="Señor Sushi"
                                        className="img-fluid"
                                        style={{ width: "150px",height:"122px", borderRadius: "10px" }}
                                    />
                                    </div>

                                    <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">{product.Nombre__c}</h6>
                                    <h2 className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{product.Precio__c} </h2>
                                    <div className="d-flex pt-1">
                                    <button  className="btn btn-danger w-100" onClick={() => addToCart(product.Id)}>Agregar</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        ))}
                </div>
                    </div>
                </div>
                {/*PESTAÑA SUSHI*/}
                <div class="card">
                    <div class="card-header"style={{ backgroundColor: "black" }}>
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria4">
                    <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>SUSHI</h1>
                    </a>
                    </div>
                    <div id="categoria4" class="collapse-show" data-bs-parent="#accordion">
                    <div class="card-body">
                        <h3>TRADICIONALES</h3>
                        <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                        {products
                            .filter(product => {
                                const productid = product.Porciones__c.toLowerCase();
                                return productid.startsWith('4') && !productid.startsWith('4.1');
                            })                            
                            .map((product, index) => (
                                <div key={index} className="col">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                            style={{ width: "150px",height:"122px", borderRadius: "10px" }}
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{product.Precio__c} </h2>
                                        <div className="d-flex pt-1">
                                        <button  className="btn btn-danger w-100" onClick={() => addToCart(product.Id)}>Agregar</button>
                                        </div>
                                        </div>
                                    </div>
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
                            const productid = product.Porciones__c.toLowerCase();
                                return productid.includes('4.1');
                        })
                        .map((product, index) => (
                            <div key={index} className="col">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-4">
                                <div className="d-flex text-black">
                                    
                                    <div className="flex-shrink-0">
                                    <img
                                        src={product.Imagen__c}
                                        alt="Señor Sushi"
                                        className="img-fluid"
                                        style={{ width: "150px",height:"122px", borderRadius: "10px" }}
                                    />
                                    </div>

                                    <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">{product.Nombre__c}</h6>
                                    <h2 className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{product.Precio__c} </h2>
                                    <div className="d-flex pt-1">
                                    <button  className="btn btn-danger w-100" onClick={() => addToCart(product.Id)}>Agregar al arrito</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        ))}
                </div>
                        </div>
                    </div>
                </div>
                {/*PESTAÑA TERIYAKI*/}          
                <div class="card">
                    <div class="card-header" style={{ backgroundColor: "black" }}>
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria5">
                    <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>TERIYAKI</h1>
                    </a>
                    </div>
                    <div id="categoria5" class="collapse-show" data-bs-parent="#accordion">
                    <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                        {products
                            .filter(product => {
                                const productid = product.Porciones__c.toLowerCase();
                                return productid.startsWith('5');
                            })
                            .map((product, index) => (
                                <div key={index} className="col">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                            style={{ width: "150px",height:"122px", borderRadius: "10px" }}
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{product.Precio__c} </h2>
                                        <div className="d-flex pt-1">
                                        <button  className="btn btn-danger w-100" onClick={() => addToCart(product.Id)}>Agregar</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                    </div>
                    </div>
                </div>
                {/*PESTAÑA WINGS*/}
                <div class="card">
                    <div class="card-header" style={{ backgroundColor: "black" }}>
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria6">
                    <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>WINGS</h1>
                    </a>
                    </div>
                    <div id="categoria6" class="collapse-show" data-bs-parent="#accordion">
                    <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                        {products
                            .filter(product => {
                                const productid = product.Porciones__c.toLowerCase();
                                return productid.startsWith('6');
                            })
                            .map((product, index) => (
                                <div key={index} className="col">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                            style={{ width: "150px",height:"122px", borderRadius: "10px" }}
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{product.Precio__c} </h2>
                                        <div className="d-flex pt-1">
                                        <button  className="btn btn-danger w-100" onClick={() => addToCart(product.Id)}>Agregar</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                    </div>  
                    </div>
                </div>
                {/*PESTAÑA HAMBURGESAS Y MAS*/}
                <div class="card" >
                    <div class="card-header" style={{ backgroundColor: "black" }}>
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria7">
                    <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>HAMBURGESAS Y MAS</h1>
                    </a>
                    </div>
                    <div id="categoria7" class="collapse-show" data-bs-parent="#accordion">
                    <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                        {products
                            .filter(product => {
                                const productid = product.Porciones__c.toLowerCase();
                                return productid.startsWith('7');
                            })
                            .map((product, index) => (
                                <div key={index} className="col">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                            style={{ width: "150px",height:"122px", borderRadius: "10px" }}
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{product.Precio__c} </h2>
                                        <div className="d-flex pt-1">
                                        <button  className="btn btn-danger w-100" onClick={() => addToCart(product.Id)}>Agregar</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                    </div> 
                    </div>
                </div>
                {/*PESTAÑA RAMEN*/}
                <div class="card">
                    <div class="card-header"style={{ backgroundColor: "black" }}>
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria8">
                    <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>RAMEN</h1>
                    </a>
                    </div>
                    <div id="categoria8" class="collapse-show" data-bs-parent="#accordion">
                    <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                        {products
                            .filter(product => {
                                const productid = product.Porciones__c.toLowerCase();
                                return productid.startsWith('8');
                            })
                            .map((product, index) => (
                                <div key={index} className="col">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                            style={{ width: "150px",height:"122px", borderRadius: "10px" }}
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{product.Precio__c} </h2>
                                        <div className="d-flex pt-1">
                                        <button  className="btn btn-danger w-100" onClick={() => addToCart(product.Id)}>Agregar</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                    </div> 
                    </div>
                </div>
                {/*PESTAÑA OTROS*/}
                <div class="card">
                    <div class="card-header"style={{ backgroundColor: "black" }}>
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria9">
                    <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>OTROS</h1>
                    </a>
                    </div>
                    <div id="categoria9" class="collapse-show" data-bs-parent="#accordion">
                    <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                        {products
                            .filter(product => {
                                const productid = product.Porciones__c.toLowerCase();
                                return productid.startsWith('9');
                            })
                            .map((product, index) => (
                                <div key={index} className="col">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                            style={{ width: "150px",height:"122px", borderRadius: "10px" }}
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{product.Precio__c} </h2>
                                        <div className="d-flex pt-1">
                                        <button  className="btn btn-danger w-100" onClick={() => addToCart(product.Id)}>Agregar</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                    </div> 
                    </div>
                </div>
                {/*PESTAÑA ENSALADAS*/}
                <div class="card">
                    <div class="card-header"style={{ backgroundColor: "black" }}>
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria10">
                    <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }}>ENSALADAS</h1>
                    </a>
                    </div>
                    <div id="categoria10" class="collapse-show" data-bs-parent="#accordion">
                    <div className="card-body row row-cols-1 row-cols-md-3 g-4">
                        {products
                            .filter(product => {
                                const productid = product.Porciones__c.toLowerCase();
                                return productid.startsWith('0');
                            })
                            .map((product, index) => (
                                <div key={index} className="col">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                            style={{ width: "150px",height:"122px", borderRadius: "10px" }}
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{product.Precio__c} </h2>
                                        <div className="d-flex pt-1">
                                        <button  className="btn btn-danger w-100" onClick={() => addToCart(product.Id)}>Agregar</button>
                                        </div>
                                        </div>
                                    </div>
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
                <p>Cantidad: {item.quantity}</p> {/* Agregar esta línea para mostrar la cantidad */}
                <button className="btn btn-outline-danger" onClick={() => removeFromCart(item.Id)}>Eliminar del carrito</button>
                <hr/>
            </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
            <h6 className="total-price">Total: {calculateTotal()}$</h6>
            <Button variant="primary">REALIZAR COMPRAR</Button>
        </Modal.Footer>
        </Modal>
    </div>
  );
}
