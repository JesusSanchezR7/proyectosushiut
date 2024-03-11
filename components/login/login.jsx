import React, { useState } from "react";
import "./login.css"; 
import iconImage from "/icon.png";
import backgroundImg from "/srsushisanluis.jpeg"; 

import Cookies from 'universal-cookie';

export const Login = () => {
  const [Correo, setCorreo] = useState("");
  const [Contrasena, setContrasena] = useState("");
  const [loginError, setLoginError] = useState(false);
  const cookies = new Cookies(); // Crear una instancia de Cookies

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'client_id': import.meta.env.VITE_CLIENT_ID,
        'client_secret': import.meta.env.VITE_CLIENT_SECRET,
        Accept: "application/json",
      },
      body: JSON.stringify({
        Correo: Correo,
        Contrasena: Contrasena, 
      }),
    };
    try {
      const response = await fetch(import.meta.env.VITE_API_LOGIN, requestOptions);
      
      if (response.ok) {
        const responseData = await response.json();
        const idCliente = responseData.Id; // Suponiendo que el campo 'Id' contiene el ID del cliente
        console.log('ID del cliente:', idCliente); // Agregar un console.log para imprimir el ID del cliente
        cookies.set('idCliente', idCliente, { path: '/' }); // Establecer la cookie con el ID del cliente
        window.location.href = "/Home"; 
      } else {
        const errorMessage = await response.text();
        console.error("error si la respuesta no es exitosa", errorMessage);
        setLoginError(true); 
      }
    } catch (error) {
      console.error("error si hay problemas con la solicitud", error);
      setLoginError(true); 
    }
  };

  return (
    <div className="login-container">
      <div className="Login">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="image">
                  <img src={iconImage} alt="Logo" />
                </div>
                <legend>Iniciar sesión</legend>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Ingresa tu correo electrónico"
                    value={Correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label mt-4"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Ingresa tu contraseña"
                    autoComplete="off"
                    value={Contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                  />
                </div>
                <br></br>
                {loginError && (<p style={{ color: "red" }}>Correo o Contraseña Incorrectos.</p> )}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-danger">
                    Iniciar sesión
                  </button>
                </div>
              </fieldset>
            </form>
            <br />
            <small id="passwordHelp" className="form-text">
              ¿No tienes cuenta aún?
            </small>
            <a href="/Registro" className="card-link">
              {" "}
             Registrarse
            </a>
          </div>
        </div>
      </div>
      <div className="image2">
        <img src={backgroundImg} alt="" />
      </div>
    </div>
  );
};
