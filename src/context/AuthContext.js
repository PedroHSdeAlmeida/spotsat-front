import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    const tokenSalvo = localStorage.getItem('token');

    if (usuarioSalvo && tokenSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
      api.defaults.headers.Authorization = `Bearer ${tokenSalvo}`;
    }
    setCarregando(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const resposta = await api.post('/login', { email, senha });
      const { token } = resposta.data;

      localStorage.setItem('usuario', JSON.stringify({ email }));
      localStorage.setItem('token', token);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUsuario({ email });
      navigate('/');
    } catch (erro) {
      throw erro;
    }
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    setUsuario(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ autenticado: !!usuario, usuario, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
