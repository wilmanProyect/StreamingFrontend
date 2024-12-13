import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Subscribe from './Subscribe';

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
            <p><strong>Estado:</strong> {user.estado}</p>
            <p><strong>Rol:</strong> {user.rol}</p>
            <p><strong>Premium hasta:</strong> {user.premiumExpiresAt ? new Date(user.premiumExpiresAt).toLocaleDateString() : 'No es premium'}</p>

            {user.estado !== 'premium' && <Subscribe userId={user.id} />}
        </div>
    );
};

export default UserProfile;