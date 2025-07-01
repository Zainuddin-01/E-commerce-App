import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Home = () => {
  const { products } = useSelector(state => state.productState);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const filtered = products.filter(product =>
      !product.hidden &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSearchResults(filtered);
  };

  const displayedProducts = searchTerm ? searchResults : products.filter(p => !p.hidden).slice(0, 4);

  return (
    <div className="product-page-wrapper">
      <h1 className="home-heading">
        Shop smart with mobozo mobile store — fast, easy, <br />
        and always at your fingertips.
      </h1>
      {/* Search Bar Section */}
      <main className="search-main">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
      </main>

      {/* Product Grid */}
      <div className="product-page-container">
        {displayedProducts.length === 0 ? (
          <p className="no-products">No products found.</p>
        ) : (
          <div className="product-grid">
            {displayedProducts.map((product) => (
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
        {!searchTerm && displayedProducts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/product" className="view-all-button">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
