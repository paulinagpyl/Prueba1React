const Buscador = ({ onCiudadChange, onOrdenChange, allCiudadData }) => {
  const handleCiudadChange = (event) => {
    const selectedCiudad = event.target.value; //ciudad desde el desplegable
    onCiudadChange(selectedCiudad);
  };

  const handleOrdenChange = (event) => {
    const selectedOrden = event.target.value; //orden desde deplegable
    onOrdenChange(selectedOrden);
  };

  return (
    <form className="Opciones" onSubmit={(e) => e.preventDefault()}>
      <div className="mb-3">
        
        <br />
        <label htmlFor="ciudad" className="form-label"><strong>Selecciona una ciudad :</strong></label>
        <select className="form-select" id="ciudad" onChange={handleCiudadChange}> {/* onChange devuelve solo la ciudad */}
          <option value="">Todas las ciudades</option>{/* Crea desplegable de ciudades */}
          {allCiudadData.map((ciudad, index) => (<option key={index} value={ciudad.Estacion}>{ciudad.Estacion}</option>))}
        </select>

      </div>
      <div className="mb-3">
   
        <label htmlFor="orden" className="form-label"><strong>Ordenar por :</strong></label>
        <select className="form-select" id="orden" onChange={handleOrdenChange}>{/* onChange devuelve datos ordenados*/}
          <option value="">Selecciona un criterio</option> {/* Crea desplegables para ordenar */}
          <option value="temp">Temperatura</option>
          <option value="estado">Estado</option>
        </select>
   
      </div>
      <br />
    </form>
  );
};

export default Buscador;
