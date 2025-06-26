import React, { useEffect, useState } from 'react';

function MisReservas({ idUsuario }) {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/reservas/${idUsuario}`)
      .then(res => res.json())
      .then(data => {
        setReservas(data);
        setCargando(false);
      })
      .catch(() => {
        setCargando(false);
      });
  }, [idUsuario]);

  if (cargando) return <div className="text-center mt-5">Cargando reservas...</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Mis reservas</h3>
      {reservas.length === 0 ? (
        <div className="alert alert-warning">No tienes reservas registradas.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>Fecha</th>
                <th>Dirección</th>
                <th>Ubicación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((r, i) => (
                <tr key={i}>
                  <td>{r.fecha_reserva}</td>
                  <td>{r.direccion}</td>
                  <td>{r.tipo_ubicacion}</td>
                  <td>{r.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        <div className="text-left mt-3">
          <a href="/cliente" className="btn btn-info">Volver</a>
        </div>
        </div>
      )}
    </div>
  );
}

export default MisReservas;
