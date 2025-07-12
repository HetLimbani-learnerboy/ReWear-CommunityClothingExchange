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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const mobileNavRef = useRef(null);
  const mobileMenuBtnRef = useRef(null);
  const navigate = useNavigate();

  const banners = [
    { id: 1, imageUrl: 'https://www.shutterstock.com/image-photo/clothes-on-clothing-hanger-260nw-2338282257.jpg', alt: 'Banner 1', link: '#' },
    { id: 2, imageUrl: 'https://www.shutterstock.com/image-photo/beautiful-colorful-clothes-flying-isolatedwomens-260nw-2257875171.jpg', alt: 'Banner 2', link: '#' },
    { id: 3, imageUrl: 'https://media.istockphoto.com/id/1460330505/photo/baby-shop-interior.jpg?s=612x612&w=0&k=20&c=uoBW74-5ara4hVmJwNxb2DrQijZmEgSguopT4pdCKhg=', alt: 'Banner 3', link: '#' }
  ];

  const categories = [
    {
      id: 1,
      name: 'Women',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop&crop=face',
      link: '#',
    },
    {
      id: 2,
      name: 'Men',
      imageUrl: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&h=300&fit=crop',
      link: '#',
    },
    {
      id: 3,
      name: 'Kids',
      imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
      link: '#',
    },
    {
      id: 4,
      name: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      link: '#',
    },
    {
      id: 5,
      name: 'Shoes',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
      link: '#',
    },
    {
      id: 6,
      name: 'Sale',
      imageUrl: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=300&h=300&fit=crop',
      link: '#',
    },
  ];

  const products = [
    {
      id: 1,
      name: "Women's Floral Summer Dress",
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
    // Add more products here...
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleMobileDropdown = (item) => setActiveDropdown(activeDropdown === item ? null : item);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  const goToSlide = (index) => setCurrentSlide(index);
  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const addToCart = (id) => setCart([...cart, id]);

  const renderRatingStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= full) stars.push(<FaStar key={i} className="star filled" />);
      else if (i === full + 1 && half) stars.push(<FaStarHalfAlt key={i} className="star half-filled" />);
      else stars.push(<FaRegStar key={i} className="star" />);
    }
    return stars;
  };

  const navLinks = [
    { name: 'New Arrivals', href: '#', dropdown: false },
    { name: 'Women', href: '#', dropdown: true, items: ['Dresses', 'Tops'] },
    { name: 'Men', href: '#', dropdown: true, items: ['Shirts', 'Pants'] },
    { name: 'Sale', href: '#', dropdown: false },
    { name: 'About', href: '#', dropdown: false },
  ];

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">FASHION<span>HUB</span></a>
          <ul className="nav-links">
            {navLinks.map((link, i) => (
              <li key={i} className={link.dropdown ? 'dropdown' : ''}>
                <a href={link.href}>{link.name}</a>
                {link.dropdown && (
                  <div className="dropdown-content">
                    {link.items.map((item, j) => <a key={j} href="#">{item}</a>)}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-icons">
            <a href="#"><FaSearch /></a>
            <div className="auth-buttons">
              <a onClick={() => navigate('/signinpage')} className="login-btn">Login</a>
              <a onClick={() => navigate('/signuppage')} className="signup-btn">Sign Up</a>
            </div>
            <a onClick={() => navigate('/userdash')}><FaUser /></a>
            <a href="#" className="cart-icon"><FaShoppingBag /><span className="cart-count">{cart.length}</span></a>
            <div className="mobile-menu" onClick={toggleMobileMenu} ref={mobileMenuBtnRef}><FaBars /></div>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`} ref={mobileNavRef}>
        <ul className="mobile-nav-links">
          {navLinks.map((link, i) => (
            <li key={i} className={link.dropdown ? 'mobile-dropdown' : ''}>
              {link.dropdown ? (
                <>
                  <div className="mobile-dropdown-toggle" onClick={() => toggleMobileDropdown(i)}>
                    <a href={link.href}>{link.name}</a>
                    <FaChevronDown className={activeDropdown === i ? 'rotate' : ''} />
                  </div>
                  <div className={`mobile-dropdown-content ${activeDropdown === i ? 'active' : ''}`}>
                    {link.items.map((item, j) => <a key={j} href="#">{item}</a>)}
                  </div>
                </>
              ) : (
                <a href={link.href}>{link.name}</a>
              )}
            </li>
          ))}
        </ul>
        <div className="mobile-auth-buttons">
          <a onClick={() => navigate('/signinpage')} className="login-btn">Login</a>
          <a onClick={() => navigate('/signuppage')} className="signup-btn">Sign Up</a>
        </div>
      </div>

      <div className="promo-banner-container">
        <div className="banner-slider">
          {banners.map((banner, index) => (
            <a key={banner.id} href={banner.link} className={`banner-slide ${index === currentSlide ? 'active' : ''}`}>
              <img src={banner.imageUrl} alt={banner.alt} className="banner-image" />
            </a>
          ))}
          <button className="slider-nav prev" onClick={prevSlide}><FaChevronLeft /></button>
          <button className="slider-nav next" onClick={nextSlide}><FaChevronRight /></button>
        </div>
        <div className="slider-dots">
          {banners.map((_, i) => (
            <button key={i} className={`dot ${i === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(i)} />
          ))}
        </div>
      </div>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map(cat => (
              <div key={cat.id} className="category-card">
                <a href={cat.link} className="category-link">
                  <img src={cat.imageUrl} alt={cat.name} className="category-image" />
                  <h3 className="category-name">{cat.name}</h3>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {products.map(prod => (
              <div key={prod.id} className="product-card">
                <div className="product-image-container">
                  <img src={prod.imageUrl} alt={prod.name} className="product-image" />
                  {prod.isNew && <span className="product-badge new">New</span>}
                  {prod.discount > 0 && <span className="product-badge discount">-{prod.discount}%</span>}
                  {!prod.inStock && <span className="product-badge out-of-stock">Out of Stock</span>}
                  <button className="wishlist-btn" onClick={() => toggleWishlist(prod.id)}>
                    {wishlist.includes(prod.id) ? <FaHeart className="wishlist-icon filled" /> : <FaRegHeart className="wishlist-icon" />}
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{prod.name}</h3>
                  <p className="product-description">{prod.description}</p>
                  <div className="product-rating">
                    {renderRatingStars(prod.rating)}
                    <span className="review-count">({prod.reviewCount})</span>
                  </div>
                  <div className="product-pricing">
                    {prod.discount > 0 && <span className="original-price">${prod.originalPrice}</span>}
                    <span className="current-price">${prod.price}</span>
                  </div>
                  <div className="product-actions">
                    <button className="add-to-cart-btn" onClick={() => addToCart(prod.id)} disabled={!prod.inStock}>
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mainpage;
