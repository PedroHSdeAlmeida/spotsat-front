import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    try {
      await login(email, senha);
    } catch (erro) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-4">
            Senha:
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </label>
          <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
