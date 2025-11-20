import React from 'react';
import './BlogPostCard.css';

const BlogPostCard = ({ image, date, title, snippet, onClick }) => {
  return (
    <article className="blog-card" onClick={onClick}>
      <div className="blog-card-image-wrapper">
        <img src={image} alt={title} className="blog-card-image" />
        <span className="blog-card-date-overlay">{date}</span>
      </div>

      <div className="blog-card-content">
        <h3 className="blog-card-title">{title}</h3>
        <p className="blog-card-snippet">{snippet}</p>
      </div>
    </article>
  );
};

export default BlogPostCard;