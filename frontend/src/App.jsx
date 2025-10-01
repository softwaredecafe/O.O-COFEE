import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import PromoSection from './components/PromoSection';
import FounderSection from './components/FounderSection';
import FormularioPage from './components/FormularioPage';
import Footer from './components/Footer';
import BlogSection from './components/BlogSection';
import CoffeeRolesSection from './components/CoffeeRolesSection';
import RoleDetailPage from './components/RoleDetailPage';
import Productor from './components/Productor'; 
import Barista from './components/Barista';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <PromoSection />
              <FounderSection />
              <Footer />
            </>
          } />
          <Route path="/formulario" element={<FormularioPage />} />
          <Route path="/blog" element={<BlogSection />} />
          
          {/* Ruta para las tarjetas de roles del café (4 tarjetas originales) */}
          <Route path="/roles" element={
            <>
              <Header />
              <CoffeeRolesSection />
              <Footer />
            </>
          } />
          
          {/* Ruta para la página del productor con 6 tarjetas */}
          <Route path="/productor-page" element={
            <>
              <Header />
              <Productor />
              <Footer />
            </>
          } />
          
          {/* Ruta para la página del barista con 6 tarjetas */}
          <Route path="/barista-page" element={
            <>
              <Header />
              <Barista />
              <Footer />
            </>
          } />
          
          {/* Rutas para los roles individuales (páginas de detalle) */}
          <Route path="/barista" element={<RoleDetailPage role="barista" />} />
          <Route path="/catador" element={<RoleDetailPage role="catador" />} />
          <Route path="/tostador" element={<RoleDetailPage role="tostador" />} />
          <Route path="/productor" element={<RoleDetailPage role="productor" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;