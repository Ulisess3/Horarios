import React, { useState } from 'react';

function RegistrarCliente() {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');

  const registrar = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/registrar-cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, correo, clave })
      });

      const data = await res.json();
      console.log(data);

      if (data.ok) {
        setUsuario('');
        setClave('');
        setCorreo('');
        setMensaje('Registro exitoso. Redirigiendo...')
          setTimeout(() => {
            window.location.href = '/';
        }, 2000);

      } else {
        setMensaje(data.mensaje || 'Error al registrar');
      }
    } catch (error) {
      setMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Registro de Cliente</h3>

        <form onSubmit={registrar}>
          <div className="form-group mb-3">
            <label>Usuario</label>
            <input
              type="text"
              className="form-control"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              placeholder="Nombre de usuario"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Correo</label>
            <input
              type="text"
              className="form-control"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              placeholder="Correo"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={clave}
              onChange={e => setClave(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Registrarse
          </button>

          {mensaje && (
            <div className="alert alert-warning mt-3 mb-0 text-center p-2">
              {mensaje}
            </div>
          )}
        </form>

        <div className="text-center mt-3">
          <a href="/" className="btn btn-link">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export default RegistrarCliente;
