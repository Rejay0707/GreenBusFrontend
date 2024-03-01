import Navbar from './Navbar';
import './App.css';
import Home from './pages/Home';
import Help from './pages/Help';
import Account from './pages/Account';
import BusManagement from './pages/Bus';
import { Route,Routes } from 'react-router-dom';


const App=()=> {

  return (
    <>
    <Navbar />
    <div className='styling'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/busManagement' element={<BusManagement/>}/>
        
      </Routes>
    </div>
    </>
  );
}

export default App;
