import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users/register', { // Cambié la URL a 3000
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, email, password }), // Incluye el rol en el cuerpo de la solicitud
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message); // Captura el mensaje de error del backend
            }

            const data = await response.json();
            console.log(data); // Muestra la respuesta en la consola
            navigate('/'); // Redirige a la página de inicio después del registro
        } catch (error) {
            setError(error.message); // Usa setError para mostrar el mensaje de error
        }
    };

    const handleLoginRedirect = () => {
        navigate('/'); // Redirige a la página de inicio
    };

    return (
        <div>
            <h2>Registro de Usuario</h2>
            {error && <p style={{ color: 'black' }}>{error}</p>}
            <form onSubmit={handleRegister} className="formulario">
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>
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
                <div className="buttonR">
                <button type="button" onClick={handleLoginRedirect}>Volver</button>
                <button type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    );
};

export default Registro;