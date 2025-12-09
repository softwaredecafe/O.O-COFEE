import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PromoSection from "./components/PromoSection";
import FounderSection from "./components/FounderSection";
import FormularioPage from "./components/FormularioPage";
import Footer from "./components/Footer";
import BlogSection from "./components/BlogSection";
import BlogPostDetail from "./components/BlogPostDetail";
import CoffeeRolesSection from "./components/CoffeeRolesSection";
import RoleDetailPage from "./components/RoleDetailPage";
import Productor from "./components/Productor";
import Barista from "./components/Barista";
import CloudCarousel from "./components/CloudCarousel";
import Leo from "./components/leo.jsx";
import "./styles/App.css";
import EventCalendar from './components/EventCalendar';

// --- IMPORTACIÓN NUEVA ---
import Snowfall from "./components/Snowfall"; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta home que agrupa todos los componentes principales.
             Se agrega <Snowfall /> aquí para que solo aparezca en el home.
          */}
          <Route
            path="/home"
            element={
              <>
                <Snowfall /> {/* <--- EFECTO AGREGADO AQUÍ */}
                <Header />
                <Hero />
                <PromoSection />
                <FounderSection />
                <Footer />
              </>
            }
          />
          
          {/* Ruta raíz también redirige a home con nieve */}
          <Route
            path="/"
            element={
              <>
                <Snowfall /> {/* <--- EFECTO AGREGADO AQUÍ */}
                <Header />
                <Hero />
                <PromoSection />
                <FounderSection />
                <Footer />
              </>
            }
          />
          
          {/* Las siguientes rutas NO tienen Snowfall */}
          
          <Route path="/formulario" element={<FormularioPage />} />
          
          {/* --- SECCIÓN BLOG --- */}
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} /> 

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