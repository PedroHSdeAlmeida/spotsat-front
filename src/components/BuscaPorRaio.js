import React, { useState } from 'react';
import api from '../api/api';
import { MapContainer, TileLayer } from 'react-leaflet';
import PoligonoLayer from './PoligonoLayer';

function BuscaPorRaio() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [raio, setRaio] = useState('');
  const [poligonosEncontrados, setPoligonosEncontrados] = useState([]);

  const handleBuscar = async (evento) => {
    evento.preventDefault();
    try {
      const params = {
        latitude: Number(latitude),
        longitude: Number(longitude),
        raio: Number(raio),
      };  
      const resposta = await api.get('/polygons/search', { params });
      console.log('Resposta da API:', resposta.data);
      setPoligonosEncontrados(resposta.data);
    } catch (erro) {
      console.error('Erro na requisição:', erro);
      alert('Erro ao buscar polígonos.');
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Busca de Polígonos por Raio</h1>
      <form onSubmit={handleBuscar} className="mb-4">
        <div className="mb-2">
          <label>
            Latitude:
            <input
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </label>
        </div>
        <div className="mb-2">
          <label>
            Longitude:
            <input
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </label>
        </div>
        <div className="mb-2">
          <label>
            Raio (km):
            <input
              type="number"
              value={raio}
              onChange={(e) => setRaio(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </form>

      {poligonosEncontrados.length > 0 && (
        <MapContainer
          center={[latitude, longitude]}
          zoom={8}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {poligonosEncontrados.map((poligono) => (
            <PoligonoLayer key={poligono.id} poligono={poligono} />
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default BuscaPorRaio;
