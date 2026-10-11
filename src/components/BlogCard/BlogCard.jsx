

import React from 'react';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default function BlogCard({ post }) {
  const href = post.href || '#';
  return (
    <div className="card-grid-style-1">
      <div className="image-box">
        <a href={href}></a>
        <img src={post.image} alt={post.title} className="img-fluid" />
      </div>
      <a className="tag-dot font-xs" href="#">
        {post.category}
      </a>
      <a className="color-gray-1100" href={href}>
        <h4>{post.title}</h4>
      </a>
      <div className="mt-20">
        <span className="color-gray-500 font-xs mr-30">{formatDate(post.date)}</span>
        <span className="color-gray-500 font-xs">
          {post.minutes}
          <span>Mins read</span>
        </span>
      </div>
    </div>
  );
}


