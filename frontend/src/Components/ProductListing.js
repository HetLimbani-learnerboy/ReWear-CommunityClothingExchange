import React, { useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaRegHeart, FaShoppingCart, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/ProductListing.css';

// This would normally come from your database/API
const products = [
  {
    id: 1,
    name: 'Women\'s Floral Summer Dress',
    description: 'Lightweight and breathable summer dress with floral pattern.',
    price: 49.99,
    originalPrice: 69.99,
    discount: 30,
    imageUrl: 'https://via.placeholder.com/300x400?text=Floral+Dress',
    rating: 4.5,
    reviewCount: 128,
    colors: ['Red', 'Blue', 'Yellow'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Women',
    inStock: true,
    isNew: true,
  },
  // Add all your other products here (same as in Mainpage.js)
  // ...
];

const ProductListing = () => {
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    size: '',
    color: '',
    sortBy: 'popular',
  });
  const navigate = useNavigate();

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }

    return stars;
  };

  const filteredProducts = products.filter(product => {
    return (
      (filters.category === '' || product.category === filters.category) &&
      (filters.priceRange === '' || 
        (filters.priceRange === 'under50' && product.price < 50) ||
        (filters.priceRange === '50to100' && product.price >= 50 && product.price <= 100) ||
        (filters.priceRange === 'over100' && product.price > 100))
      // Add other filter conditions as needed
    );
  }).sort((a, b) => {
    switch(filters.sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'newest': return a.isNew ? -1 : 1;
      case 'rating': return b.rating - a.rating;
      default: return 0; // 'popular' or default
    }
  });

  return (
    <div className="product-listing-page">
      <div className="listing-header">
        <h1>Shop All Products</h1>
        <p>{filteredProducts.length} products found</p>
      </div>

      <div className="listing-container">
        <button 
          className="mobile-filter-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filters
        </button>

        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filter-section">
            <h3>Categories</h3>
            <select 
              name="category" 
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
              <option value="Accessories">Accessories</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <select 
              name="priceRange" 
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 - $100</option>
              <option value="over100">Over $100</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>Sort By</h3>
            <select 
              name="sortBy" 
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <button 
            className="clear-filters-btn"
            onClick={() => setFilters({
              category: '',
              priceRange: '',
              size: '',
              color: '',
              sortBy: 'popular',
            })}
          >
            Clear All Filters
          </button>
        </aside>

        <main className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                  {product.isNew && <span className="product-badge new">New</span>}
                  {product.discount > 0 && (
                    <span className="product-badge discount">-{product.discount}%</span>
                  )}
                  {!product.inStock && (
                    <span className="product-badge out-of-stock">Out of Stock</span>
                  )}
                  <button
                    className="wishlist-btn"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    {wishlist.includes(product.id) ? (
                      <FaHeart className="wishlist-icon filled" />
                    ) : (
                      <FaRegHeart className="wishlist-icon" />
                    )}
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-rating">
                    <div className="stars">
                      {renderRatingStars(product.rating)}
                      <span className="rating-value">{product.rating}</span>
                    </div>
                    <span className="review-count">({product.reviewCount})</span>
                  </div>
                  <div className="product-pricing">
                    {product.discount > 0 && (
                      <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                    )}
                    <span className="current-price">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <h3>No products match your filters</h3>
              <button 
                className="clear-filters-btn"
                onClick={() => setFilters({
                  category: '',
                  priceRange: '',
                  size: '',
                  color: '',
                  sortBy: 'popular',
                })}
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListing;