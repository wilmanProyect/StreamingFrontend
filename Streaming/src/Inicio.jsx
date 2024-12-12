import { Link } from 'react-router-dom';

const Inicio = () => {
    return (
        <div>
            <h2>Página de Inicio</h2>
            <p>Bienvenidos a la página principal de mi aplicación web</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/inicio">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/componentes/calculadora">Calculadora</Link>
                    </li>
                    <li>
                        <Link to="/componentes/calculadora">Calculadora</Link>
                    </li>
                    <li>
                        <Link to="/componentes/listastareas">Listas de Tareas</Link>
                    </li>
                    <li>
                        <Link to="/componentes/minusculas">Minusculas</Link>
                    </li>
                    <li>
                        <Link to="/formularios/formularioSesion">Formulario de Sesión</Link>
                    </li>
                    <li>
                        <Link to="/formularios/formularioValidacion">Formulario de Validación</Link>
                    </li>
                    <li>
                        <Link to="/semana5/peliculas">Peliculas</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Inicio;