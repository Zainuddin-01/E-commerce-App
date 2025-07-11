import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/action/ProductAction';
import '../App.css';

const ProductCart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const products = useSelector((state) => state.productState.products);
  const product = products.find((p) => String(p.id) === id);

  useEffect(() => {
    if (!product && products.length === 0) {
      setLoading(true);
      dispatch(fetchProducts()).finally(() => setLoading(false));
    }
  }, [dispatch, product, products.length]);

  if (loading) {
    return <p className="loading-text">Loading product...</p>;
  }

  if (!product) {
    return <p className="error-text">Product not found.</p>;
  }

  return (
    <div className="product-cart-wrapper">
      <div className="product-cart-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-cart-details">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <h2 className="product-price">Rs {product.price}</h2>
        <button
          className="button"
          onClick={() => alert(`Added ${product.name} to cart`)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
