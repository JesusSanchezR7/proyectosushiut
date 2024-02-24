import React, { useState, useEffect } from "react";
import { Button, Modal, Toast} from "react-bootstrap";

export default function Charolas() {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]); 

    const [showCartModal, setShowCartModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showWarningToast, setShowWarningToast] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [clientId, setClientId] = useState('');

    useEffect(() => {
        // Función para obtener el valor de una cookie por su nombre
        const getCookie = (name) => {
            const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
            return cookieValue ? cookieValue.pop() : '';
        };
        const clientIdFromCookie = getCookie('idCliente');    
        const decodedClientId = decodeURIComponent(clientIdFromCookie);
        const cleanClientId = decodedClientId.substring(2, decodedClientId.length - 2); // Eliminar los corchetes
        console.log(cleanClientId);
        setClientId(cleanClientId);
    }, []);
    

    // Dentro del componente Charolas
    const handleProductSelect = (productId) => {
        setSelectedProduct(productId); // Actualiza selectedProduct con el ID del producto seleccionado
    };
    

    // Función para realizar la solicitud POST a la API para realizar la compra
    const makePurchase = async () => {
        console.log('selectedProduct:', selectedProduct);
        console.log('clientId:', clientId);
    
        if (selectedProduct && clientId) {
            const productIds = []; // Array para almacenar los IDs de los productos
    
            // Obtener todos los elementos <h6> dentro del Modal.Body
            const h6Elements = document.querySelectorAll('.modal-body h6');
    
            // Iterar sobre los elementos para obtener los IDs de los productos
            h6Elements.forEach(element => {
                // Obtener el texto del elemento y limpiarlo para obtener solo el ID del producto
                const productId = element.textContent.trim();
                productIds.push(productId); // Agregar ID del producto al array
            });
    
            // Ahora productIds contiene los IDs de todos los productos
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    client_id: import.meta.env.VITE_CLIENT_ID,
                    client_secret: import.meta.env.VITE_CLIENT_SECRET,
                },
                body: JSON.stringify({
                    IdUsuario: clientId,
                    IdProductos: productIds, // Enviar todos los IDs de productos
                }),
            };
    
            try {
                console.log('Datos enviados a la API:', JSON.stringify({
                    IdUsuario: clientId,
                    IdProductos: productIds,
                }));
    
                const response = await fetch(import.meta.env.VITE_API_KART, requestOptions);
                if (response.ok) {
                    // La solicitud fue exitosa
                    console.log("Compra realizada con éxito!");
                } else {
                    console.error("Error al realizar la compra");
                }
            } catch (error) {
                console.error("Error al realizar la compra:", error);
            }
        } else {
            console.error("Error: No se ha seleccionado un producto o no se ha obtenido el id del cliente");
        }
    };
    

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
            // Mostrar notificación de producto agregado
            setShowToast(true);
        } else {
            setShowWarningToast(true);
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
     
      {/* MENSAJE DE QUE SE AGREGO EL PRODUCTO*/}
      <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            style={{
                position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 1,
                backgroundColor: "#ffffff",
            }}
        >
            <Toast.Header>
                <strong className="me-auto">Notificación</strong>
            </Toast.Header>
            <Toast.Body>¡Producto agregado al carrito!</Toast.Body>
      </Toast>
      
      {/* MENSAJE se paso limite de gregar productos*/}
      <Toast
            onClose={() => setShowWarningToast(false)}
            show={showWarningToast}
            delay={3000}
            autohide
            bg="warning"
            style={{
                position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 1,
            }}
        >
            <Toast.Header>
                <strong className="me-auto">Advertencia</strong>
            </Toast.Header>
            <Toast.Body>Solo puedes agregar hasta 10 productos al carrito.</Toast.Body>
      </Toast>

      
      <Modal show={showCartModal} onHide={handleCloseCartModal}>
        <Modal.Header closeButton>
            <Modal.Title>Contenido del Carrito</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            {cartItems.map((item, index) => (
                <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title">{item.Nombre__c}</h5>
                    <p>Precio: {item.Precio__c}$</p>
                    <p>Cantidad: {item.quantity}</p>
                </div>
                <div>
                    <button className="btn btn-outline-danger" onClick={() => removeFromCart(item.Id)}>ELIMINAR DE CARRITO</button>
                    {/* Agrega un botón para seleccionar el producto */}
                    <button className="btn btn-primary" onClick={() => handleProductSelect(item.Id)}>Seleccionar</button>
                    {/* Muestra el ID del producto */}
                    <h6 style={{ visibility: "hidden", display: 'none' }}>{item.Id}</h6>
                </div>
            </div>
            ))}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <h6 className="total-price" >Total: {calculateTotal()}$</h6>
                <Button variant="primary" onClick={makePurchase}>REALIZAR COMPRA</Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}
