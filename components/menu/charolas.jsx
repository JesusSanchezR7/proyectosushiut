import React, { useState, useEffect } from "react";
import { Button, Modal, Toast} from "react-bootstrap";
import iconCarrito from "/carrito.ico";
import axios from "axios";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import "./charolas.css"; 


export default function Charolas() {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]); 
    const [showToast, setShowToast] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [showWarningToast, setShowWarningToast] = useState(false);
    const [clientId, setClientId] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    const [showWallet, setShowWallet] = useState(false);
    //ESTADO PARA GUARDAR EL PREFERENCE id
    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago('APP_USR-554f4183-17c5-43a2-9213-7b3bf8a5329e');

    // Función para obtener el valor de una cookie por su nombre
    useEffect(() => {
        const getCookie = (name) => {
            const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
            return cookieValue ? cookieValue.pop() : '';
        };
        const clientIdFromCookie = getCookie('idCliente');
        const decodedClientId = decodeURIComponent(clientIdFromCookie); 
        const cleanClientId = JSON.parse(decodedClientId)[0]; 
       //console.log(cleanClientId);
        setClientId(cleanClientId);
    }, []);

    // Función para realizar la solicitud POST a la API para realizar la compra
    const makePurchase = async (productId) => {
       // console.log('productId:', productId);
       // console.log('clientId:', clientId);
        if (productId && clientId) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "client_id": import.meta.env.VITE_CLIENT_ID,
                    "client_secret": import.meta.env.VITE_CLIENT_SECRET,
                },
                body: JSON.stringify({
                    "IdUsuario": clientId,
                    "IdProducto": productId, 
                }),
            };
            try {
                console.log('Datos enviados a la API:', JSON.stringify({
                    IdUsuario: clientId,
                    IdProducto: productId,
                }));
                const response = await fetch(import.meta.env.VITE_API_KART, requestOptions);
                if (response.ok) {
                    console.log("  Se agrego a carrito ");
                } else {
                    console.error("Error al cargar");
                }
            } catch (error) {
                console.error("Error al agregar", error);
            }
        } else {
            console.error("Error: No se ha seleccionado un producto o no se ha obtenido el id del cliente");
        }
    };

     // Agregar a carrito
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
            // Refrescar la página después de agregar el producto al carrito
        }
        // Mostrar notificación de producto agregado
        setShowToast(true);
        
        // Ejecutar la función para realizar la compra pasando el ID del producto
        makePurchase(productId);
        
    };

    // Función para obtener los productos del carrito del cliente desde la API
    useEffect(() => {
        const fetchCartItemsFromAPI = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    client_id: import.meta.env.VITE_CLIENT_ID,
                    client_secret: import.meta.env.VITE_CLIENT_SECRET,
                },
            };
            try {
                const response = await fetch(`${import.meta.env.VITE_API_KART}/${clientId}`, requestOptions);
                if (response.ok) {
                    const cartItemsData = await response.json();
                    setCartItems(cartItemsData.resultados); // Actualiza solo la propiedad 'resultados'
                    setTotalPrice(cartItemsData.total);
                } else {
                    console.error("Error al obtener los productos del carrito:", response.statusText);
                }
            } catch (error) {
                console.error("Error al obtener los productos del carrito:", error);
            }
        };
    
        if (clientId) {
            fetchCartItemsFromAPI();
        }
    }, [clientId]);
    
     // Calcula el total cada vez que cambian los items en el carrito
     useEffect(() => {
        let total = 0;
        cartItems.forEach((item) => {
            total += parseFloat(item.Precio__c);
        });
        setTotalPrice(total);
    }, [cartItems]);


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


    // Eliminar del carrito
    const removeFromCartFromAPI = async (productId) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                client_id: import.meta.env.VITE_CLIENT_ID,
                client_secret: import.meta.env.VITE_CLIENT_SECRET,
            },
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_KART}/${clientId}/${productId}`, requestOptions);
            if (response.ok) {
                // Eliminar el producto del carrito en el frontend
                const updatedCartItems = cartItems.filter(item => item.Id !== productId);
                setCartItems(updatedCartItems);
                // Refrescar la página después de eliminar el producto
                window.location.reload();
            } else {
                console.error("Error al eliminar el producto del carrito:", response.statusText);
            }
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
        }
    };

    // Calcula la cantidad total de productos en el carrito icono carrito
    const calculateTotalItems = () => {
        let totalItems = 0;
        cartItems.forEach(item => {
            totalItems += item.quantity;
        });
        return totalItems;
    };
    // Cuando se actualiza el carrito, guardar los datos en localStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Cuando se carga la página, recuperar los datos del carrito desde localStorage
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    // Función para manejar el clic en el botón "REALIZAR COMPRA"
    const handleRealizarCompra = () => {
        setShowWallet(true); // Mostrar el componente Wallet
    
    };

    // Función para manejar creear preference
    const handleTotalPriceChange = (newPrice) => {
        createPreference(newPrice);
    };

    //Mercado pago
    const createPreference = async () => {
     try {
        const response = await axios.post("http://localhost:3000/create_prefernece", {
            title: "TOTAL:",
            quantity: 1,
            price: totalPrice,
        });

        const { id } = response.data;
        return id;
      } catch (error) {
        console.log(error);
      }
    };    

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
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
      <button className="btn btn-danger"  onClick={handleShowCartModal}>
            <img src={iconCarrito} alt="Logo" width="20" height="20" />
            {cartItems.length > 0 && (
                <span>
                    {cartItems.length}
                </span>
            )}
        </button>
        <div className="col-12 text-center"> 
          <h5>ENCUENTRA TUS FAVORITOS</h5>
          <h1>EXPLORA NUESTRO MENÚ</h1>
          <div id="accordion">
                {/*PESTAÑA COMBOS*/}
                <div className="card">
                <div className="card-header">
                    <a className="btn" data-bs-toggle="collapse" href="#categoria1">
                    <h1 className="charolas-title">COMBOS</h1>
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
                        <div className="card-prod">
                            <div className="card-body p-4">
                            <div className="d-flex text-black">
                                
                                <div className="flex-shrink-0">
                                <img
                                    src={product.Imagen__c}
                                    alt="Señor Sushi"
                                    className="img-fluid"
                                />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                <h6 className="mb-1">{product.Nombre__c}</h6>
                                <h2 className="mb-2 pb-1">{product.Precio__c} </h2>
                                <h6 className="mb-1-id-invisibility">{product.Id}</h6>
                                <div className="d-flex pt-1">
                                <button  className="btn btn-danger w-100" onClick={() => addToCart(product.Id)}>Añadir</button>

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
                    <div class="card-header">
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria2">
                    <h1  className="charolas-title">CHAROLAS</h1>
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
                                  <div className="card-prod">
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1">{product.Precio__c} </h2>
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
                    <div class="card-header">
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria3">
                    <h1 className="charolas-title">ENTRADAS</h1>
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
                            <div className="card-prod">
                                <div className="card-body p-4">
                                <div className="d-flex text-black">
                                    
                                    <div className="flex-shrink-0">
                                    <img
                                        src={product.Imagen__c}
                                        alt="Señor Sushi"
                                        className="img-fluid"
                                    />
                                    </div>

                                    <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">{product.Nombre__c}</h6>
                                    <h2 className="mb-2 pb-1" >{product.Precio__c} </h2>
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
                    <div class="card-header">
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria4">
                    <h1 className="charolas-title">SUSHI</h1>
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
                                <div className="card-prod">
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1">{product.Precio__c} </h2>
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
                                <div className="card-prod">
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                        />
                                        </div>

                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1">{product.Precio__c} </h2>
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
                    <div class="card-header">
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria5">
                    <h1 className="charolas-title">TERIYAKI</h1>
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
                                <div className="card-prod">
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1">{product.Precio__c} </h2>
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
                    <div class="card-header" >
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria6">
                    <h1  className="charolas-title">WINGS</h1>
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
                                <div className="card-prod">
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1">{product.Precio__c} </h2>
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
                    <div class="card-header">
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria7">
                    <h1 className="charolas-title">HAMBURGESAS Y MAS</h1>
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
                                <div className="card-prod">
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1">{product.Precio__c} </h2>
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
                    <div class="card-header">
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria8">
                    <h1 className="charolas-title">RAMEN</h1>
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
                                <div className="card-prod">
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1">{product.Precio__c} </h2>
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
                    <div class="card-header">
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria9">
                    <h1 className="charolas-title">OTROS</h1>
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
                               <div className="card-prod">
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                        />
                                        </div>
    
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1">{product.Precio__c} </h2>
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
                    <div class="card-header">
                    <a class="collapsed btn" data-bs-toggle="collapse" href="#categoria10">
                    <h1 className="charolas-title">ENSALADAS</h1>
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
                                <div className="card-prod">
                                    <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        
                                        <div className="flex-shrink-0">
                                        <img
                                            src={product.Imagen__c}
                                            alt="Señor Sushi"
                                            className="img-fluid"
                                        />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-1">{product.Nombre__c}</h6>
                                        <h2 className="mb-2 pb-1">{product.Precio__c} </h2>
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
            <Toast.Body>Se ha excedido el límite de productos que pueden ser agregados.</Toast.Body>
      </Toast>

      <Modal show={showCartModal} onHide={handleCloseCartModal}>
        <Modal.Header closeButton>
            <Modal.Title>Tu Lista</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            {cartItems.map((item, index) => (
                <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title">{item.Nombre__c}</h5>
                    <p>Precio: ${item.Precio__c}</p>
                </div>
                <div>
                    <button className="btn btn-outline-danger" onClick={() => removeFromCartFromAPI(item.Id)}>Eliminar</button>
                    <h6 style={{ visibility: "hidden", display: 'none' }}>{}</h6>
                </div>
            </div>
            ))}
            </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                <h6 className="total-price">Total: {totalPrice}$</h6>
                    <Button variant="primary" onClick={handleBuy}>REALIZAR COMPRA</Button>
                    { preferenceId && <Wallet initialization={{preferenceId: preferenceId}} /> }
                </Modal.Footer>
        </Modal>
    </div>
  );
}
