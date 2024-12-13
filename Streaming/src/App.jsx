import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Registro from './componentes/Registro';
import Login from './componentes/Login';
import Inicio from './componentes/Inicio';
import UserProfile from './componentes/UserProfile';
import CreateContent from './componentes/crud/CreateContent';
import MyVideos from './componentes/crud/MyVideos';
import AddEpisode from './componentes/crudEpisodios/AddEpisodios';

const App = () => {
    return (
      <div className='background'>
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/registro' element={<Registro />} />
                <Route path='/inicio' element={<Inicio/>}/>
                <Route path='/profile' element={<UserProfile/>}/>
                <Route path='/create-content' element={<CreateContent/>}/>
                <Route path="/my-videos/:id" element={<MyVideos />} />
                <Route path="/add-episode/:id" element={<AddEpisode />} />
            </Routes>
        </Router>
      </div>
    );
}

export default App;