import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoffeeRolesSection.css';

const CoffeeRolesSection = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const roles = [
        {
            title: 'Productor',
            image: '/images/carta1.gif',
            path: '/productor'
        },
        {
            title: 'Tostador',
            image: '/images/carta2.gif',
            path: '/shop/tea'
        },
        {
            title: 'Catador',
            image: '/images/carta3.gif',
            path: '/shop/chocolate'
        },
        {
            title: 'Barista',
            image: '/images/prueba.gif',
            path: '/barista-page'
        }
    ];

    const handleCardClick = (path) => {
        navigate(path);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <section className="product-category-section">
            {/* Menú hamburguesa */}
            <div className="hamburger-menu" onClick={toggleMenu}>
                <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
                <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
                <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
            </div>

            {/* Menú desplegable */}
            {menuOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/shop">Tienda</a></li>
                        <li><a href="/about">Nosotros</a></li>
                        <li><a href="/contact">Contacto</a></li>
                    </ul>
                </div>
            )}

            <div className="category-grid">
                {roles.map((role, index) => (
                    <div
                        key={index}
                        className="category-card"
                        style={{ backgroundImage: `url(${role.image})` }}
                        onClick={() => handleCardClick(role.path)}
                    >
                        <div className="card-content">
                            <h3 className="category-title">{role.title}</h3>
                            <button className="category-button">
                                go...
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoffeeRolesSection;