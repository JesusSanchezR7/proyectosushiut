import React, { useState } from "react";
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
  const [peopleCount, setPeopleCount] = useState(1);
  const [paymentType, setPaymentType] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [anotaciones, setAnotaciones] = useState(""); 

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleReservarClick = (place) => {
    setSelectedPlace(place);
    const modal = document.querySelector(".Reservar");
    modal.style.display = "block";
  };

  const handleCloseModal = () => {
    const modal = document.querySelector(".Reservar");
    modal.style.display = "none";
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        Fecha: selectedDate,
        Hora: selectedTime,
        Lugar: selectedPlace,
        Personas: peopleCount,
        Tipo_pago: paymentType,
        Celular: phoneNumber,
        Anotaciones: anotaciones
      };

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
            <div className="sucursales1" style={{ width: "400px" }}>
              <img className="sucursales" src={local1} alt="Card image" />
                <div className="card-sucursales">
                  <h4 className="card-title-sucursales">Señor Sushi</h4>
                  <p className="card-text-sucursales">Calz Monterrey, La Grullita, 83470 San Luis Río Colorado, Son. </p>
                  <button onClick={() => handleReservarClick("Calzada Monterrey")} className="btn-sucursales flex-grow-1 ">Reservar</button>
                </div>
          </div>

          <div className="sucursales1" style={{ width: "400px" }}>
              <img className="sucursales" src={local2} alt="Card image" />
                <div className="card-sucursales">
                  <h4 className="card-title-sucursales">Señor Sushi 43</h4>
                  <p className="card-text-sucursales">Av Libertad & C.43 10 de Abril, 83458 San Luis Río Colorado, Son. </p>
                  <button onClick={() => handleReservarClick("Libertad y 43")} className="btn-sucursales">Reservar</button>
                </div>
          </div>

          <div className="sucursales1" style={{ width: "400px" }}>
              <img className="sucursales" src={local3} alt="Card image" />
                <div className="card-sucursales">
                  <h4 className="card-title-sucursales">Señor Sushi KM 43</h4>
                  <p className="card-text-sucursales">Av Insurgentes y calle 2da, 21720 Cdad. Guadalupe Victoria, B.C.</p>
                  <button onClick={() => handleReservarClick("Av Insurgentes y 2da Cd. Gpe Victoria")} className="btn-sucursales ">Reservar</button>
                </div>
          </div>
      </div>

      {/*--------------------------------*/}
      <div className="cards-container">
          <div className="row d-flex justify-content align-items-center ">
              <div className="card" style={{ borderRadius: "15px" }}>
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

            <div className="card" style={{ borderRadius: "15px" }}>
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

            <div className="card" style={{ borderRadius: "15px" }}>
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
      {/*--------------------------------*/}

            
      <div className="Reservar" style={{ display: "none" }}>
        <div className="row justify-content-center">
            <form>
              <fieldset>
                <legend>Reservar
                  <button className="btn  btn-outline-danger" onClick={handleCloseModal}>
                    CERRAR
                  </button>
                </legend>

                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="id" className="form-label mt-4 d-block">
                        Id Ususario
                        </label>
                        <input type="text" id="id" class="form-control" />
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
                        <select className="form-select" id="numeroPersonas">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>+10</option>
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
                        <select className="form-select" id="pago">
                      <option>Efectivo</option>
                      <option>Tarjeta</option>
                    
                    </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="telefono" className="form-label mt-4" id="telefono">
                          Numero Telefonico
                        </label>
                        <input
                      type="number"
                      className="form-control"
                      id="inputName"
                      placeholder="000 000 0000"
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
                  <button type="submit" className="btn btn-danger" onClick={handleSubmit}>
                  Reservar
                  </button>
              </fieldset>
              
          </form>
        </div>
      </div>
    </div>
  );
};
