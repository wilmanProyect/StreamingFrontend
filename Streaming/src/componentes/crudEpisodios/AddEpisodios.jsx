import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddEpisode = () => {
    const { id } = useParams(); // Obtener el ID de la serie desde la URL
    const navigate = useNavigate(); // Hook para redirigir
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [numero, setNumero] = useState('');
    const [temporada, setTemporada] = useState('');
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [seriesData, setSeriesData] = useState(null); // Para almacenar los datos de la serie

    // Función para obtener los datos de la serie
    const fetchSeriesData = async (id) => {
        const response = await fetch(`http://localhost:3000/content/series/${id}`);
        if (!response.ok) {
            throw new Error('Serie no encontrada');
        }
        return await response.json();
    };

    // useEffect para cargar los datos de la serie
    useEffect(() => {
        if (id) {
            fetchSeriesData(id)
                .then(data => {
                    setSeriesData(data); // Almacenar los datos de la serie
                })
                .catch(error => {
                    console.error(error.message);
                    setError('No se pudo cargar la serie.'); // Manejar el error
                });
        } else {
            setError('ID de serie no válido.');
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('numero', numero);
        formData.append('temporada', temporada);
        formData.append('video', video);

        try {
            const response = await fetch(`http://localhost:3000/content/series/${id}/episodes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token esté almacenado
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al agregar el episodio');
            }

            const data = await response.json();
            alert(data.message); // Mostrar mensaje de éxito
            // Limpiar el formulario
            setTitulo('');
            setDescripcion('');
            setNumero('');
            setTemporada('');
            setVideo(null);

            // Redirigir a MyVideos
            navigate(`/my-videos/${id}`); // Cambia el ID si es necesario para redirigir correctamente
        } catch (error) {
            console.error('Error adding episode:', error);
            setError(error.message); // Mostrar mensaje de error específico
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-episode">
            <h1>Agregar Episodio</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si existe */}
            {seriesData ? ( // Mostrar el formulario solo si los datos de la serie se cargaron correctamente
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Título:</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Número:</label>
                        <input
                            type="number"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Temporada:</label>
                        <input
                            type="number"
                            value={temporada}
                            onChange={(e) => setTemporada(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Video:</label>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setVideo(e.target.files[0])}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar Episodio'}
                    </button>
                </form>
            ) : (
                <p>Cargando datos de la serie...</p> // Mensaje mientras se cargan los datos de la serie
            )}
        </div>
    );
};

export default AddEpisode;