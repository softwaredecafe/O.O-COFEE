import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BlogPostDetail.css';

const postsDatabase = {
  "1": {
    title: "COMPETIR O COMPARTIR EL CAMINO AL ÉXITO, LO QUE UNA TAZA DE CAFÉ PUEDE PROVOCAR EN EL PROCESO DE LOS SUEÑOS DE LOS BARISTAS TRAS LA BARRA...",
    headerImage: "/images/calendar.png",
    inlineImage: "/images/competencia.png",
    authorName: "Marlon Rendon",
    authorAvatar: "/images/marlon.png",
    content: [
      "La historia nos ha mostrado a lo largo del tiempo cosas totalmente diferentes, claro competir te ayuda a crecer no lo niego pero lo que más nos ha hecho avanzar es colaborar. Un conocimiento científico no nace de un genio aislado, sino de miles de mentes compartiendo así mismo como la música que escuchamos día a día, la ciudad o el pueblo en el que vivimos y hasta esa tan deliciosa taza de café que tomamos, todo existe gracias a redes de colaboración. competir te puede llevar a la meta, eso es cierto, pero colaborar te puede llevar aún más lejos.",
      "Porque cuando compartimos conocimientos todos crecemos de alguna manera, así también cuando compartimos recursos multiplicamos posibilidades para alcanzar un fin pues sin duda cuando compartimos sueños, transformamos realidades y con una visión de todo el panorama podemos ver que el verdadero futuro no se construye compitiendo unos contra otros, se construye creando unos con otros."
    ]
  },
  "2": {
    title: "CAFÉ Y CÓDIGO: UN PROGRAMADOR ENTRE FILTRADOS Y FRAMEWORKS",
    headerImage: "/images/codigo4.png",
    inlineImage: "/images/progra.png",
    authorName: "Alexander Guzman",
    authorAvatar: "/images/alex2.png",
    content: [
      "Ser programador y amante del café de especialidad es una combinación que se da más seguido de lo que parece. Tal vez por eso uno de los lenguajes más conocidos terminó llamándose Java, inspirado en el café de la isla del mismo nombre. Al final, gran parte de nuestro código ha estado acompañado por una buena taza.",
      "Lo curioso es que programar y preparar un filtrado tienen un aire muy parecido: ambos dependen de pequeñas variables que cambian por completo el resultado. Temperatura, molido, método y tiempo se sienten igual de delicados que elegir un patrón de diseño, ajustar parámetros o depurar funciones. Es esa misma obsesión por el detalle la que hace que muchos devs hablen de recetas de café como si fueran scripts.",
      "En cualquier meetup o coworking es normal ver a programadores describir un V60 con la misma energía con la que hablan de un framework nuevo. Algunos incluso cargan su propio molino portátil como si fuera una extensión de su laptop. Es una mezcla curiosa: gente que hace pull requests y pour-overs con la misma pasión.",
      "Y cuando un bug se niega a desaparecer, a veces la mejor solución no está en seguir viendo el editor, sino en levantarse, preparar un filtrado y dejar que el aroma haga su magia. Ese pequeño ritual funciona como un reinicio mental que, sin explicación lógica, aclara ideas.",
      "Al final, el mundo del café de especialidad y el de la programación tienen algo en común: siempre hay algo nuevo por descubrir. Nuevos métodos, nuevos orígenes, nuevos frameworks, nuevas versiones… dos universos que no dejan de evolucionar y que, por alguna razón, combinan perfectamente."
    ]
  },
  "3": {
    title: "CAFÉ Y CONEXIONES: Marketing, Barismo y la Magia del Café de Especialidad",
    headerImage: "/images/3.png",
    inlineImage: "/images/sol.png",
    authorName: "Alejandra Cordero",
    authorAvatar: "/images/ale2.png",
    content: [
      "Trabajar en comunicación y marketing me ha enseñado que todo, absolutamente todo, tiene una historia que contar. Y quizá por eso el café de especialidad me atrapó desde el principio: cada grano, cada origen y cada método tiene un relato detrás. Pero la magia se vuelve aún más especial porque la comparto con mi pareja, que es barista y vive el café de una forma tan apasionada que es imposible no contagiarse.",
      "Trabajar en comunicación y marketing me ha enseñado que todo, absolutamente todo, tiene una historia que contar. Y quizá por eso el café de especialidad me atrapó desde el principio: cada grano, cada origen y cada método tiene un relato detrás. Pero la magia se vuelve aún más especial porque la comparto con mi pareja, que es barista y vive el café de una forma tan apasionada que es imposible no contagiarse.",
      "En cualquier meetup o coworking es normal ver a programadores describir un V60 con la misma energía con la que hablan de un framework nuevo. Algunos incluso cargan su propio molino portátil como si fuera una extensión de su laptop. Es una mezcla curiosa: gente que hace pull requests y pour-overs con la misma pasión.",
      "Lo más bonito es cómo el café se convierte en nuestro lenguaje cotidiano. Podemos pasar horas hablando de perfiles, aromas, historias de fincas o nuevas tendencias, como si estuviéramos planeando una campaña juntos. Y siempre hay un filtrado de por medio: ese momento en el que él prepara un V60 y yo observo cómo el agua cae en espiral, como si la paciencia también fuera parte de la receta.",
      "A veces creo que el café de especialidad nos ha enseñado a mirar el mundo con más detalle. Él lo hace desde la barra; yo, desde las palabras. Y entre tragos y conversaciones, descubrimos que el café no solo es una bebida, sino una forma de entender la creatividad, la pasión por lo que hacemos y la vida que construimos juntos.",
      "Al final, lo que compartimos no es solo una taza, sino la manera en que el café se convierte en inspiración, en pausa, en ritual y en puente. Una mezcla perfecta entre historias, aromas y momentos que nos recuerdan que, igual que en el marketing y en el barismo, siempre hay algo nuevo que descubrir, probar y contar."
    ]
  },
  "4": {
    title: "TAZAS ENDIABLADAS CON TECO",
    headerImage: "/images/teco/2.png",
    // inlineImage se eliminó para este post específico y se pasó al contenido
    authorName: "Marlon Rendon",
    authorAvatar: "/images/marlon.png",
    content: [
      {
        type: "text",
        value: "Hay días que se sienten distintos desde el primer momento, como si trajeran una chispa especial. Así fue esta experiencia. En vísperas de la tradicional Quema del Diablo, cuando el aire se llena de simbolismo y la ciudad empieza a encenderse de energía, nos reunimos para vivir una jornada “endiablada” dedicada al café, a los sentidos y a la comunidad que lo rodea."
      },
      {
        type: "text",
        value: "La tarde tomó rumbo con la presencia de Teco Echeverría, un nombre que resuena fuerte en el mundo del café guatemalteco. Campeón nacional de barismo en 2014 y nuevamente en 2024, Teco no solo domina técnicas, protocolos y competencias: domina el arte de conectar. Habla del café con una pasión tan genuina que uno no solo escucha… se contagia. Cada explicación se convertía en una invitación a viajar por aromas, texturas y recuerdos que solo el buen café es capaz de despertar."
      },
      {
        type: "image",
        src: "/images/teco/4.png", // Imagen original
        alt: "Teco Echeverría"
      },
      {
        type: "text",
        value: "Durante la cata, exploramos diversas variedades y perfiles que se movían entre lo vibrante, lo suave, lo dulce y lo inesperado. Cada taza era una historia distinta, una personalidad nueva por descubrir. Y entre todas, hubo un cafecito especial uno que está por salir al mercado que capturó miradas, sonrisas y hasta silencios. Esos silencios buenos, los que surgen cuando uno prueba algo que de verdad lo sorprende."
      },
      {
        type: "text",
        value: "El entorno acompañó la experiencia a la perfección. Siena Luz, en Antigua Guatemala, nos regaló un ambiente íntimo, cálido y casi mágico; un lugar donde el tiempo parecía avanzar más despacio para permitirnos saborear cada momento. Entre luces suaves, conversaciones espontáneas y el aroma constante del café, el espacio se convirtió en un refugio para quienes aman aprender, compartir y descubrir."
      },
      {
        type: "image",
        src: "/images/teco/3.png", 
        alt: "Ambiente en Siena Luz"
      },
      {
        type: "text",
        value: "Detrás de todo estuvo la visión de 0.0 Coffee y su creador, Marlon Rendón, quienes hicieron posible este encuentro. Su intención de unir a la comunidad cafetera, impulsar espacios de aprendizaje y celebrar el trabajo de quienes dedican su vida a la taza perfecta, se sintió en cada detalle de la organización."
      },
      {
        type: "text",
        value: "Al final del evento, quedó esa sensación hermosa de plenitud: la de haber vivido algo especial. Las “Catas Endiabladas” no solo encendieron el paladar; encendieron emociones, inspiraciones y ese fuego interno que compartimos quienes amamos el café y todo lo que representa."
      },
      {
        type: "text",
        value: "Una mañana para recordar… y para seguir saboreando."
      }
    ]
  }
};

