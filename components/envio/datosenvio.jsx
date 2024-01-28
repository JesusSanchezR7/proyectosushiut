import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";

export const DatosEnvio = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <h2 className="mb-4 text-center">Datos de Envío</h2>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" />
            </div>
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">Dirección</label>
              <input type="text" className="form-control" id="direccion" />
            </div>
            <div className="mb-3">
              <label htmlFor="celular" className="form-label">Número de Celular</label>
              <input type="text" className="form-control" id="celular" />
            </div>
            <div className="mb-3">
              <label htmlFor="referencias" className="form-label">Referencias de la Dirección</label>
              <textarea className="form-control" id="referencias" rows="3"></textarea>
            </div>
            <div className="d-grid gap-2">
              <a href="/Carrito" class="btn btn-danger">Regresar</a>
              <a href="/Envio" class="btn btn-outline-danger">Continuar con el pago</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
