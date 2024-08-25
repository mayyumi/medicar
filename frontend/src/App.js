// App.js
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CadastroUsuarios from './components/CadastroUsuarios';
import Home from './components/Home';
import { ConsultasProvider } from './contexts/ConsultaContext';
import AgendarConsulta from './components/AgendarConsulta';

function App() {
  return (
    <ConsultasProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuarios />} />
        <Route path="/home" element={<Home />} />
        {/* Outras rotas */}
      </Routes>
    </ConsultasProvider>
  );
}

export default App;
