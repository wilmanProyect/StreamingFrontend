import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateContent = () => {
    const navigate = useNavigate(); // Hook para redirigir
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categorias, setCategorias] = useState('');
    const [clasificacion, setClasificacion] = useState('');
    const [portada, setPortada] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('categorias', categorias);
        formData.append('clasificacion', clasificacion);
        formData.append('portada', portada);
    
        console.log('Datos enviados:', {
            titulo,
            descripcion,
            categorias,
            clasificacion,
            portada,
        });
    
        try {
            const response = await fetch('http://localhost:3000/content/series', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token esté almacenado
                },
                body: formData
            });
    
            console.log('Estado de la respuesta:', response.status);
            if (!response.ok) {
                const errorData = await response.text(); // Capturar más detalles del error
                console.error('Error del servidor:', errorData);
                throw new Error('Error al crear el contenido');
            }
    
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
    
            alert(data.message); // Mostrar mensaje de éxito
            // Limpiar el formulario
            setTitulo('');
            setDescripcion('');
            setCategorias('');
            setClasificacion('');
            setPortada(null);
            // Redirigir a AddEpisode, pasando el ID del contenido creado
            navigate(`/add-episode/${data.episodeId}`); // Asegúrate de que data.episodeId contenga el ID correcto
    
        } catch (error) {
            console.error('Error creating content:', error);
            setError('Error al crear el contenido');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <h2>Crear Serie o Película</h2>
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
                    <label>Categorías (separadas por comas):</label>
                    <input
                        type="text"
                        value={categorias}
                        onChange={(e) => setCategorias(e.target.value)}
                    />
                </div>
                <div>
                    <label>Clasificación:</label>
                    <input
                        type="text"
                        value={clasificacion}
                        onChange={(e) => setClasificacion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Portada:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPortada(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Crear Contenido'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

// Asegúrate de exportar el componente como exportación por defecto
export default CreateContent;