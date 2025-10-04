import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PromoSection from "./components/PromoSection";
import FounderSection from "./components/FounderSection";
import FormularioPage from "./components/FormularioPage";
import Footer from "./components/Footer";
import BlogSection from "./components/BlogSection";
import CoffeeRolesSection from "./components/CoffeeRolesSection";
import RoleDetailPage from "./components/RoleDetailPage";
import Productor from "./components/Productor";
import Barista from "./components/Barista";
import "./styles/App.css";
import CloudCarousel from "./components/CloudCarousel";

function App() {
  const imagenes = [
    {
      src: "images/1.png",
      size: 500,
      alt: "Café en grano",
    },

    {
      src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=500&fit=crop",
      alt: "Taza de café",
    },
    {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=500&fit=crop",
      alt: "Café latte art",
    },
    {
      src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=500&fit=crop",
      alt: "Café espresso",
    },
    {
      src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=500&fit=crop",
      alt: "Plantación de café",
    },
    {
      src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=500&fit=crop",
      alt: "Café preparándose",
    },
  ];

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <PromoSection />
                <FounderSection />
                <CloudCarousel
                  images={imagenes}
                  options={{ reflHeight: 0, showNavButtons: false, autoRotate: "left", autoRotateDelay: 3000 }}
                />
                <Footer />
              </>
            }
          />
          <Route path="/formulario" element={<FormularioPage />} />
          <Route path="/blog" element={<BlogSection />} />

          {/* Ruta para las tarjetas de roles del café (4 tarjetas originales) */}
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

          {/* Ruta para la página del productor con 6 tarjetas */}
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

          {/* Ruta para la página del barista con 6 tarjetas */}
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

          {/* Rutas para los roles individuales (páginas de detalle) */}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
