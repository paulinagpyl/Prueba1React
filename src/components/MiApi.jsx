import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container } from "react-bootstrap";
import Buscador from "./Buscador";

const MiApi = () => {
  const [ciudadData, setCiudadData] = useState([]); //estado para mostrar ciudades en cards
  const [allCiudadData, setAllCiudadData] = useState([]); //estado para cargar desplegable de ciudades
  const [orden, setOrden] = useState(""); //estado para guardar opcion de orden

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://api.gael.cloud/general/public/clima`;
        const response = await axios.get(apiUrl);
        setCiudadData(response.data); //carga datos de api que luego se renderiza en card en return
        setAllCiudadData(response.data); //carga datos de api en desplegable de ciudades
      } catch (error) {
        console.log("Error al obtener datos de la API:", error);
      }
    };
    fetchData();
  }, []); //dependencia solo en montaje del componente 

  const handleCiudadChange = (selectedCiudad) => {
    if (selectedCiudad === "") {setCiudadData(allCiudadData);}
    else { 
      const filteredData = allCiudadData.filter((item) => item.Estacion === selectedCiudad); //filtra por ciudad
      setCiudadData(filteredData);}
  };

  const handleOrdenChange = (selectedOrden) => {
    setOrden(selectedOrden);  
    let sortedData = [...ciudadData];//guarda copia
    if (selectedOrden === "temp") {sortedData = sortedData.sort((a, b) => a.Temp - b.Temp);} //ordena por el criterio
    else if (selectedOrden === "estado") {
      sortedData = sortedData.sort((a, b) => a.Estado.localeCompare(b.Estado));}
      setCiudadData(sortedData);
  };

  return (
    <Container>
      <Buscador
        onCiudadChange={handleCiudadChange} //funcion para manipular cambio de ciudad
        onOrdenChange={handleOrdenChange} //funcion para manipular seleccion orden
        allCiudadData={allCiudadData}// los datos de la api
      />
      <div className="mt-5 d-flex justify-content-center gap-3 CardContainer">
        {ciudadData.length > 0 ? (
          ciudadData.map((item, index) => (
            <Card key={index}>
              <Card.Body className="Card">
                <br />
                {/* Muestra los detalles de cada ciudad en las tarjetas */}
                <Card.Title style={{ fontWeight: "bold", textTransform: "uppercase" }}>CIUDAD: {item.Estacion}</Card.Title>
                <hr />
                <Card.Text>Temperatura: {item.Temp}</Card.Text>
                <Card.Text>Humedad: {item.Humedad}</Card.Text>
                <Card.Text>Estado: {item.Estado}</Card.Text>
                <Card.Text>Hora actualización: {item.HoraUpdate}</Card.Text>
                <br />
              </Card.Body>
              <br />
            </Card>
          ))) 
        : (<h1>No hay ciudades para mostrar</h1>)
        }
      </div>
    </Container>
  );
};

export default MiApi;
