import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Createlist from './components/Createlist';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/createlist' element={<Createlist />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
