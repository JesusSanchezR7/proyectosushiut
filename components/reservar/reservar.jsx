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
    <div className="container">
          <h4 className="tect-title"> ELIGE TU LOCAL Y RESERVA TU MESA CON NOSTROS </h4>
    <div className="reservar-container">
      <div className="sucursales1" style={{ width: "400px" }}>
      <img className="sucursales" src="../../img/fondos/local1.jpeg" alt="Card image" />
      <div className="card-sucursales">
        <h4 className="card-title-sucursales">Señor Sushi</h4>
        <p className="card-text-sucursales">Calz Monterrey, La Grullita, 83470 San Luis Río Colorado, Son. </p>
        <button onClick={() => handleReservarClick("Calzada Monterrey")} className="btn-sucursales flex-grow-1 ">Reservar</button>
      </div>
    </div>

    <div className="sucursales1" style={{ width: "400px" }}>
      <img className="sucursales" src="../../img/fondos/local2.jpeg" alt="Card image" />
      <div className="card-sucursales">
        <h4 className="card-title-sucursales">Señor Sushi 43</h4>
        <p className="card-text-sucursales">Av Libertad & C.43 10 de Abril, 83458 San Luis Río Colorado, Son. </p>
        <button onClick={() => handleReservarClick("Libertad y 43")} className="btn-sucursales">Reservar</button>
      </div>
    </div>

    <div className="sucursales1" style={{ width: "400px" }}>
      <img className="sucursales" src="../../img/fondos/local3.jpeg" alt="Card image" />
      <div className="card-sucursales">
        <h4 className="card-title-sucursales">Señor Sushi KM 43</h4>
        <p className="card-text-sucursales">Av Insurgentes y calle 2da, 21720 Cdad. Guadalupe Victoria, B.C.</p>
        <button onClick={() => handleReservarClick("Av Insurgentes y 2da Cd. Gpe Victoria")} className="btn-sucursales ">Reservar</button>
      </div>
    </div>
  </div>


{/*   ------------ --------------------  */}
    <div className="cards-container">
    <div className="row d-flex justify-content align-items-center ">
        <div className="card" style={{ borderRadius: "15px" }}>
          <div className="card-body p-4">
            <div className="d-flex text-black">
              <div className="flex-shrink-0">
                <img
                  src="../../img/fondos/local1.jpeg"
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
                  src="../../img/fondos/local2.jpeg"
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
                  src="../../img/fondos/local3.jpeg"
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
      <div className="Reservar" style={{ display: "none" }}>
    <div className="row justify-content-center">
          <form>
            <fieldset>
              <legend>Reservar  <button className="btn  btn-outline-danger" onClick={handleCloseModal}>
              x
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
            <div className="">
            <a  class="btn btn-danger btn-lg">Reservar</a>
           </div>
         </form>
       </div>
      
     </div>
     </div>
  );
};
