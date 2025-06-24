import { useState } from 'react';
import './App.css';

function App() {
  const [tipo, setTipo] = useState('cliente');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, clave })
    });

    const data = await res.json();
    
    if (data.ok) {
      console.log("ROL recibido:", data.rol, "| pestaña:", tipo);

      if (tipo === 'cliente' && data.rol === 'cliente') {
        window.location.href = '/cliente';
      } else if (tipo === 'personal') {
        if (data.rol === 'operario') {
          window.location.href = '/operario';
        } else if (data.rol === 'administrador') {
          window.location.href = '/admin';
        } else {
          setMensaje('Rol no autorizado para esta pestaña');
        }
      } else {
        setMensaje('Rol incorrecto para esta pestaña');
      }
    } else {
      setMensaje(data.mensaje || 'Error de autenticación');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Inicio de sesión</h3>

        <ul className="nav nav-pills nav-justified mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${tipo === 'cliente' ? 'active' : ''}`}
              onClick={() => setTipo('cliente')}
            >
              Cliente
            </button>
            
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${tipo === 'personal' ? 'active' : ''}`}
              onClick={() => setTipo('personal')}
            >
              Personal de la empresa
            </button>
          </li>
        </ul>

        <form onSubmit={login}>
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

          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>

          {mensaje && (
            <div className="alert alert-danger mt-3 mb-0 text-center p-2">
              {mensaje}
            </div>
          )}
          {tipo === 'cliente' && (
            <div className="text-center mt-3">
              <a href="/registrar-cliente" className="btn btn-link">
                ¿No tienes cuenta? Regístrate aquí
              </a>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

export default App;
