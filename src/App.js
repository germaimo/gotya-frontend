import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./routes/Home";
import Proyecto from "./routes/Proyecto";
import Perfil from "./routes/Perfil";
//import Navbar from "./components/NavBar";
//import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/proyecto" element={<Proyecto />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}