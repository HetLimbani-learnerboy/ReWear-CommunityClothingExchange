import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please sign in to access this page.");
      navigate("/signinpage");
    }
  }, []);

  const banners = [
    { id: 1, imageUrl: 'https://via.placeholder.com/800x300?text=Banner+1', alt: 'Banner 1', link: '#' },
    { id: 2, imageUrl: 'https://via.placeholder.com/800x300?text=Banner+2', alt: 'Banner 2', link: '#' },
    { id: 3, imageUrl: 'https://via.placeholder.com/800x300?text=Banner+3', alt: 'Banner 3', link: '#' },
  ];

  const products = [
    { id: 1, name: 'Dress', price: 49.99, originalPrice: 69.99, discount: 30, imageUrl: 'https://via.placeholder.com/300x400?text=Product+1', rating: 4.5, reviewCount: 120, inStock: true, isNew: true },
    { id: 2, name: 'Jeans', price: 59.99, originalPrice: 79.99, discount: 25, imageUrl: 'https://via.placeholder.com/300x400?text=Product+2', rating: 4.2, reviewCount: 80, inStock: true, isNew: false },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && mobileNavRef.current && !mobileNavRef.current.contains(event.target) && mobileMenuBtnRef.current && !mobileMenuBtnRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleWishlist = (id) => setWishlist((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const addToCart = (id) => setCart([...cart, id]);
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) stars.push(<FaStar key={i} />);
      else if (i === Math.floor(rating) + 1 && rating % 1 >= 0.5) stars.push(<FaStarHalfAlt key={i} />);
      else stars.push(<FaRegStar key={i} />);
    }
    return stars;
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">RE<span>WEAR</span></a>
          <ul className="nav-links">
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Women</a></li>
            <li><a href="#">Men</a></li>
            <li><a href="#">Sale</a></li>
          </ul>
          <div className="nav-icons">
            <a href="#"><FaSearch /></a>
            {localStorage.getItem("email") ? (
              <>
                <button onClick={() => { localStorage.clear(); navigate("/"); }} className="login-button">Logout</button>
                <button onClick={() => navigate("/userdash")} className="login-button"><FaUser /></button>
              </>
            ) : (
              <div className="auth-buttons">
                <button onClick={() => navigate("/signinpage")} className="login-button">Login</button>
                <button onClick={() => navigate("/signuppage")} className="signup-button">Sign Up</button>
              </div>
            )}
            <a href="#" className="cart-icon">
              <FaShoppingBag /> <span className="cart-count">{cart.length}</span>
            </a>
            <div className="mobile-menu" onClick={toggleMobileMenu} ref={mobileMenuBtnRef}><FaBars /></div>
          </div>
        </div>
      </nav>

      <div className="promo-banner-container">
        <div className="banner-slider">
          {banners.map((banner, index) => (
            <a key={banner.id} href={banner.link} className={`banner-slide ${index === currentSlide ? 'active' : ''}`}>
              <img src={banner.imageUrl} alt={banner.alt} className="banner-image" />
            </a>
          ))}
          <button className="slider-nav prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}><FaChevronLeft /></button>
          <button className="slider-nav next" onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}><FaChevronRight /></button>
        </div>
      </div>

      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <div>{renderRatingStars(product.rating)} ({product.reviewCount})</div>
                <div className="price">
                  <span className="original-price">${product.originalPrice}</span>
                  <span className="discounted-price">${product.price}</span>
                </div>
                <button onClick={() => addToCart(product.id)}><FaShoppingCart /> Add to Cart</button>
                <button onClick={() => toggleWishlist(product.id)}>
                  {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Mainpage;