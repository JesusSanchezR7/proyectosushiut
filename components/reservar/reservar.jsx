import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Cosmo/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./reservar.css";


export const Reservar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(""); // Estado para almacenar el lugar de reservación

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleReservarClick = (place) => {
    setSelectedPlace(place); // Establecer el lugar de reservación al hacer clic en el botón
    const modal = document.querySelector(".Reservar");
    modal.style.display = "block";
  };

  const handleCloseModal = () => {
    const modal = document.querySelector(".Reservar");
    modal.style.display = "none";
  };

  return (
    <div className="reservar-container">
      <div className="restauarnte1">
        <button onClick={() => handleReservarClick("Calzada Monterrey")}>Reservar</button>
      </div>
      <div className="restauarnte2">
        <button onClick={() => handleReservarClick("Libertad y 43")}>Reservar</button>
      </div>
      <div className="restauarnte3">
        <button onClick={() => handleReservarClick("Av Insurgentes y 2da Cd. Gpe Victoria")}>Reservar</button>
      </div>

      <div className="Reservar" style={{ display: "none" }}>
    <div className="row justify-content-center">
          <form>
            <fieldset>
              <legend>Reservar  <button className="btn  btn-outline-danger" onClick={handleCloseModal}>
              close
            </button></legend>
              <div className="form-group">
                <label htmlFor="inputName" className="form-label mt-4">
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
              <div className="form-group">
                <label htmlFor="inputName" className="form-label mt-4">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Ingresa tu nombre"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1" className="form-label mt-4">
                  Cantidad de personas
                </label>
                <select className="form-select" id="exampleSelect1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="inputDate" className="form-label mt-4 d-block">
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
                    <label htmlFor="inputTime" className="form-label mt-4">
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
            </fieldset><br></br>
            <div className="d-grid">
            <a href="/" class="btn btn-outline-danger">Reservar</a>
           </div>
         </form>
       </div>
      
     </div>
     </div>
  );
};
