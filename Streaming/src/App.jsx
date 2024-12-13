import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Registro from './componentes/Registro';
import Login from './componentes/Login';
import Inicio from './componentes/Inicio';
import UserProfile from './componentes/UserProfile';

const App = () => {
    return (
      <div className='background'>
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/registro' element={<Registro />} />
                <Route path='/inicio' element={<Inicio/>}/>
                <Route path='/profile' element={<UserProfile/>}/>
            </Routes>
        </Router>
      </div>
    );
}

export default App;