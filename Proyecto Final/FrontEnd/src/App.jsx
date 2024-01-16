import './App.css';
import { Home } from './screen/Home';
import { Login } from './screen/Login/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Registro } from './screen/Registro/Registro';
import { Recuperacion } from './screen/Recuperacion/Recuperacion';



function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/recuperacion" element={<Recuperacion/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="*" element={<Login/>} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default App;
