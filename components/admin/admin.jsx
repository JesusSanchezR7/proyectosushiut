import React, { useState, useEffect } from "react";
import "./admin.css";

// Componente principal
export const Admin = () => {
  // Variables de entorno
  const { VITE_CLIENT_ID, VITE_CLIENT_SECRET, VITE_API_RESERVACION, VITE_API_ORDENES, VITE_API_BASE_URL } = import.meta.env;

  // Estados
  const [data, setData] = useState([]);
  const [clientId, setClientId] = useState('');
  const [selectedTable, setSelectedTable] = useState("reservaciones");
  
  const [reservationForm, setReservationForm] = useState({
    Fecha: "",
    Hora: "",
    Personas: "",
    Celular: "",
    Tipo_pago: "",
    Anotaciones: "",
  });

  const [orderForm, setOrderForm] = useState({
    Total: "",
    Tipo_pago: "",
    Tipo_entrega: "",
    Celular: "",
    Productos: "",
    Direccion: "",
  });

     // Función para obtener el valor de una cookie por su nombre
     useEffect(() => {
      const getCookie = (name) => {
          const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
          return cookieValue ? cookieValue.pop() : '';
      };
      const clientIdFromCookie = getCookie('idCliente');
      const decodedClientId = decodeURIComponent(clientIdFromCookie); 
      const cleanClientId = JSON.parse(decodedClientId)[0]; 
     //console.log(cleanClientId);
      setClientId(cleanClientId);
  }, []);

  // Manejadores de cambios en formularios
  const handleReservationFormChange = (field, value) => {
    setReservationForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleOrderFormChange = (field, value) => {
    setOrderForm((prevForm) => ({ ...prevForm, [field]: value }));
  };


  const createReservation = async () => {
    try {
      const { Fecha, Hora, Celular, Tipo_pago, Anotaciones } = reservationForm;
      const Personas = parseInt(reservationForm.Personas); // Convertir a número
      const IdUsuario = clientId;
  
      const newReservation = {
        Fecha,
        Hora,
        Personas,
        Celular,
        Tipo_pago,
        Anotaciones,
        IdUsuario
      };
  
      const response = await fetch(VITE_API_RESERVACION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'client_id': VITE_CLIENT_ID,
          'client_secret': VITE_CLIENT_SECRET,
        },
        body: JSON.stringify(newReservation),
      });
  
      if (response.ok) {
        fetchData("reservaciones");
      } else {
        const errorData = await response.json();
        console.error("Error creating reservation:", errorData.message);
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  const reservationList = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        client_id: VITE_CLIENT_ID,
        client_secret: VITE_CLIENT_SECRET,
      },
    };
    try {
      const response = await fetch(VITE_API_RESERVACION, requestOptions);
      const reservationsData = await response.json();
      setData(reservationsData.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    reservationList();
  }, []);

  
// Función para crear orden
const createOrder = async () => {
  try {
    const idUsuario = clientId();
    console.log("ID Usuario al crear orden:", idUsuario);

    const newOrder = { ...orderForm, idUsuario };
    console.log("Datos de la orden a enviar:", newOrder);

    await fetch(VITE_API_ORDENES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'client_id': VITE_CLIENT_ID,
        'client_secret': VITE_CLIENT_SECRET,
      },
      body: JSON.stringify(newOrder),
    });

    fetchData("ordenes");
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
  // Manejadores de edición y eliminación
  const handleEdit = (clientId) => {
    console.log(`Editar elemento con ID Cliente: ${clientId}`);
    // Agrega lógica de edición aquí...
  };

  const handleDelete = (clientId) => {
    console.log(`Eliminar elemento con ID Cliente: ${clientId}`);
    // Agrega lógica de eliminación aquí...
  };

// Renderizar tabla
const renderTable = () => {
  return (
    <div className="center-container">
      <h2>Reservaciones</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID Cliente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Personas</th>
              <th>Celular</th>
              <th>Tipo Pago</th>
              <th>Anotaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.IdUsuario__c}>
                  <td>{item.IdUsuario__c}</td>
                  <td>{item.Fecha__c}</td>
                  <td>{item.Hora__c}</td>
                  <td>{item.Personas__c}</td>
                  <td>{item.Celular__c}</td>
                  <td>{item.Tipo_pago__c}</td>
                  <td>{item.Anotaciones__c}</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Editar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

  // Renderizar formulario de creación
  const renderCreateForm = () => {
    return (
      <div className="right-container">
        <h2>Crear {selectedTable === "reservaciones" ? "Reservación" : "Pedido"}</h2>
        <form>
          {selectedTable === "reservaciones" && (
            <>
              <div className="mb-3">
                <label htmlFor="Fecha" className="form-label">
                  Fecha:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha"
                  value={reservationForm.Fecha}
                  onChange={(e) => handleReservationFormChange("Fecha", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Hora" className="form-label">
                  Hora:
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="hora"
                  value={reservationForm.Hora}
                  onChange={(e) => handleReservationFormChange("Hora", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Personas" className="form-label">
                  Personas:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Personas"
                  value={reservationForm.Personas}
                  onChange={(e) => handleReservationFormChange("Personas", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Celular" className="form-label">
                  Celular:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Celular"
                  value={reservationForm.Celular}
                  onChange={(e) => handleReservationFormChange("Celular", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Tipo_pago" className="form-label">
                  Tipo Pago:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipo_pago"
                  value={reservationForm.Tipo_pago}
                  onChange={(e) => handleReservationFormChange("Tipo_pago", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Anotaciones" className="form-label">
                  Anotaciones:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Anotaciones"
                  value={reservationForm.Anotaciones}
                  onChange={(e) => handleReservationFormChange("Anotaciones", e.target.value)}
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
                  value={orderForm.Total}
                  onChange={(e) => handleOrderFormChange("Total", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Tipo_pago" className="form-label">
                  Tipo Pago:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Tipo_pago"
                  value={orderForm.Tipo_pago}
                  onChange={(e) => handleOrderFormChange("Tipo_pago", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Tipo_entrega" className="form-label">
                  Tipo Entrega:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Tipo_entrega"
                  value={orderForm.Tipo_entrega}
                  onChange={(e) => handleOrderFormChange("Tipo_entrega", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Celular" className="form-label">
                  Celular:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Celular"
                  value={orderForm.Celular}
                  onChange={(e) => handleOrderFormChange("Celular", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Productos" className="form-label">
                  Productos:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Productos"
                  value={orderForm.Productos}
                  onChange={(e) => handleOrderFormChange("Productos", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Direccion" className="form-label">
                  Dirección:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Direccion"
                  value={orderForm.Direccion}
                  onChange={(e) => handleOrderFormChange("Direccion", e.target.value)}
                />
              </div>
            </>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={selectedTable === "reservaciones" ? createReservation : createOrder}
          >
            Crear {selectedTable === "reservaciones" ? "Reservación" : "Pedido"}
          </button>
        </form>
      </div>
    );
  };

  // Renderizar menú desplegable
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

  // Renderizar componente principal
  return (
    <div className="admin-container">
      {renderDropdown()}
      {renderTable()}
      {renderCreateForm()}
    </div>
  );
};

