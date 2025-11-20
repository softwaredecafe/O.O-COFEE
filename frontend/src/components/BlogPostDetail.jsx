import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BlogPostDetail.css';

const BlogPostDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    window.disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = `blog-post-${id}`;
      this.page.title = document.title;
    };
    
    const script = document.createElement('script');
    script.src = 'https://o-o-coffee.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());
    script.setAttribute('data-timestamp', +new Date());
    document.body.appendChild(script);
  }, [id]);

  return (
    <div className="post-page-container">
      
      <div className="post-header-banner">
        <img 
          src="/images/calendar.png" 
          alt="Coffee Header" 
          className="header-img"
        />
      </div>

      <article className="post-paper-content">
        
        <h1 className="post-main-title">
          COMPETIR O COMPARTIR EL CAMINO AL ÉXITO, 
          LO QUE UNA TAZA DE CAFÉ PUEDE PROVOCAR EN 
          EL PROCESO DE LOS SUEÑOS DE LOS BARISTAS 
          TRAS LA BARRA...
        </h1>

        <div className="post-body-text">
          <p>
            La historia nos ha mostrado a lo largo del tiempo cosas totalmente 
            diferentes, claro competir te ayuda a crecer no lo niego pero lo que más 
            nos ha hecho avanzar es colaborar. Un conocimiento científico no nace de 
            un genio aislado, sino de miles de mentes compartiendo así mismo como 
            la música que escuchamos día a día, la ciudad o el pueblo en el que 
            vivimos y hasta esa tan deliciosa taza de café que tomamos, todo existe 
            gracias a redes de colaboración. competir te puede llevar a la meta, eso es 
            cierto, pero colaborar te puede llevar aún más lejos.
          </p>

          <div className="post-inline-image-wrapper">
            <img 
              src="/images/calendario.png" 
              alt="Baristas colaborando" 
              className="post-inline-image"
            />
          </div>

          <p>
            Porque cuando compartimos conocimientos todos crecemos de alguna manera, 
            así también cuando compartimos recursos multiplicamos posibilidades para 
            alcanzar un fin pues sin duda cuando compartimos sueños, transformamos realidades 
            y con una visión de todo el panorama podemos ver que el verdadero futuro no se 
            construye compitiendo unos contra otros, se construye creando unos con otros.
          </p>
        </div>

        <footer className="post-footer">
          <span className="author-name">BY Marlon Rendon</span>
          <img 
            src="/images/ma.png" 
            alt="Avatar" 
            className="author-avatar"
          />
        </footer>

        <div className="comments-section">
          <div id="disqus_thread"></div>
        </div>

      </article>
    </div>
  );
};

export default BlogPostDetail;