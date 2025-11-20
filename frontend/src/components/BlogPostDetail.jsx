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