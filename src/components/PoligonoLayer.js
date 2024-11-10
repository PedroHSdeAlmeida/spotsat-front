import React from 'react';
import { Polygon, Popup, Tooltip } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

function PoligonoLayer({ poligono, pathOptions }) {
  const navigate = useNavigate();

  const handlePoligonoClick = () => {
    navigate(`/poligono/${poligono.id}`);
    console.log("Poligono clicado:", poligono);
  };

  let positions = [];
  if (poligono.geometria.type === 'Polygon') {
    if (poligono.geometria.coordinates && poligono.geometria.coordinates.length > 0) {
      positions = poligono.geometria.coordinates.map((ring) =>
        ring.map((coord) => [coord[1], coord[0]])
      );
    } else {
      console.error('Coordinates are missing or invalid in poligono:', poligono);
      return null;
    }

    return (
      <Polygon
        key={poligono.id}
        positions={positions}
        pathOptions={pathOptions || { color: 'blue' }}
        eventHandlers={{
          click: handlePoligonoClick,
        }}
      >
        <Tooltip direction="top" offset={[0, -20]} opacity={1}>
          <div>
            {/* <p>ID: {poligono.id}</p> */}
            <p>Área: {poligono.areaHectares.toFixed(2)} ha</p>
            <p>Centroid: {poligono.areaHectares.toFixed(2)}</p>
          </div>
        </Tooltip>
        <Popup>
          <div>
            {/* <p>ID: {poligono.id}</p> */}
            <p>Área (ha): {poligono.areaHectares.toFixed(2)}</p>
            <p>Centroid: {poligono.areaHectares.toFixed(2)}</p>
            <button
              onClick={() => navigate(`/poligono/${poligono.id}`)}
              className="px-2 py-1 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Ver Detalhes
            </button>
          </div>
        </Popup>
      </Polygon>
    );
  } else if (poligono.geometria.type === 'MultiPolygon') {
    if (poligono.geometria.coordinates && poligono.geometria.coordinates.length > 0) {
      positions = poligono.geometria.coordinates.map((polygon) =>
        polygon.map((ring) =>
          ring.map((coord) => [coord[1], coord[0]])
        )
      );
    } else {
      console.error('Coordinates are missing or invalid in poligono:', poligono);
      return null;
    }

    return (
      <>
        {positions.map((polygonPositions, index) => (
          <Polygon
            key={`${poligono.id}-${index}`}
            positions={polygonPositions}
            pathOptions={{ color: 'blue' }}
            eventHandlers={{
              click: handlePoligonoClick,
            }}
          >
            <Tooltip direction="top" offset={[0, -20]} opacity={1}>
              <div>
                {/* <p>ID: {poligono.id}</p> */}
                <p>Área: {poligono.areaHectares.toFixed(2)} ha</p>
                <p>Centroid: {poligono.areaHectares.toFixed(2)}</p>
              </div>
            </Tooltip>
            <Popup>
              <div>
                {/* <p>ID: {poligono.id}</p> */}
                <p>Área (ha): {poligono.areaHectares.toFixed(2)}</p>
                <p>Centroid: {poligono.areaHectares.toFixed(2)}</p>
                <button
                  onClick={() => navigate(`/poligono/${poligono.id}`)}
                  className="px-2 py-1 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Ver Detalhes
                </button>
              </div>
            </Popup>
          </Polygon>
        ))}
      </>
    );
  } else {
    console.error('Tipo de geometria não suportado:', poligono.geometria.type);
    return null;
  }
}

export default PoligonoLayer;
