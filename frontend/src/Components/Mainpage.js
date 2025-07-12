import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import {
  FaSearch,
  FaUser,
  FaShoppingBag,
  FaBars,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
} from 'react-icons/fa';
import '../css/Mainpage.css';

const Mainpage = () => {
    const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const mobileNavRef = useRef(null);
  const mobileMenuBtnRef = useRef(null);

  // Database simulation
  const banners = [
    {
      id: 1,
      imageUrl: 'https://www.shutterstock.com/image-photo/clothes-on-clothing-hanger-260nw-2338282257.jpg',
      alt: 'Banner 1',
      link: '#'
    },
    {
      id: 2,
      imageUrl: 'https://www.shutterstock.com/image-photo/beautiful-colorful-clothes-flying-isolatedwomens-260nw-2257875171.jpg',
      alt: 'Banner 2',
      link: '#'
    },
    {
      id: 3,
      imageUrl: 'https://media.istockphoto.com/id/1460330505/photo/baby-shop-interior.jpg?s=612x612&w=0&k=20&c=uoBW74-5ara4hVmJwNxb2DrQijZmEgSguopT4pdCKhg=',
      alt: 'Banner 3',
      link: '#'
    }
  ];

  const categories = [
    {
      id: 1,
      name: 'Women',
      imageUrl: 'https://via.placeholder.com/300x300?text=Women',
      link: '#',
    },
    {
      id: 2,
      name: 'Men',
      imageUrl: 'https://via.placeholder.com/300x300?text=Men',
      link: '#',
    },
    {
      id: 3,
      name: 'Kids',
      imageUrl: 'https://via.placeholder.com/300x300?text=Kids',
      link: '#',
    },
    {
      id: 4,
      name: 'Accessories',
      imageUrl: 'https://via.placeholder.com/300x300?text=Accessories',
      link: '#',
    },
    {
      id: 5,
      name: 'Shoes',
      imageUrl: 'https://via.placeholder.com/300x300?text=Shoes',
      link: '#',
    },
    {
      id: 6,
      name: 'Sale',
      imageUrl: 'https://via.placeholder.com/300x300?text=Sale',
      link: '#',
    },
  ];

  const products = [
    {
      id: 1,
      name: 'Women\'s Floral Summer Dress',
      description: 'Lightweight and breathable summer dress with floral pattern. Perfect for warm weather occasions.',
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
    {
      id: 2,
      name: 'Men\'s Slim Fit Jeans',
      description: 'Classic slim fit jeans made with premium denim. Comfortable and durable for everyday wear.',
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      imageUrl: 'https://via.placeholder.com/300x400?text=Slim+Jeans',
      rating: 4.2,
      reviewCount: 86,
      colors: ['Blue', 'Black', 'Gray'],
      sizes: ['28', '30', '32', '34', '36'],
      category: 'Men',
      inStock: true,
      isNew: false,
    },
    {
      id: 3,
      name: 'Unisex Running Shoes',
      description: 'High-performance running shoes with cushioned soles for maximum comfort during workouts.',
      price: 89.99,
      originalPrice: 109.99,
      discount: 18,
      imageUrl: 'https://via.placeholder.com/300x400?text=Running+Shoes',
      rating: 4.7,
      reviewCount: 215,
      colors: ['White', 'Black', 'Blue'],
      sizes: ['6', '7', '8', '9', '10', '11'],
      category: 'Shoes',
      inStock: true,
      isNew: true,
    },
    {
      id: 4,
      name: 'Leather Crossbody Bag',
      description: 'Stylish and practical leather crossbody bag with multiple compartments for organization.',
      price: 65.99,
      originalPrice: 85.99,
      discount: 23,
      imageUrl: 'https://via.placeholder.com/300x400?text=Crossbody+Bag',
      rating: 4.3,
      reviewCount: 54,
      colors: ['Brown', 'Black'],
      sizes: ['One Size'],
      category: 'Accessories',
      inStock: true,
      isNew: false,
    },
    {
      id: 5,
      name: 'Kids\' Hooded Jacket',
      description: 'Warm and cozy hooded jacket for kids with water-resistant outer layer.',
      price: 39.99,
      originalPrice: 49.99,
      discount: 20,
      imageUrl: 'https://via.placeholder.com/300x400?text=Kids+Jacket',
      rating: 4.1,
      reviewCount: 37,
      colors: ['Red', 'Blue', 'Pink'],
      sizes: ['4-5', '6-7', '8-9'],
      category: 'Kids',
      inStock: true,
      isNew: true,
    },
    {
      id: 6,
      name: 'Women\'s Cashmere Sweater',
      description: 'Luxurious cashmere sweater for women with a relaxed fit. Perfect for cooler days.',
      price: 129.99,
      originalPrice: 159.99,
      discount: 19,
      imageUrl: 'https://via.placeholder.com/300x400?text=Cashmere+Sweater',
      rating: 4.8,
      reviewCount: 92,
      colors: ['Beige', 'Gray', 'Navy'],
      sizes: ['S', 'M', 'L'],
      category: 'Women',
      inStock: false,
      isNew: false,
    },
  ];

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target) &&
        mobileMenuBtnRef.current &&
        !mobileMenuBtnRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileDropdown = (item) => {
    setActiveDropdown(activeDropdown === item ? null : item);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const addToCart = (productId) => {
    setCart([...cart, productId]);
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

  const navLinks = [
    { name: 'New Arrivals', href: '#', dropdown: false },
    {
      name: 'Women',
      href: '#',
      dropdown: true,
      items: ['Dresses', 'Tops', 'Jeans', 'Activewear', 'Accessories'],
    },
    {
      name: 'Men',
      href: '#',
      dropdown: true,
      items: ['Shirts', 'Pants', 'Jackets', 'Activewear', 'Accessories'],
    },
    { name: 'Sale', href: '#', dropdown: false },
    { name: 'About', href: '#', dropdown: false },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            RE<span>WEAR</span>
          </a>

          <ul className="nav-links">
            {navLinks.map((link, index) => (
              <li key={index} className={link.dropdown ? 'dropdown' : ''}>
                <a href={link.href}>{link.name}</a>
                {link.dropdown && (
                  <div className="dropdown-content">
                    {link.items.map((item, i) => (
                      <a key={i} href="#">
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-icons">
            <a href="#">
              <FaSearch />
            </a>
            <div className="auth-buttons">
               <button  onClick={()=>navigate('/signinpage')} className="login-button">Login</button>
              <button onClick={()=>navigate('/signuppage')} className="signup-button">Sign Up</button>
            </div>
            
              <button  onClick={()=>navigate('/userdash')} className="login-button"> <FaUser /></button>
            <a href="#" className="cart-icon">
              <FaShoppingBag />
              <span className="cart-count">{cart.length}</span>
            </a>
            <div
              className="mobile-menu"
              id="mobileMenuBtn"
              onClick={toggleMobileMenu}
              ref={mobileMenuBtnRef}
            >
              <FaBars />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}
        id="mobileNav"
        ref={mobileNavRef}
      >
        <ul className="mobile-nav-links">
          {navLinks.map((link, index) => (
            <li key={index} className={link.dropdown ? 'mobile-dropdown' : ''}>
              {link.dropdown ? (
                <>
                  <div
                    className="mobile-dropdown-toggle"
                    onClick={() => toggleMobileDropdown(index)}
                  >
                    <a href={link.href}>{link.name}</a>
                    <FaChevronDown
                      className={activeDropdown === index ? 'rotate' : ''}
                    />
                  </div>
                  <div
                    className={`mobile-dropdown-content ${
                      activeDropdown === index ? 'active' : ''
                    }`}
                  >
                    {link.items.map((item, i) => (
                      <a key={i} href="#">
                        {item}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a href={link.href}>{link.name}</a>
              )}
            </li>
          ))}
        </ul>

        <div className="mobile-auth-buttons">
          <a href="#" className="login-btn">
            Login
          </a>
          <a href="#" className="signup-btn">
            Sign Up
          </a>
        </div>
      </div>

      {/* Promo Banner Slider */}
      <div className="promo-banner-container">
        <div className="banner-slider">
          {banners.map((banner, index) => (
            <a
              key={banner.id}
              href={banner.link}
              className={`banner-slide ${
                index === currentSlide ? 'active' : ''
              }`}
              aria-hidden={index !== currentSlide}
            >
              <img
                src={banner.imageUrl}
                alt={banner.alt}
                className="banner-image"
              />
            </a>
          ))}

          <button
            className="slider-nav prev"
            onClick={prevSlide}
            aria-label="Previous banner"
          >
            <FaChevronLeft />
          </button>
          <button
            className="slider-nav next"
            onClick={nextSlide}
            aria-label="Next banner"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="slider-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <a href={category.link} className="category-link">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="category-image"
                  />
                  <h3 className="category-name">{category.name}</h3>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Listing Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <div className="sort-options">
              <select>
                <option value="popular">Sort by: Popular</option>
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Sort by: Price Low to High</option>
                <option value="price-high">Sort by: Price High to Low</option>
                <option value="rating">Sort by: Rating</option>
              </select>
            </div>
          </div>
          
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
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
                  <div className="product-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Mainpage;