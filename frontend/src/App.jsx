import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PromoSection from './components/PromoSection';
import FounderSection from './components/FounderSection';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header scrolled={isScrolled} />
      <Hero />
      <PromoSection />
      <FounderSection />
      <Footer />
    </div>
  );
}

export default App;