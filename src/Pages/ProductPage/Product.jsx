import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../redux/action/ProductAction';
import '../../App.css';

const ProductPage = () => {
  const dispatch = useDispatch();  
  const products = useSelector((state) => state.productState?.products || []);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  return (
 <div className="product-page-wrapper">
      {/* Product Grid */}
      <div className="product-page-container">
        {products.length === 0 ? (
          <p className="no-products">No products found.</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-link">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">Rs {product.price}</p>
                </Link>
                <button className="button" onClick={() => alert(`Added ${product.name} to cart`)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
