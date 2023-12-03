import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://restaurante-system-api.us-e2.cloudhub.io/api/login",
        {
          Correo: email,
          Contrasena: password
        }
      );

      // Aquí puedes manejar la respuesta de la API, por ejemplo, redirigir a otra página si el inicio de sesión es exitoso
      console.log("Respuesta de inicio de sesión:", response.data);
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      // Aquí puedes manejar el error, mostrar un mensaje de error al usuario, etc.
    }
  };

  return (
    <div className="Login">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Inicio de sesión</legend>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">Correo electrónico</label>
                <input 
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="form-label mt-4">Contraseña</label>
                <input 
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Ingresa tu contraseña"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br></br>
              <div className="d-grid gap-2">

              <a href="/Home" class="btn btn-outline-danger">Iniciar sesión</a>
            </div>
            </fieldset>
          </form>

          <small id="passwordHelp" className="form-text text-muted">¿No tienes cuenta aún? Regístrate hoy mismo</small>
          <a href="/Registro" className="card-link">Registrarme</a>
        </div>
      </div>
    </div>
  );
};
