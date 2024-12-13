import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StreamingApp = () => {
    const [series, setSeries] = useState([]);
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Función para obtener todas las series
    const fetchAllSeries = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token'); // Obtener el token
            const response = await fetch('http://localhost:3000/content/series', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener las series');
            }
            const data = await response.json();
            setSeries(data);
        } catch (error) {
            console.error('Error fetching series:', error);
            setError('Error al cargar las series: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Función para obtener todas las películas
    const fetchAllMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token'); // Obtener el token
            const response = await fetch('http://localhost:3000/content/movies', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener las películas');
            }
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setError('Error al cargar las películas: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllSeries();
        fetchAllMovies();
    }, []);

    const handleSearch = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            try {
                const response = await fetch(`http://localhost:3000/content/series?titulo=${term}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Incluir el token en el encabezado
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al buscar series');
                }
                const data = await response.json();
                setSeries(data);
            } catch (error) {
                console.error('Error al buscar series:', error);
                setError('No se encontraron series con ese título');
            }
        } else {
            fetchAllSeries();
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='Badb'>
            <nav>
                <h1>Streaming App</h1>
                <input
                    type="text"
                    placeholder="Buscar series o películas..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button onClick={() => navigate('/profile')}>Perfil</button>
            </nav>

            <h2>Series</h2>
            <div className="content-row">
                {series.length > 0 ? (
                    series.map((serie) => (
                        <div key={serie._id} className="content-item">
                            <img src={serie.portada} alt={serie.titulo} />
                            <h3>{serie.titulo}</h3>
                            <p>{serie.descripcion}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay series disponibles.</p>
                )}
            </div>

            <h2>Películas</h2>
            <div className="content-row">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie._id} className="content-item">
                            <img src={movie.portada} alt={movie.titulo} />
                            <h3>{movie.titulo}</h3>
                            <p>{movie.descripcion}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay películas disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default StreamingApp;
