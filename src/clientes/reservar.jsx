import React, { useState } from 'react';

function Reservar({ idUsuario }) {
  const [fecha, setFecha] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarReserva = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch('http://localhost:5000/reservar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha, direccion, tipo_ubicacion: tipo, id_usuario: idUsuario })
      });

      const data = await res.json();
      console.log(data)

      if (data.ok) {
        setMensaje('Reserva registrada con éxito');
        setFecha('');
        setDireccion('');
        setTipo('');
        setTimeout(() => {
            window.location.href = '/cliente';
        }, 2000);

      } else {
        setMensaje(data.mensaje || 'Error al registrar');
      }
    } catch (error) {
      setMensaje('Error de conexión');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Solicitar horario de limpieza</h3>
      <form onSubmit={enviarReserva}>
        <div className="form-group mb-3">
          <label>Fecha</label>
          <input type="date" className="form-control" value={fecha} onChange={e => setFecha(e.target.value)} required />
        </div>

        <div className="form-group mb-3">
          <label>Dirección</label>
          <input type="text" className="form-control" value={direccion} onChange={e => setDireccion(e.target.value)} required />
        </div>

        <div className="form-group mb-3">
          <label>Tipo de ubicación</label>
          <select className="form-control" value={tipo} onChange={e => setTipo(e.target.value)} required>
            <option value="">Seleccione</option>
            <option value="hogar">Hogar</option>
            <option value="oficina">Oficina</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <button className="btn btn-primary">Reservar</button>
      </form>

      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  );
}

export default Reservar;
