import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card, Button } from "react-bootstrap";

export default function Charolas() {
  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      const response = await Axios.get("https://restaurante-system-api.us-e2.cloudhub.io/api/menu");
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const handleVerMasClick = (menuItem) => {
    setSelectedMenu(menuItem);
    setShowFullContent(false); // Al abrir el modal, muestra la descripción acortada
  };

  return (
    <div className="container">
      <div className="row">
        {menu.map((menuItem, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Card border="primary" style={{ height: "100%" }}>
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  {menuItem.nombre}
                </Card.Title>
                <Card.Text>
                  Precio: {menuItem.precio}
                  <br />
                  Tiempo de Preparación: {menuItem.tiempo_de_preparacion}
                  <br />
                  Porciones: {menuItem.porciones}
                </Card.Text>
                <Button variant="primary" onClick={() => handleVerMasClick(menuItem)}>
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
