import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../components/login/login";
import { Navbar } from "../components/navbar/navbar";
import { Registro } from "../components/registro/registro";
import { Home } from "../components/home/home";
import { Reservar } from "../components/reservar/reservar";
import { Carrito } from "../components/carrito/carrito";

import { Admin } from "../components/admin/admin";
import { Admin_reservacion } from "../components/admin-reservacion/admin_reservacion";
import { Admin_cocina } from "../components/admin-cocina/admin_cocina";

import  Menu  from "../components/menu/charolas";

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
            path="/Admin"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Admin></ Admin>
                </div>
            }
          /> 

          <Route
            path="/AdminReservaciones"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Admin_reservacion></ Admin_reservacion>
                </div>
            }
          />  

          <Route
            path="/AdminCocina"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Admin_cocina></Admin_cocina>
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
            path="/Menu"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Menu></Menu>
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
