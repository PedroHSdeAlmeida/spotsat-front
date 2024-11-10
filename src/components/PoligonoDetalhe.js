import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import PoligonoLayer from './PoligonoLayer';

function PoligonoDetalhe() {
    const [poligono, setPoligono] = useState(null);
    const { id } = useParams();
    const [poligonosDentro, setPoligonosDentro] = useState([]);
    const navigate = useNavigate();

    const handleBuscarInteresses = async () => {
        try {
            const resposta = await api.get(`/polygons/${id}/interests`);
            setPoligonosDentro(resposta.data);
        } catch (erro) {
            alert('Erro ao buscar polígonos dentro deste polígono.');
        }
    };

    useEffect(() => {
        const carregarPoligono = async () => {
            try {
                const resposta = await api.get(`/polygons/${id}`);
                setPoligono(resposta.data);
            } catch (erro) {
                alert('Erro ao carregar polígono.');
            }
        };
        carregarPoligono();
    }, [id]);

    const handleDeletar = async () => {
        if (window.confirm('Tem certeza que deseja deletar este polígono?')) {
            try {
                await api.delete(`/polygons/${id}`);
                alert('Polígono deletado com sucesso.');
                navigate('/');
            } catch (erro) {
                alert('Erro ao deletar polígono.');
            }
        }
    };

    if (!poligono) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="p-4">
            <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 mb-4 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
                Voltar
            </button>
            <h1 className="mb-4 text-2xl font-bold">Detalhes do Polígono {poligono.id}</h1>
            <p>
                <strong>ID:</strong> {poligono.id}
            </p>
            <p>
                <strong>Área (ha):</strong> {poligono.areaHectares.toFixed(2)}
            </p>
            <p>
                <strong>Centroid:</strong> {poligono.centroide.coordinates.join(', ')}
            </p>
            <p>
                <strong>Usuário id:</strong> {poligono.usuarioId}
            </p>
            
            <div className="mt-4">
                <button
                    onClick={handleDeletar}
                    className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Deletar
                </button>
                <button
                    onClick={() => navigate(`/editar-poligono/${id}`)}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Editar
                </button>
            </div>
            <button
                onClick={handleBuscarInteresses}
                className="px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
                Buscar Polígonos Dentro
            </button>

            {poligonosDentro.length > 1 && (
                <div className="mt-4">
                    <h2 className="mb-2 text-xl font-bold">Polígonos Encontrados:</h2>
                    <MapContainer
                        center={[-15.7801, -47.9292]}
                        zoom={4}
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer
                            attribution="&copy; OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* Exibir o polígono atual */}
                        <Polygon
                            positions={poligono.geometria.coordinates.map((ring) =>
                                ring.map((coord) => [coord[1], coord[0]])
                            )}
                            pathOptions={{ color: 'red' }}
                        />
                        {/* Exibir os polígonos encontrados */}
                        {poligonosDentro.map((poligonoEncontrado) => (
                            <PoligonoLayer
                                key={poligonoEncontrado.id}
                                poligono={poligonoEncontrado}
                                pathOptions={{ color: 'green' }}
                            />
                        ))}
                    </MapContainer>
                </div>
            )}
        </div>
    );
}

export default PoligonoDetalhe;
