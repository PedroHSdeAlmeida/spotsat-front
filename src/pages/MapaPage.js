import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import PoligonoLayer from '../components/PoligonoLayer';
import { useLocation } from 'react-router-dom';



function MapaPage() {
    const [poligonos, setPoligonos] = useState([]);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const carregarPoligonos = async () => {
            try {
                const resposta = await api.get('/polygons');
                console.log('Polígonos recebidos:', resposta.data);
                setPoligonos(resposta.data);
            } catch (erro) {
                alert('Erro ao carregar polígonos.');
            }
        };
        carregarPoligonos();
    }, [location]);


    const handleLogout = () => {
        logout();
    };

    const handlePoligonoClick = (id) => {
        navigate(`/poligono/${id}`);
    };

    return (
        <div className="mapa-container">
            <div className="flex justify-between items-center p-4 bg-gray-100">
                <h1 className="text-xl font-bold">Mapa de Polígonos</h1>
                <div>
                    <button
                        onClick={() => navigate('/buscar-por-raio')}
                        className="px-4 py-2 mr-2 text-white bg-purple-500 rounded hover:bg-purple-600"
                    >
                        Buscar por Raio
                    </button>
                    <button
                        onClick={() => navigate('/criar-poligono')}
                        className="px-4 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                        Adicionar Polígono
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Sair
                    </button>
                </div>
            </div>
            <MapContainer center={[-15.7801, -47.9292]} zoom={4} style={{ height: 'calc(100vh - 64px)', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {poligonos.map((poligono) => (
                    <PoligonoLayer key={poligono.id} poligono={poligono} />
                ))}

            </MapContainer>
        </div>
    );
}

export default MapaPage;
