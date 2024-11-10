import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import MapaPage from './pages/MapaPage';
import PoligonoDetalhe from './components/PoligonoDetalhe';
import PoligonoForm from './components/PoligonoForm';
import BuscaPorRaio from './components/BuscaPorRaio';


function App() {
  const PrivateRoute = ({ children }) => {
    const { autenticado, carregando } = useContext(AuthContext);

    if (carregando) {
      return <div>Carregando...</div>;
    }

    if (!autenticado) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MapaPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/poligono/:id"
            element={
              <PrivateRoute>
                <PoligonoDetalhe />
              </PrivateRoute>
            }
          />
          <Route
            path="/criar-poligono"
            element={
              <PrivateRoute>
                <PoligonoForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/polygons"
            element={
              <PrivateRoute>
                <PoligonoForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/editar-poligono/:id"
            element={
              <PrivateRoute>
                <PoligonoForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/buscar-por-raio"
            element={
              <PrivateRoute>
                <BuscaPorRaio />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
