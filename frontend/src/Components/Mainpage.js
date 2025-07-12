import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaUser, FaShoppingBag, FaBars, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../css/Mainpage.css'

const Mainpage = () => {
    const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const mobileNavRef = useRef(null);
  const mobileMenuBtnRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && 
          !mobileNavRef.current.contains(event.target) && 
          !mobileMenuBtnRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileDropdown = (item) => {
    setActiveDropdown(activeDropdown === item ? null : item);
  };

  const navLinks = [
    { name: 'New Arrivals', href: '#', dropdown: false },
    { 
      name: 'Women', 
      href: '#', 
      dropdown: true,
      items: ['Dresses', 'Tops', 'Jeans', 'Activewear', 'Accessories']
    },
    { 
      name: 'Men', 
      href: '#', 
      dropdown: true,
      items: ['Shirts', 'Pants', 'Jackets', 'Activewear', 'Accessories']
    },
    { name: 'Sale', href: '#', dropdown: false },
    { name: 'About', href: '#', dropdown: false }
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">RE<span>WEAR</span></a>
          
          <ul className="nav-links">
            {navLinks.map((link, index) => (
              <li key={index} className={link.dropdown ? 'dropdown' : ''}>
                <a href={link.href}>{link.name}</a>
                {link.dropdown && (
                  <div className="dropdown-content">
                    {link.items.map((item, i) => (
                      <a key={i} href="#">{item}</a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          
          <div className="nav-icons">
            <a href="#"><FaSearch /></a>
            <div className="auth-buttons">
              <button  onClick={()=>navigate('/signinpage')} className="login-button">Login</button>
              <button onClick={()=>navigate('/signuppage')} className="signup-button">Sign Up</button>
            </div>
            <a href="#"><FaUser /></a>
            <a href="#" className="cart-icon">
              <FaShoppingBag />
              <span className="cart-count">3</span>
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
                    className={`mobile-dropdown-content ${activeDropdown === index ? 'active' : ''}`}
                  >
                    {link.items.map((item, i) => (
                      <a key={i} href="#">{item}</a>
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
          <a href="#" className="login-btn">Login</a>
          <a href="#" className="signup-btn">Sign Up</a>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        
        body {
          padding-top: 80px;
        }
        
        .navbar {
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          padding: 15px 5%;
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .logo {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          text-decoration: none;
        }
        
        .logo span {
          color: #e63946;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
        }
        
        .nav-links li {
          margin: 0 15px;
          position: relative;
        }
        
        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          font-size: 16px;
          transition: color 0.3s;
        }
        
        .nav-links a:hover {
          color: #e63946;
        }
        
        .dropdown {
          position: relative;
        }
        
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: white;
          min-width: 200px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          z-index: 1;
          padding: 15px 0;
          border-radius: 0 0 5px 5px;
        }
        
        .dropdown:hover .dropdown-content {
          display: block;
        }
        
        .dropdown-content a {
          padding: 10px 20px;
          display: block;
          color: #555;
        }
        
        .dropdown-content a:hover {
          background-color: #f8f8f8;
          color: #e63946;
        }
        
        .nav-icons {
          display: flex;
          align-items: center;
        }
        
        .nav-icons a {
          margin-left: 20px;
          color: #333;
          font-size: 18px;
          transition: color 0.3s;
          position: relative;
        }
        
        .nav-icons a:hover {
          color: #e63946;
        }
        
        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: #e63946;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .mobile-menu {
          display: none;
          font-size: 24px;
          cursor: pointer;
        }
        
        /* Auth Buttons */
        .auth-buttons {
          display: flex;
          margin-left: 20px;
        }
        
        .auth-buttons a {
          padding: 8px 15px;
          border-radius: 4px;
          margin-left: 10px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
        }
        
        .login-btn {
          color: #333;
          border: 1px solid #ddd;
        }
        
        .signup-btn {
          background-color: #e63946;
          color: white;
          border: 1px solid #e63946;
        }
        
        /* Mobile Menu */
        .mobile-nav {
          display: none;
          position: fixed;
          top: 80px;
          left: 0;
          width: 100%;
          background-color: white;
          box-shadow: 0 5px 10px rgba(0,0,0,0.1);
          z-index: 999;
          padding: 20px;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }
        
        .mobile-nav.active {
          display: block;
        }
        
        .mobile-nav-links {
          list-style: none;
        }
        
        .mobile-nav-links li {
          margin-bottom: 15px;
        }
        
        .mobile-nav-links a {
          text-decoration: none;
          color: #333;
          font-size: 16px;
          display: block;
          padding: 10px 0;
        }
        
        .mobile-dropdown-content {
          display: none;
          padding-left: 15px;
          margin-top: 10px;
        }
        
        .mobile-dropdown-content a {
          padding: 8px 0;
          font-size: 14px;
          color: #555;
        }
        
        .mobile-dropdown-content.active {
          display: block;
        }
        
        .mobile-dropdown-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
        
        .mobile-dropdown-toggle svg {
          transition: transform 0.3s;
        }
        
        .mobile-dropdown-toggle svg.rotate {
          transform: rotate(180deg);
        }
        
        .mobile-auth-buttons {
          display: flex;
          margin-top: 20px;
        }
        
        .mobile-auth-buttons a {
          flex: 1;
          text-align: center;
          padding: 10px;
          margin: 0 5px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
        }
        
        @media (max-width: 992px) {
          .nav-links, .auth-buttons {
            display: none;
          }
          
          .mobile-menu {
            display: block;
          }
        }
        
        @media (max-width: 576px) {
          .navbar {
            padding: 15px 3%;
          }
        
          .nav-icons a:not(:last-child) {
            display: none;
          }
          
          .cart-count {
            top: -5px;
            right: -12px;
          }
        }
      `}</style>
    </>
  );
};

export default Mainpage;