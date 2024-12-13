import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Subscribe from './Subscribe';
import CreateContent from './crud/CreateContent'; // Importar el componente para crear contenido

const UserProfile = () => {
    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:3000/users/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token esté almacenado
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener el perfil del usuario');
                }

                const data = await response.json();
                setUser (data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Error al cargar el perfil del usuario');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="user-profile">
            <h1>Perfil de Usuario</h1>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>

            {/* Ocultar información de Premium y Estado si es creador o admin */}
            {user.rol !== 'creator' && user.rol !== 'admin' && (
                <>
                    <p><strong>Estado:</strong> {user.estado}</p>
                    <p><strong>Premium hasta:</strong> {user.premiumExpiresAt ? new Date(user.premiumExpiresAt).toLocaleDateString() : 'No es premium'}</p>
                </>
            )}

            {/* Mostrar el componente de suscripción solo si el usuario no es creador ni admin */}
            {user.rol !== 'creator' && user.rol !== 'admin' && user.estado !== 'premium' && (
                <Subscribe userId={user.id} />
            )}

            {/* Mostrar botones para creadores */}
            {user.rol === 'creator' && (
                <div>
                    <h2>Opciones de Creador</h2>
                    <button onClick={() => navigate('/create-content')}>Crear Contenido</button>
                    <button onClick={() => navigate(`/my-videos/${user.id}`)}>Mis Videos</button>
                </div>
            )}

            {/* Mostrar el componente para crear contenido si el usuario es un creador o admin */}
            {(user.rol === 'creator' || user.rol === 'admin') && (
                <div>
                    <h2>Crear Nueva Serie o Película</h2>
                    <CreateContent />
                </div>
            )}
        </div>
    );
};

export default UserProfile;