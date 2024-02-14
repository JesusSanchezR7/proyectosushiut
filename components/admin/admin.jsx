import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

export const Admin = () => {
  const [data, setData] = useState([]);
  const [selectedTable, setSelectedTable] = useState("reservaciones");
  const [reservationForm, setReservationForm] = useState({
    fecha: "",
    hora: "",
    personas: "",
    celular: "",
    tipo_pago: "",
    anotaciones: "",
  });

  const [orderForm, setOrderForm] = useState({
    total: "",
    tipo_pago: "",
    tipo_entrega: "",
    celular: "",
    productos: "",
    direccion: "",
  });

  useEffect(() => {
    fetchData(selectedTable);
  }, [selectedTable]);

  const fetchData = async (tableName) => {
    try {
      const response = await axios.get(`https://restaurante-system-api.us-e2.cloudhub.io/api/${tableName}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReservationFormChange = (field, value) => {
    setReservationForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleOrderFormChange = (field, value) => {
    setOrderForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const createReservation = async () => {
    try {
      const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const newReservation = { ...reservationForm, idUsuario: randomId };

      await axios.post("https://restaurante-system-api.us-e2.cloudhub.io/api/reservaciones", newReservation);
      fetchData("reservaciones");
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  const createOrder = async () => {
    try {
      const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const newOrder = { ...orderForm, idUsuario: randomId };

      await axios.post("https://restaurante-system-api.us-e2.cloudhub.io/api/pedidos", newOrder);
      fetchData("pedidos");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleEdit = (idUsuario) => {
    console.log(`Editar elemento con ID Usuario: ${idUsuario}`);
    // Agrega lógica de edición aquí...
  };

  const handleDelete = (idUsuario) => {
    console.log(`Eliminar elemento con ID Usuario: ${idUsuario}`);
    // Agrega lógica de eliminación aquí...
  };

  const renderTable = () => {
    return (
      <div className="center-container">
        <h2>{selectedTable === "reservaciones" ? "Reservaciones" : "Pedidos"}</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID Usuario</th>
                {selectedTable === "reservaciones" && (
                  <>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Personas</th>
                    <th>Celular</th>
                    <th>Tipo Pago</th>
                    <th>Anotaciones</th>
                    <th>Acciones</th>
                  </>
                )}
                {selectedTable === "pedidos" && (
                  <>
                    <th>Total</th>
                    <th>Tipo Pago</th>
                    <th>Tipo Entrega</th>
                    <th>Celular</th>
                    <th>Productos</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.idUsuario}>
                  <td>{item.idUsuario}</td>
                  {selectedTable === "reservaciones" && (
                    <>
                      <td>{item.fecha}</td>
                      <td>{item.hora}</td>
                      <td>{item.personas}</td>
                      <td>{item.celular}</td>
                      <td>{item.tipo_pago}</td>
                      <td>{item.anotaciones}</td>
                    </>
                  )}
                  {selectedTable === "pedidos" && (
                    <>
                      <td>{item.total}</td>
                      <td>{item.tipo_pago}</td>
                      <td>{item.tipo_entrega}</td>
                      <td>{item.celular}</td>
                      <td>{item.productos}</td>
                      <td>{item.direccion}</td>
                    </>
                  )}
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(item.idUsuario)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.idUsuario)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderCreateForm = () => {
    return (
      <div className="right-container">
        <h2>Crear {selectedTable === "reservaciones" ? "Reservación" : "Pedido"}</h2>
        <form>
          {selectedTable === "reservaciones" && (
            <>
              <div className="mb-3">
                <label htmlFor="fecha" className="form-label">
                  Fecha:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha"
                  value={reservationForm.fecha}
                  onChange={(e) => handleReservationFormChange("fecha", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="hora" className="form-label">
                  Hora:
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="hora"
                  value={reservationForm.hora}
                  onChange={(e) => handleReservationFormChange("hora", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="personas" className="form-label">
                  Personas:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="personas"
                  value={reservationForm.personas}
                  onChange={(e) => handleReservationFormChange("personas", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="celular" className="form-label">
                  Celular:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="celular"
                  value={reservationForm.celular}
                  onChange={(e) => handleReservationFormChange("celular", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipo_pago" className="form-label">
                  Tipo Pago:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipo_pago"
                  value={reservationForm.tipo_pago}
                  onChange={(e) => handleReservationFormChange("tipo_pago", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="anotaciones" className="form-label">
                  Anotaciones:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="anotaciones"
                  value={reservationForm.anotaciones}
                  onChange={(e) => handleReservationFormChange("anotaciones", e.target.value)}
                />
              </div>
            </>
          )}
          {selectedTable === "pedidos" && (
            <>
              <div className="mb-3">
                <label htmlFor="total" className="form-label">
                  Total:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="total"
                  value={orderForm.total}
                  onChange={(e) => handleOrderFormChange("total", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipo_pago" className="form-label">
                  Tipo Pago:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipo_pago"
                  value={orderForm.tipo_pago}
                  onChange={(e) => handleOrderFormChange("tipo_pago", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipo_entrega" className="form-label">
                  Tipo Entrega:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipo_entrega"
                  value={orderForm.tipo_entrega}
                  onChange={(e) => handleOrderFormChange("tipo_entrega", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="celular" className="form-label">
                  Celular:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="celular"
                  value={orderForm.celular}
                  onChange={(e) => handleOrderFormChange("celular", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productos" className="form-label">
                  Productos:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productos"
                  value={orderForm.productos}
                  onChange={(e) => handleOrderFormChange("productos", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">
                  Dirección:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  value={orderForm.direccion}
                  onChange={(e) => handleOrderFormChange("direccion", e.target.value)}
                />
              </div>
            </>
          )}
          <button type="button" className="btn btn-primary" onClick={selectedTable === "reservaciones" ? createReservation : createOrder}>
            Crear {selectedTable === "reservaciones" ? "Reservación" : "Pedido"}
          </button>
        </form>
      </div>
    );
  };

  const renderDropdown = () => {
    return (
      <div className="left-container">
        <label htmlFor="tableSelector" className="form-label">
          Seleccionar tabla:
        </label>
        <select
          id="tableSelector"
          className="form-select"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
        >
          <option value="reservaciones">Reservaciones</option>
          <option value="pedidos">Pedidos</option>
        </select>
      </div>
    );
  };

  return (
    <div className="admin-container">
      {renderDropdown()}
      {renderTable()}
      {renderCreateForm()}
    </div>
  );
};
