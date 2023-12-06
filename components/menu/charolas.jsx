import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card, Button } from "react-bootstrap";

const STRIPE_PUBLISHABLE_KEY = "pk_live_51OEyMGBjijcwt0H4bNg365p71CoMb3f83Tubqi4kpkDTW2UatepMPaFF7oHgweC6bzycFwaWQihXI7kVafBEYIIc00rluZqG32";

export default function Charolas() {
  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      const response = await Axios.get("https://restaurante-system-api.us-e2.cloudhub.io/api/menu");
      setMenu(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const handleVerMasClick = (menuItem) => {
    setSelectedMenu(menuItem);

    setShowFullContent(false); // Al abrir el modal, muestra la descripción acortada
  };

  return (
    <div className="container">
      <div className="row">
        {menu.map((menuItem, index) => (
          <div key={index} className="col-md-4 mb-4">
            
            <Card border="primary" style={{ height: "100%" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  {menuItem.nombre}
                </Card.Title>
                <Card.Text>
                  Precio: {menuItem.precio}
                  <br />
                  Tiempo de Preparación: {menuItem.tiempo_de_preparacion}
                  <br />
                  Porciones: {menuItem.porciones}
                </Card.Text>
                <Button variant="primary" onClick={() => handleVerMasClick(menuItem)}>
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>


      <div  style={{textAlign: "center" }} class=".container-fluid">
        <div id="accordion">
          <div class="card">
            <div class="card-header"style={{ backgroundColor: "black" }}>
              <a class="btn" data-bs-toggle="collapse" href="#categoria1">
              <h1  style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center", color: "white" }} >COMBOS</h1>    </a>
            </div>
            <div id="categoria1" class="collapse" data-bs-parent="#accordion">
              <div class="card-body">  
            <stripe-buy-button buy-button-id="buy_btn_1OJVf5Bjijcwt0H4q7nnj5e0" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button> 
            <stripe-buy-button buy-button-id="buy_btn_1OJ9nlBjijcwt0H48JJ1I5FX" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
            <stripe-buy-button buy-button-id="buy_btn_1OJVy3Bjijcwt0H4Avy9slLI" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
            <stripe-buy-button buy-button-id="buy_btn_1OJflzBjijcwt0H4NQTKdEV4" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
            <stripe-buy-button buy-button-id="buy_btn_1OJgAIBjijcwt0H4lT04C0OJ" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
            <stripe-buy-button buy-button-id="buy_btn_1OJgjGBjijcwt0H4eexG97NP" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
            <stripe-buy-button buy-button-id="buy_btn_1OJgmdBjijcwt0H4eeKjN5Ym" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
            <stripe-buy-button buy-button-id="buy_btn_1OJhAKBjijcwt0H4u0dIRejO" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
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
              <div class="card-body">
                <stripe-buy-button buy-button-id="buy_btn_1OJipGBjijcwt0H4ruRz4p2d" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OJizaBjijcwt0H4U9Gp8i0J" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OJjb6Bjijcwt0H4Lkr5sIsb" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
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
              <div class="card-body">
                <stripe-buy-button buy-button-id="buy_btn_1OJlH6Bjijcwt0H4JNe3mjMv" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>            
                <stripe-buy-button buy-button-id="buy_btn_1OJlPjBjijcwt0H4zFh0Q78K" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKFonBjijcwt0H4ZQRvUBoU" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKFxBBjijcwt0H4YmqUnCkV" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKG5ZBjijcwt0H4qS0izcr8" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKGAsBjijcwt0H45RJ9646B" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKGLXBjijcwt0H4pRxawkuU" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKGO1Bjijcwt0H4BZ9QXutQ" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
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
                <stripe-buy-button buy-button-id="buy_btn_1OKGVBBjijcwt0H4qatQHxV5" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>            
                <stripe-buy-button buy-button-id="buy_btn_1OKGWhBjijcwt0H4Ddme63VE" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKGYHBjijcwt0H4K1mPVoqE" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKGcfBjijcwt0H48Hw2IzRp" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
              </div>
              <div class="card-body">
              <h3>VIP</h3>
                <stripe-buy-button buy-button-id="buy_btn_1OKGkNBjijcwt0H4cwAtnzSi" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>            
                <stripe-buy-button buy-button-id="buy_btn_1OKGlwBjijcwt0H4wWBlWDQ4" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKGoLBjijcwt0H4SW1IVi97" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKGtbBjijcwt0H4VjA1ZyIS" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
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
              <div class="card-body">
                <stripe-buy-button buy-button-id="buy_btn_1OKGwrBjijcwt0H4xJuYzOdj" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>            
                <stripe-buy-button buy-button-id="buy_btn_1OKH1MBjijcwt0H4SFMHS35i" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKH5wBjijcwt0H4IwQbu4r4" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKH7oBjijcwt0H4iptIhjsq" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>

                <stripe-buy-button buy-button-id="buy_btn_1OKHFSBjijcwt0H4cAGqFqNi" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>            
                <stripe-buy-button buy-button-id="buy_btn_1OKHH5Bjijcwt0H4K2uXYNqo" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKHJPBjijcwt0H4TLoJlJYq" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKHL2Bjijcwt0H4cvOAcxby" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
              
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
              <div class="card-body">
                <stripe-buy-button buy-button-id="buy_btn_1OKHPnBjijcwt0H4hb1TwwGq" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>            
                <stripe-buy-button buy-button-id="buy_btn_1OKHRUBjijcwt0H4leWMfxTG" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKHTYBjijcwt0H4ECjHL7at" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKHWMBjijcwt0H4Kp5HzJdE" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>

                <stripe-buy-button buy-button-id="buy_btn_1OKHZsBjijcwt0H4OYJla3EN" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>            
                <stripe-buy-button buy-button-id="buy_btn_1OKHbOBjijcwt0H4zsQAY1wL" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
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
              <div class="card-body">
               <stripe-buy-button buy-button-id="buy_btn_1OKHo9Bjijcwt0H4DtXSqIQf" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>            
                <stripe-buy-button buy-button-id="buy_btn_1OKHszBjijcwt0H4waFORyra" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKHu9Bjijcwt0H4NjDgesfK" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>

                <stripe-buy-button buy-button-id="buy_btn_1OKHwlBjijcwt0H4h0VeurOt" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button> 
                <stripe-buy-button buy-button-id="buy_btn_1OKHvVBjijcwt0H4IMZbJWNc" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>           
                <stripe-buy-button buy-button-id="buy_btn_1OKHy9Bjijcwt0H4ubDx2yDt" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
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
              <div class="card-body">
              <stripe-buy-button buy-button-id="buy_btn_1OKI57Bjijcwt0H48GSFgMpw" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKI6hBjijcwt0H4hqpgHJ8r" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
                <stripe-buy-button buy-button-id="buy_btn_1OKI8LBjijcwt0H4sOMW9tmK" publishable-key={STRIPE_PUBLISHABLE_KEY}></stripe-buy-button>
              </div>
            </div>
          </div>

        </div>  
      </div>
    </div>
  );
}
