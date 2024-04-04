import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./reservar.css";
import local1 from "/local1.jpeg"; 
import local2 from "/local2.jpeg"; 
import local3 from "/local3.jpeg"; 

export const Reservar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [peopleCount, setPeopleCount] = useState(0);
  const [paymentType, setPaymentType] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [anotaciones, setAnotaciones] = useState(selectedPlace);
  const [IdUsuario, setIdUsuario] = useState("");
  const [showNotification, setShowNotification] = useState(false); // Estado para mostrar la notificación
  const [showIncompleteFieldsNotification, setShowIncompleteFieldsNotification] = useState(false); // Estado para mostrar la notificación de campos incompletos


    // Función para obtener el valor de la cookie "idCliente"
  const getCookieValue = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length)
          .replace(/\[|\]|"/g, ''); 
      }
    }
    return "";
  };

  useEffect(() => {
    const idCliente = getCookieValue("idCliente");
    setIdUsuario(idCliente);
  }, []); 
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleReservarClick = (place) => {
    setSelectedPlace(place);
    setAnotaciones(place); 
    const modal = document.querySelector(".Reservar");
    modal.style.display = "block";
  };
  

  const handleCloseModal = () => {
    const modal = document.querySelector(".Reservar");
    modal.style.display = "none";
  };

  const handleSubmit = async () => {
    try {
      if (
        selectedPlace === "" ||
        peopleCount === 0 ||
        paymentType === "" ||
        phoneNumber === "" ||
        selectedDate === null ||
        selectedTime === ""
      ) {
        // Mostrar un mensaje de error si algún campo está vacío
        setShowIncompleteFieldsNotification(true); // Mostrar notificación de campos incompletos
        setTimeout(() => {
          setShowIncompleteFieldsNotification(false); // Ocultar notificación después de 3 segundos
        }, 4000); // 4 segundos
        return; // Detener el envío del formulario
      }
  
      // Resto del código para enviar la reserva si todos los campos están completos
      const formattedDate = selectedDate.toISOString().split('T')[0];
  
      const requestBody = {
        Fecha: formattedDate,
        Hora: selectedTime,
        Personas: peopleCount,
        Tipo_pago: paymentType,
        Celular: phoneNumber,
        Anotaciones: anotaciones,
        IdUsuario: IdUsuario,
      };
  
      console.log('Datos del formulario:', requestBody);
  
      const response = await fetch(import.meta.env.VITE_API_RESERVACION, {
        method: 'POST',
        headers: {
          'client_id': import.meta.env.VITE_CLIENT_ID,
          'client_secret': import.meta.env.VITE_CLIENT_SECRET,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
        console.log("Reserva enviada correctamente");
        setShowNotification(true); // Mostrar notificación
        setTimeout(() => {
          setShowNotification(false); // Ocultar notificación después de un tiempo
          handleCloseModal(); // Cerrar modal
        }, 4000); // 4 segundos
      } else {
        console.error("Error al enviar la reserva:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar la reserva:", error.message);
    }
  };

  

  return (
    <div className="container">
      <h4 className="tect-title"> ELIGE TU LOCAL Y RESERVA TU MESA CON NOSTROS </h4>

        <div className="reservar-container">
            <div className="sucursales1" >
              <img className="sucursales" src={local1} alt="Card image" />
                <div className="card-sucursales">
                  <h4 className="card-title-sucursales">Señor Sushi</h4>
                  <p className="card-text-sucursales">Calz Monterrey, La Grullita, 83470 San Luis Río Colorado, Son. </p>
                  <button onClick={() => handleReservarClick("Calzada Monterrey")} className="btn-sucursales flex-grow-1 ">Reservar</button>
                </div>
          </div>

          <div className="sucursales1" >
              <img className="sucursales" src={local2} alt="Card image" />
                <div className="card-sucursales">
                  <h4 className="card-title-sucursales">Señor Sushi 43</h4>
                  <p className="card-text-sucursales">Av Libertad & C.43 10 de Abril, 83458 San Luis Río Colorado, Son. </p>
                  <button onClick={() => handleReservarClick("Libertad y 43")} className="btn-sucursales">Reservar</button>
                </div>
          </div>

          <div className="sucursales1" >
              <img className="sucursales" src={local3} alt="Card image" />
                <div className="card-sucursales">
                  <h4 className="card-title-sucursales">Señor Sushi KM 43</h4>
                  <p className="card-text-sucursales">Av Insurgentes y calle 2da, 21720 Cdad. Guadalupe Victoria, B.C.</p>
                  <button onClick={() => handleReservarClick("Av Insurgentes y 2da Cd. Gpe Victoria")} className="btn-sucursales ">Reservar</button>
                </div>
          </div>
      </div>

      {/*--------------------------------*/}
      {/*Cunado el tamaño es menor de 500px*/}
      <div className="cards-container" >
          <div className="row d-flex justify-content align-items-center ">
          <div className="card" style={{ border: "none",  backgroundColor: "rgba(255, 255, 255, 0)" }}>
                <div className="card-body p-4">
                  <div className="d-flex text-black">
                    
                    <div className="flex-shrink-0">
                      <img
                        src={local1}
                        alt="Generic placeholder image"
                        className="img-fluid"
                        style={{ width: "150px", borderRadius: "10px" }}
                      />
                    </div>

                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">Calzada Monterrey</h5>
                      <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>San Luis Rio Colorado, Sonora  </p>
                      <div className="d-flex pt-1">
                      <button onClick={() => handleReservarClick("Calzada Monterrey")} className="btn-sucursales flex-grow-1 ">Reservar</button>
                      </div>
                    </div>

                  </div>
                </div>
            </div>   

            <div className="card"  style={{border: "none", backgroundColor: "rgba(255, 255, 255, 0)" }}>
                <div className="card-body p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <img
                        src={local2}
                        alt="Generic placeholder image"
                        className="img-fluid"
                        style={{ width: "150px", borderRadius: "10px" }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">Libertad y 43</h5>
                      <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>San Luis Rio Colorado, Sonora  </p>
                      <div className="d-flex pt-1">
                      <button onClick={() => handleReservarClick("Libertad y 43")} className="btn-sucursales flex-grow-1">Reservar</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="card"  style={{ border: "none", backgroundColor: "rgba(255, 255, 255, 0)" }}>
                <div className="card-body p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <img
                        src={local3}
                        alt="Generic placeholder image"
                        className="img-fluid"
                        style={{ width: "150px", borderRadius: "10px" }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">Av Insurgentes y 2da</h5>
                      <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>Cd. Gpe Victoria </p>
                      <div className="d-flex pt-1">
                        <button onClick={() => handleReservarClick("Av Insurgentes y 2da Cd. Gpe Victoria")} className="btn-sucursales flex-grow-1 ">Reservar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
      {/*-----------------------------------------------------------------------------*/}
      {/*FORMULARIO*/}
      <div className="Reservar" style={{ display: "none" }}>
        <div className="row justify-content-center">
            <form>
              <fieldset>
                <legend className="reservar-titulo">REALIZAR LA RESERVACION
                  <button className="btn  btn-outline-danger" onClick={handleCloseModal}>
                    CERRAR
                  </button>
                </legend>

                 {/* Notificación de campos incompletos */}
                  {showIncompleteFieldsNotification && (
                    <div className="alert alert-danger" role="alert">
                      Por favor, completa todos los campos.
                    </div>
                  )}

                 {/* Notificación */}
                  {showNotification && (
                    <div className="alert alert-success" role="alert">
                      ¡La reserva se ha agregado exitosamente!
                    </div>
                  )}

                <div className="col-sm-6" style={{ display: "none" }}>
                    <div className="form-group">
                        <label htmlFor="id" className="form-label mt-4 d-block">
                        Id Ususario  
                        </label>
                        <input
                          type="text"
                          id="id"
                          className="form-control"
                          value={IdUsuario}
                          onChange={(e) => setIdUsuario(e.target.value)}
                        />
                    </div>
                  </div>
              
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="lugar" className="form-label mt-4 d-block">
                        Lugar de Reservacion 
                        </label>
                        <input
                      type="text"
                      className="form-control"
                      id="inputPlace"
                      placeholder=""
                      value={selectedPlace}
                      readOnly 
                    />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="cantpersonas" className="form-label mt-4">
                        Cantidad de personas
                        </label>
                        <select 
                          className="form-select" 
                          id="numeroPersonas"
                          value={peopleCount}
                          onChange={(e) => setPeopleCount(parseInt(e.target.value))}
                        > 
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">+10</option>
                        </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="pago" className="form-label mt-4 d-block">
                          Tipo de pago
                        </label>
                        <select 
                          className="form-select" 
                          id="pago"
                          value={paymentType} 
                          onChange={(e) => setPaymentType(e.target.value)}
                        >
                          <option value="">Selecciona tipo de pago</option>
                          <option value="Efectivo">Efectivo</option>
                          <option value="Tarjeta">Tarjeta</option>
                        </select>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="telefono" className="form-label mt-4" id="telefono">
                          Numero Telefonico
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputName"
                          placeholder="000 000 0000"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="fecha" className="form-label mt-4 d-block" id="fecha">
                          Fecha
                        </label>
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                          />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="hora" className="form-label mt-4" id="hora">
                          Hora
                        </label>
                          <input
                            type="time"
                            id="inputTime"
                            className="form-control"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            style={{ fontSize: "16px", padding: "0.375rem 0.75rem" }}
                          />
                    </div>
                  </div>
                </div>
                <br />
              </fieldset>              
          </form>
             <button type="submit" className="btn-reservar" onClick={handleSubmit}>
                  Reservar
             </button> 
        </div>
      </div>
    </div>
  );
};
