import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../App.css'

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useSelector(state => state.productState);

  // Filter visible + matching products
  const filteredProducts = products.filter(product =>
    !product.hidden &&
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
<div className="search-container">
      <h2 className="search-title">Search Products</h2>
      <input
        type="text"
        placeholder="Search by name or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-results">No products match your search.</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Rs {product.price}</p>
              </Link>
              <button className="button" onClick={() => alert(`Added ${product.name} to cart`)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default SearchProduct;