const BlogPostDetail = () => {
  const { id } = useParams();
  const post = postsDatabase[id];

  useEffect(() => {
    if (window.DISQUS) {
        window.DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = `blog-post-${id}`;
                this.page.url = window.location.href;
                this.page.title = post ? post.title : document.title;
            }
        });
    } else {
        window.disqus_config = function () {
          this.page.url = window.location.href;
          this.page.identifier = `blog-post-${id}`;
          this.page.title = post ? post.title : document.title;
        };
        
        const script = document.createElement('script');
        script.src = 'https://o-o-coffee.disqus.com/embed.js';
        script.setAttribute('data-timestamp', +new Date());
        document.body.appendChild(script);
    }
  }, [id, post]);

  if (!post) {
    return <div style={{color: 'white', textAlign: 'center', marginTop: '100px'}}>Artículo no encontrado</div>;
  }

  const isNewContentFormat = post.content.length > 0 && typeof post.content[0] === 'object';

  return (
    <div className="post-page-container">
      
      <div className="post-header-banner">
        <img 
          src={post.headerImage} 
          alt="Coffee Header" 
          className="header-img"
        />
      </div>

      <article className="post-paper-content">
        
        <h1 className="post-main-title">
          {post.title}
        </h1>

        <div className="post-body-text">
          
          {isNewContentFormat ? (
            // LÓGICA PARA EL FORMATO NUEVO (Post 4)
            post.content.map((block, index) => {
              if (block.type === 'text') {
                return <p key={index}>{block.value}</p>;
              }
              if (block.type === 'image') {
                return (
                  <div key={index} className="post-inline-image-wrapper">
                    <img 
                      src={block.src} 
                      alt={block.alt || "Imagen del blog"} 
                      className="post-inline-image"
                    />
                  </div>
                );
              }
              return null;
            })
          ) : (
            // LÓGICA PARA EL FORMATO ANTIGUO (Posts 1, 2, 3)
            <>
              <p>{post.content[0]}</p>

              {post.inlineImage && (
                <div className="post-inline-image-wrapper">
                  <img 
                    src={post.inlineImage} 
                    alt="Imagen del post" 
                    className="post-inline-image"
                  />
                </div>
              )}

              {post.content.slice(1).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </>
          )}

        </div>

        <footer className="post-footer">
          <span className="author-name">BY {post.authorName}</span>
          <img 
            src={post.authorAvatar} 
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