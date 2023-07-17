import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import BestProjects from '../../pages/BestProjects/BestProjects';

const Rotas = () => (
    <Routes>
        <Route path='/find_github' element={ <Home /> } />
        <Route path='/find_github/repos/:login' element={ <BestProjects /> } />
    </Routes>
)

export default Rotas;