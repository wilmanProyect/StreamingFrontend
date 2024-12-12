import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para obtener datos del backend
  const fetchData = () => {
    fetch('http://localhost:3000/api/data') // Cambié el puerto a 3000
      .then(response => response.json())
      .then(data => setData(data.message))
      .catch(error => console.error('Error al obtener datos:', error));
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/login', { // Cambié la URL a 3000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message); // Captura el mensaje de error del backend
      }

      const data = await response.json();
      console.log(data); // Muestra la respuesta en la consola

      // Almacena el token en el localStorage o en el estado global
      localStorage.setItem('token', data.token); // Almacena el token
      navigate('/dashboard'); // Redirige a otra página después de iniciar sesión
    } catch (error) {
      setError(error.message); // Usa setError para mostrar el mensaje de error
    }
  };

  useEffect(() => {
    fetchData(); // Llama a la función para obtener datos al cargar el componente
  }, []);

  const handleRegisterRedirect = () => {
    navigate('/registro');
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error */}
      <form onSubmit={handleLogin} className="formulario">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p>¿No tienes una cuenta? <a onClick={handleRegisterRedirect}>Regístrate</a></p>
      </form>
    </div>
  );
};

export default Login;