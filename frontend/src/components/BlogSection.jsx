import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogPostCard from './BlogPostCard';
import './BlogHome.css';
import './BlogPostCard.css';

const blogPosts = [
  {
    id: 1,
    image: 'images/blog1.png', 
    date: '1 DE NOVIEMBRE 2025',
    title: 'COMPETIR O COMPARTIR EL CAMINO AL ÉXITO',
    snippet: 'LOGRO TRAS TAZA DE CAFÉ PODRÁ PROVOCAR EN EL PROCESO DE SER BUENOS BARISTAS PARA LA MARCA.'
  },
  {
    id: 2,
    image: 'images/cafe.png',
    date: '1 DE NOVIEMBRE 2025',
    title: 'EL ARTE DE CALIBRAR UN ESPRESSO PERFECTO',
    snippet: 'CULTURA QUE GIRA EN TORNO AL GRANO... INVOLUCRA EN EL PROCESO DE SER BUENOS BARISTAS PARA LA MARCA.'
  }
];

const BlogSection = () => {
  const navigate = useNavigate();

  const handlePostClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="blog-home-container">
      
      <div className="stars-background">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <div className="blog-content-wrapper">
        <h1 className="blog-home-title">Coffe Blog</h1>

        <div className="blog-main-layout">
          
          <main className="blog-posts-list">
            {blogPosts.map(post => (
              <BlogPostCard
                key={post.id}
                image={post.image}
                date={post.date}
                title={post.title}
                snippet={post.snippet}
                onClick={() => handlePostClick(post.id)}
              />
            ))}
          </main>

          <aside className="about-me-sidebar">
            <img 
              src="images/perfil.png"
              alt="Acerca de mí" 
              className="about-me-image" 
            />
            <h2>Acerca de mí</h2>
            <p>
              Soy un barista con más de 13 años de experiencia en el café 
              de especialidad. Certificado por la SCA y juez en competencias 
              nacionales, he tenido la oportunidad de destacar en distintas 
              categorías, obteniendo el 5º lugar nacional de Aeropress 2024. 
              Soy fundador de Punto Coffee (O.O Coffee), un espacio dedicado a 
              compartir mi pasión por el café y crear comunidad.
            </p>

            <div className="subscription-box">
              <h3>Suscríbete al Blog</h3>
              <p>Recibe nuevos posts directamente en tu email</p>
              <form 
                action="https://youremail.list-manage.com/subscribe/post"
                method="POST"
                className="subscription-form"
              >
                <input type="hidden" name="u" value="tu_codigo" />
                <input type="hidden" name="id" value="tu_id" />
                <input 
                  type="email" 
                  name="EMAIL"
                  placeholder="tu@email.com"
                  required
                  className="email-input"
                />
                <button type="submit" className="subscribe-btn">
                  Suscribirse
                </button>
              </form>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default BlogSection;