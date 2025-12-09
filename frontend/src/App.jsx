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

// Mantenemos Snowfall, quitamos VisitorCounter de aquí
import Snowfall from "./components/Snowfall"; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/home"
            element={
              <>
                <Snowfall /> {/* Solo la nieve */}
                <Header />
                <Hero /> {/* El contador ahora vive aquí adentro */}
                <PromoSection />
                <FounderSection />
                <Footer />
              </>
            }
          />
          
          <Route
            path="/"
            element={
              <>
                <Snowfall /> {/* Solo la nieve */}
                <Header />
                <Hero /> {/* El contador ahora vive aquí adentro */}
                <PromoSection />
                <FounderSection />
                <Footer />
              </>
            }
          />
          
          {/* Resto de rutas sin cambios... */}
          <Route path="/formulario" element={<FormularioPage />} />
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
          <Route path="/tostador" element={<RoleDetailPage role="tostador" />} />
          <Route path="/productor" element={<RoleDetailPage role="productor" />} />

          <Route path="/leo" element={<><Header /><Leo /><Footer /></>} />
          <Route path="/calendario" element={<><Header /><EventCalendar /><Footer /></>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;