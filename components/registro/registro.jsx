import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";

export const Registro = () => {
  const [formData, setFormData] = useState({
    Nombre: "",
    Correo: "",
    Direccion: "",
    Contrasena: "",
    Celular: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://restaurante-system-api.us-e2.cloudhub.io/api/usuarios",
        formData
      );

      console.log("Respuesta de registro:", response.data);
      // Aquí podrías redirigir al usuario a una página de éxito, mostrar un mensaje, etc.
    } catch (error) {
      console.error("Error en registro:", error);
      // Aquí puedes manejar el error, mostrar un mensaje de error al usuario, etc.
    }
  };

  return (
    <div className="Registro">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Registro</legend>
              <div className="form-group">
                <label htmlFor="Nombre" className="form-label mt-4">Nombre</label>
                <input 
                  type="text"
                  className="form-control"
                  id="Nombre"
                  placeholder="Ingresa tu nombre"
                  value={formData.Nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Correo" className="form-label mt-4">Correo electrónico</label>
                <input 
                  type="email"
                  className="form-control"
                  id="Correo"
                  placeholder="Ingresa tu correo electrónico"
                  value={formData.Correo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Direccion" className="form-label mt-4">Dirección</label>
                <input 
                  type="text"
                  className="form-control"
                  id="Direccion"
                  placeholder="Ingresa tu dirección"
                  value={formData.Direccion}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Contrasena" className="form-label mt-4">Contraseña</label>
                <input 
                  type="password"
                  className="form-control"
                  id="Contrasena"
                  placeholder="Ingresa tu contraseña"
                  autoComplete="off"
                  value={formData.Contrasena}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Celular" className="form-label mt-4">Número de teléfono</label>
                <input 
                  type="tel"
                  className="form-control"
                  id="Celular"
                  placeholder="Ingresa tu número de teléfono"
                  value={formData.Celular}
                  onChange={handleChange}
                />
              </div><br></br>
              <div className="d-grid gap-2">
              <a href="/" class="btn btn-outline-danger">Registrarse</a>
            </div>
            </fieldset>
          </form>

          <small id="passwordHelp" className="form-text text-muted">
            ¿Ya tienes cuenta? <a href="/" className="card-link">Iniciar sesión</a>
          </small>
        </div>
      </div>
    </div>
  );
};
