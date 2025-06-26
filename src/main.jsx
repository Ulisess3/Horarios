import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Cliente from './clientes/cliente.jsx';
import Operario from './operarios/operario.jsx';
import Admin from './admin.jsx';
import RegistrarCliente from './clientes/registrar_cliente.jsx';
import Reservar from './clientes/reservar.jsx';
import MisReservas from './clientes/reservas_cliente.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/cliente" element={<Cliente />} />
      <Route path="/operario" element={<Operario />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/registrar-cliente" element={<RegistrarCliente />} />
      <Route path='/reservar' element={<Reservar idUsuario={1} />} />
      <Route path='/reservas' element={<MisReservas idUsuario={1} />} />  

    </Routes>
  </BrowserRouter>
);
