import React, { useState } from "react";
import "./login.css"; // Importa el archivo CSS
import iconImage from "../../img/icon.png";
import backgroundImg from "../../img/srsushisanluis.jpeg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      }),
    };

    console.log(email);
    console.log(password);

    try {
      const response = await fetch(import.meta.env.VITE_API_LOGIN, requestOptions);

      if (response.ok) {
        window.location.href = "/home"; // Redirigir si la respuesta es exitosa
      } else {
        const errorMessage = await response.text();
        console.error("Error en inicio de sesión:", errorMessage);
        setLoginError(true); // Mostrar mensaje de error si la respuesta no es exitosa
      }
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      setLoginError(true); // Mostrar mensaje de error si hay problemas con la solicitud
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
                {loginError && (
                  <p style={{ color: "red" }}>Correo o contraseña incorrectos.</p>
                )}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br></br>
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
