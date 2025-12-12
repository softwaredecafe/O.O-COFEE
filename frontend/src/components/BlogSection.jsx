import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogPostCard from './BlogPostCard';
import './BlogHome.css';
import './BlogPostCard.css';

const blogPosts = [
  {
    id: 4,
    image: 'images/teco/6.png',
    date: '12 DE DICIEMBRE 2025',
    title: 'TAZAS ENDIABLADAS CON TECO',
    snippet: 'En esta cata no solo probamos café...'
  },
  {
    id: 3,
    image: 'images/blog3.png',
    date: '20 DE NOVIEMBRE 2025',
    title: 'CAFÉ Y CONEXIONES',
    snippet: 'Marketing, Barismo y la Magia del Café de Especialidad'
  },
  {
    id: 2,
    image: 'images/codigo3.png',
    date: '20 DE NOVIEMBRE 2025',
    title: 'CAFÉ Y CÓDIGO',
    snippet: 'UN PROGRAMADOR ENTRE FILTRADOS Y FRAMEWORKS'
  },
  {
    id: 1,
    image: 'images/blog1.png', 
    date: '1 DE NOVIEMBRE 2025',
    title: 'COMPETIR O COMPARTIR EL CAMINO AL ÉXITO',
    snippet: 'LOGRO TRAS TAZA DE CAFÉ PODRÁ PROVOCAR EN EL PROCESO DE SER BUENOS BARISTAS PARA LA MARCA.'
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
        <h1 className="blog-home-title">Coffee Blog</h1>

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
              
              <div id="mc_embed_signup">
                <form action="https://usac.us8.list-manage.com/subscribe/post?u=ed8528a6a040cc76e62855357&amp;id=c377c569de&amp;f_id=00f203e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
                  <div id="mc_embed_signup_scroll">
                    <div className="mc-field-group">
                      <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required placeholder="tu@email.com" />
                    </div>
                    <div id="mce-responses" className="clear foot">
                      <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                      <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
                    </div>
                    <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                      <input type="text" name="b_ed8528a6a040cc76e62855357_c377c569de" tabIndex="-1" value="" />
                    </div>
                    <div className="clear foot">
                      <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Suscribirse" />
                    </div>
                  </div>
                </form>
              </div>

            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default BlogSection;