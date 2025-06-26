import React from 'react';
import { useNavigate } from 'react-router-dom';

function Operario({ nombreUsuario }) {
  const navigate = useNavigate();

  const irAMisTareas = () => navigate('/operario/mis-tareas');
  const irAReservasPendientes = () => {
    navigate('/operario/reservas-disponibles');
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>Bienvenido, {nombreUsuario || 'Operario'}</h2>
        <p className="text-muted">Selecciona una acción:</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm p-3 mb-4">
            <div className="card-body text-center">
              <h5 className="card-title">Ver reservas pendientes</h5>
              <p className="card-text">Consulta las reservas sin asignar y elige cuáles tomar.</p>
              <button className="btn btn-primary" onClick={irAReservasPendientes}>
                Ver reservas
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm p-3 mb-4">
            <div className="card-body text-center">
              <h5 className="card-title">Mis tareas activas</h5>
              <p className="card-text">Consulta tus reservas asignadas pendientes de completar.</p>
              <button className="btn btn-outline-secondary" onClick={irAMisTareas}>
                Ver tareas
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm p-3 mb-4">
            <div className="card-body text-center">
              <h5 className="card-title">Mi historial</h5>
              <p className="card-text">Ver tareas completadas.</p>
              <button className="btn btn-outline-secondary">Ver historial</button>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Operario;
