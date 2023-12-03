import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../components/login/login";
import { Navbar } from "../components/navbar/navbar";
import { Registro } from "../components/registro/registro";
import { Home } from "../components/home/home";
import { Reservar } from "../components/reservar/reservar";
import { Carrito } from "../components/carrito/carrito";

import  Charolas  from "../components/catalogo/charolas";
import { Combos } from "../components/catalogo/combos";
import { Entradas } from "../components/catalogo/entradas";
import { Hamburguesas } from "../components/catalogo/hamburguesas";
import { Ramen } from "../components/catalogo/ramen";
import { Sushi } from "../components/catalogo/sushi";
import { Sushivip } from "../components/catalogo/sushivip";
import { Teriyaki } from "../components/catalogo/teriyaki";
import { Wings } from "../components/catalogo/wings";

import { DatosEnvio } from "../components/envio/datosenvio";
import { Envio } from "../components/envio/envio";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Login></Login>
                </div>
            }
          />

          <Route
            path="/Registro"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Registro></Registro>
                </div>
            }
          />  

          <Route
            path="/Home"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> 
                <Home></Home>
                </div>
            }
          />  



        <Route
            path="/Reservar"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Reservar></Reservar>
                </div>
            }
          />  
        

        <Route
            path="/Carrito"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Carrito></Carrito>
                </div>
            }
          />  

        <Route
            path="/Charolas"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Charolas></Charolas>
                </div>
            }
          />        

        <Route
            path="/Combos"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Combos></Combos>
                </div>
            }
          />        

        <Route
            path="/Entradas"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Entradas></Entradas>
                </div>
            }
          />    

        <Route
            path="/Hamburguesas"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Hamburguesas></Hamburguesas>
                </div>
            }
          />    

        <Route
            path="/Ramen"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Ramen></Ramen>
                </div>
            }
          />    

        <Route
            path="/Sushi"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Sushi></Sushi>
                </div>
            }
          />    


        <Route
            path="/Sushivip"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Sushivip></Sushivip>
                </div>
            }
          />    


        <Route
            path="/Teriyaki"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Teriyaki></Teriyaki>
                </div>
            }
          />    

        <Route
            path="/Wings"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Wings></Wings>
                </div>
            }
          />    


        <Route
            path="/DatosEnvio"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> 
                <DatosEnvio></DatosEnvio>
                </div>
            }
          />   

        <Route
            path="/Envio"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> 
                <Envio></Envio>
                </div>
            }
          />   
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
