import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './BlogSection.css';

const BlogSection = () => {
  const [email, setEmail] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "THE PHYSICS OF ESPRESSO",
      category: "SCIENCE/INVESTIGATIONS",
      date: "August 14, 2023",
      excerpt: "Hello! I am so thrilled to announce that my second book The Physics of Espresso is finally out! This new book not only brings the latest research in espresso preparation but also contains hundreds of graphs and drawings, professional photos, and insights from top baristas worldwide...",
      image: "/images/blog1.jpg"
    },
    {
      id: 2,
      title: "RECENT INSIGHTS INTO ESPRESSO DYNAMICS",
      category: "CONFERENCE UPDATES",
      date: "March 3, 2024",
      excerpt: "I will be presenting a conference on the topic of espresso dynamics during SCA 2024 in Chicago! This presentation will cover the latest findings in extraction theory and how they apply to everyday brewing practices.",
      image: "/images/blog2.jpg"
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Email suscrito:', email);
    setEmail('');
    // Lógica de suscripción posterior
  };

  return (
    <section className="blog-section">
      <div className="blog-container">
        {/* Posts principales */}
        <div className="blog-posts">
          <h2 className="blog-main-title">Coffee Blog</h2>
          
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              className="blog-post"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="post-header">
                <span className="post-category">{post.category}</span>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-date">{post.date}</p>
              </div>
              
              <div className="post-content">
                <p className="post-excerpt">{post.excerpt}</p>
                <button className="read-more-btn">Read More</button>
              </div>
              
              <div className="post-divider"></div>
            </motion.article>
          ))}
        </div>

        {/* Sidebar */}
        <motion.div 
          className="blog-sidebar"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* About Me */}
          <div className="sidebar-widget">
            <h3>About Me</h3>
            <div className="about-content">
              <img 
                src="/images/perfil.png" 
                alt="Profile" 
                className="profile-image"
              />
              <p>
                13 años en el café de especialidad con logros en multiples 
                categorias, certificado SCA y juez en competencias nacionales,
                 5to lugar nacional de Aeropress 2024. Fundador de punto coffee 
                 (O.O COFFEE)
              </p>
            </div>
          </div>

          {/* Subscribe Form */}
          <div className="sidebar-widget">
            <h3>Subscribe to My Blog</h3>
            <p className="subscribe-text">Get new content delivered directly to your inbox.</p>
            
            <form onSubmit={handleSubscribe} className="subscribe-form">
              <input
                type="email"
                placeholder="Type your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
              />
              <button type="submit" className="subscribe">
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;