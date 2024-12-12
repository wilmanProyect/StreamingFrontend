import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Registro from './componentes/Registro';
import Login from './componentes/Login';

const App = () => {
    return (
      <div className='background'>
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/registro' element={<Registro />} />
            </Routes>
        </Router>
      </div>
    );
}

export default App;