import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import star from '../../img/icons/star.svg';

export default function ProductCard({
  product,
  hideCountdown = true,
  showCartAlways = true,
  showAvailability = true
}) {
  if (!product) return null;

  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  const total = (product?.available || 20) + (product?.sold || 10);
  const soldPercentage = total > 0 ? ((product.sold || 10) / total) * 100 : 35;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const rootClasses = ['card-grid-style-3', 'hover-show'];
  if (!showCartAlways) {
    rootClasses.push('hover-hide-show-cart');
  }

  const labels = [];
  if (product.discount) labels.push({ text: `-${product.discount}%`, className: 'label bg-brand-2' });
  if (product.hot) labels.push({ text: product.hot, className: 'label2 bg-danger ms-1' });
  if (product.new) labels.push({ text: product.new, className: 'label3 bg-success' });

  return (
    <div className={rootClasses.join(' ')}>
      <div className="card-grid-inner">
        <div className="tools">
          <a className="btn btn-trend btn-tooltip mb-10" href="#" aria-label="Trend" onClick={(e) => e.preventDefault()}></a>
          <button
            type="button"
            className={`btn btn-wishlist btn-tooltip mb-10 ${isFavorite ? 'active' : ''}`}
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label="Add To Wishlist"
          ></button>
          <button
            type="button"
            className="btn btn-compare btn-tooltip mb-10"
            aria-label="Compare"
            onClick={(e) => e.preventDefault()}
          ></button>
          <button
            type="button"
            className="btn btn-quickview btn-tooltip"
            aria-label="Quick view"
            onClick={(e) => e.preventDefault()}
          ></button>
        </div>

        <div className="image-box">
          {labels.map((item, index) => (
            <span
              key={index}
              className={item.className}
              style={{ left: labels.length === 1 ? 0 : `${index * 50}px` }}
            >
              {item.text}
            </span>
          ))}
          <a href="#" onClick={(e) => e.preventDefault()}>
            <img
              src={product.image || 'https://wp.alithemes.com/html/ecom/demo/assets/imgs/page/homepage1/sp1.png'}
              alt={product.title || product.name}
              className="img-fluid"
            />
          </a>
        </div>

        <div className="info-right">
          <span className="font-xs color-gray-500">
            {product.brand || product.company || 'Electronics'}
          </span>
          <a
            className="color-brand-3 font-sm-bold"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            {product.title || product.name || 'Product Title'}
          </a>
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <img key={i} src={star} alt="star" className="img-fluid" />
            ))}
            <span className="font-xs color-gray-500">
              ({product.reviews || 45})
            </span>
          </div>
          <div className="price-info pt-3">
            <strong className="font-lg-bold color-brand-3 price-main price-label m-0">
              ${product.price}
            </strong>
            {product.oldPrice && (
              <span className="color-gray-500 price-line price-label m-0">
                ${product.oldPrice}
              </span>
            )}
          </div>

          {showAvailability && (
            <div className="box-progress box-progress-small mt-15">
              <div className="progress-bar">
                <div className="progress-bar-inner" style={{ width: `${soldPercentage}%` }}></div>
              </div>
              <div className="row">
                <div className="col-lg-7 col-md-6 col-sm-6 col-6">
                  <span className="font-xs color-gray-500 p-0">Available: </span>
                  <span className="font-xs-bold color-gray-900">
                    {product.available || 25}
                  </span>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-6 text-end">
                  <span className="font-xs color-gray-500 p-0">Sold: </span>
                  <span className="font-xs-bold color-gray-900">
                    {product.sold || 12}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-20 box-add-cart d-flex justify-content-center align-items-center w-100">
            <button
              type="button"
              className={`btn btn-cart w-100 text-center ${added ? 'bg-success text-white border-success' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? 'Added!' : 'Add To Cart'}
            </button>
          </div>

          <ul className="list-features color-brand-3">
            {product.features && product.features.length > 0 ? (
              product.features.slice(0, 3).map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))
            ) : (
              <li>2-day Delivery. Free shipping</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}