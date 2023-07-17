import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import BestProjects from '../../pages/BestProjects/BestProjects';

const Rotas = () => (
    <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/repos/:login' element={ <BestProjects /> } />
    </Routes>
)

export default Rotas;