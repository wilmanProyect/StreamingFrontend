import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MyVideos = () => {
    const { id } = useParams(); // Obtener el ID del creador desde la URL
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('ID del creador:', id);
        const fetchVideos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/content/creator/${id}/content`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token esté almacenado
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los videos');
                }

                const data = await response.json();
                setVideos(data);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setError('Error al cargar los videos');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="my-videos">
            <h1>Mis Videos</h1>
            {videos.length > 0 ? (
                <div className="video-list">
                    {videos.map((video) => (
                        <div key={video._id} className="video-item">
                            <h3>{video.titulo}</h3>
                            <p>{video.descripcion}</p>
                            <video controls>
                                <source src={video.url} type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay videos disponibles.</p>
            )}
        </div>
    );
};

export default MyVideos;