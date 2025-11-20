import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PromoSection from "./components/PromoSection";
import FounderSection from "./components/FounderSection";
import FormularioPage from "./components/FormularioPage";
import Footer from "./components/Footer";
import BlogSection from "./components/BlogSection";
import BlogPostDetail from "./components/BlogPostDetail"; // <--- IMPORTACIÓN NUEVA
import CoffeeRolesSection from "./components/CoffeeRolesSection";
import RoleDetailPage from "./components/RoleDetailPage";
import Productor from "./components/Productor";
import Barista from "./components/Barista";
import CloudCarousel from "./components/CloudCarousel";
import Leo from "./components/leo.jsx";
import "./styles/App.css";
import EventCalendar from './components/EventCalendar';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta home que agrupa todos los componentes principales */}
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Hero />
                <PromoSection />
                <FounderSection />
                <Footer />
              </>
            }
          />
          
          {/* Ruta raíz también redirige a home */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <PromoSection />
                <FounderSection />
                <Footer />
              </>
            }
          />
          
          <Route path="/formulario" element={<FormularioPage />} />
          
          {/* --- SECCIÓN BLOG --- */}
          <Route path="/blog" element={<BlogSection />} />
          {/* Ruta dinámica para el detalle del post */}
          <Route path="/blog/:id" element={<BlogPostDetail />} /> 

          {/* Ruta para el carrusel de imágenes */}
          <Route
            path="/galeria"
            element={
              <div className="carrusel-page-container">
                <Header />
                <CloudCarousel />
                <Footer />
              </div>
            }
          />

          {/* Ruta para las tarjetas de roles del café */}
          <Route
            path="/roles"
            element={
              <>
                <Header />
                <CoffeeRolesSection />
                <Footer />
              </>
            }
          />

          {/* Ruta para la página del productor */}
          <Route
            path="/productor-page"
            element={
              <>
                <Header />
                <Productor />
                <Footer />
              </>
            }
          />

          {/* Ruta para la página del barista */}
          <Route
            path="/barista-page"
            element={
              <>
                <Header />
                <Barista />
                <Footer />
              </>
            }
          />

          {/* Rutas para los roles individuales */}
          <Route path="/barista" element={<RoleDetailPage role="barista" />} />
          <Route path="/catador" element={<RoleDetailPage role="catador" />} />
          <Route
            path="/tostador"
            element={<RoleDetailPage role="tostador" />}
          />
          <Route
            path="/productor"
            element={<RoleDetailPage role="productor" />}
          />

          {/* --- OTRAS RUTAS --- */}
          <Route 
          path="/leo" element={
              <>
                <Header />
                <Leo />
                <Footer />
              </>
            } />

          <Route path="/calendario" element={
              <>
                <Header />
                <EventCalendar />
                <Footer />
              </>
            } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;