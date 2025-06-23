import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, clave })
    });
    const data = await res.json();

    if (data.ok) {
      navigate('/dashboard');
    } else {
      setMensaje('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="Usuario" onChange={e => setUsuario(e.target.value)} />
      <input placeholder="Clave" type="password" onChange={e => setClave(e.target.value)} />
      <button onClick={login}>Ingresar</button>
      <p>{mensaje}</p>
    </div>
  );
}

export default App;