import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Cliente from './cliente.jsx';
import Operario from './operario.jsx';
import Admin from './admin.jsx';
import RegistrarCliente from './registrar_cliente.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/cliente" element={<Cliente />} />
      <Route path="/operario" element={<Operario />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/registrar-cliente" element={<RegistrarCliente />} />
    </Routes>
  </BrowserRouter>
);
