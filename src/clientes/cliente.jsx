import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cliente() {
  const navigate = useNavigate();

  const irAReservar = () => {
    navigate('/reservar');
  };
  const irAVerReservas = () => {
  navigate('/reservas');
};

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>Bienvenido</h2>
        <p className="text-muted">¿Qué deseas hacer hoy?</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm p-3 mb-4">
            <div className="card-body text-center">
              <h5 className="card-title">Reservar un horario</h5>
              <p className="card-text">Solicita un servicio de limpieza para la fecha y lugar que necesites.</p>
              <button className="btn btn-primary" onClick={irAReservar}>
                Reservar ahora
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm p-3 mb-4">
            <div className="card-body text-center">
            <h5 className="card-title">Ver mis reservas</h5>
            <p className="card-text">Consulta tus solicitudes y su estado.</p>
            <button className="btn btn-primary" onClick={irAVerReservas}>
                Ver reservas
            </button>
            </div>
        </div>
        </div>

      </div>
    </div>
  );
}

export default Cliente;