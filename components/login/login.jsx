import React, { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://restaurante-system-api.us-e2.cloudhub.io/api/login", // URL de tu API de login
        { email, password } // Datos a enviar (email y password)
      );

      if (response.status === 200) {
        window.location.href = "/home"; // Redirigir si la respuesta es exitosa
      } else {
        setLoginError(true); // Mostrar mensaje de error si la respuesta no es exitosa
      }
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      setLoginError(true); // Mostrar mensaje de error si hay problemas con la solicitud
    }
  };

  return (
    <div className="Login">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Inicio de sesión</legend>
              {loginError && <p style={{ color: "red" }}>Correo o contraseña incorrectos. Intente nuevamente.</p>}
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
                <button type="submit" className="btn btn-outline-danger">Iniciar sesión</button>
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
