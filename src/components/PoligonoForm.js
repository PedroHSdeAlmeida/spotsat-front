import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

function PoligonoForm() {
  const [geometria, setGeometria] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  useEffect(() => {
    if (editando) {
      const carregarPoligono = async () => {
        try {
          const resposta = await api.get(`/polygons/${id}`);
          const geojson = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: resposta.data.properties || {},
                geometry: resposta.data.geometria,
              },
            ],
          };
          setGeometria(JSON.stringify(geojson, null, 2));
        } catch (erro) {
          alert('Erro ao carregar polígono.');
        }
      };
      carregarPoligono();
    }
  }, [editando, id]);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    try {
      const geojson = JSON.parse(geometria);
      if (editando) {
        await api.put(`/polygons/${id}`, geojson);
        alert('Polígono atualizado com sucesso.');
      } else {
        await api.post('/polygons', geojson);
        alert('Polígono criado com sucesso.');
      }
      navigate('/');
    } catch (erro) {
      console.error(erro);
      alert('Erro ao salvar polígono. Verifique o GeoJSON.');
    }
  };

  return (
    <div className="p-4">
    <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 mb-4 text-white bg-gray-500 rounded hover:bg-gray-600"
    >
      Voltar
    </button>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow">
        <h1 className="mb-4 text-2xl font-bold text-center">
          {editando ? 'Editar' : 'Criar'} Polígono
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            GeoJSON:
            <textarea
              value={geometria}
              onChange={(e) => setGeometria(e.target.value)}
              rows={10}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default PoligonoForm;
