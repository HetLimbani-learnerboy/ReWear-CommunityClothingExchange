import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaPlus, FaMinus } from 'react-icons/fa';
import '../css/ProductListing.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    colors: [],
    sizes: [],
    inStock: true,
    isNew: false,
  });
  const [currentColor, setCurrentColor] = useState('');
  const [currentSize, setCurrentSize] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const addColor = () => {
    if (currentColor && !product.colors.includes(currentColor)) {
      setProduct(prev => ({
        ...prev,
        colors: [...prev.colors, currentColor]
      }));
      setCurrentColor('');
    }
  };

  const removeColor = (colorToRemove) => {
    setProduct(prev => ({
      ...prev,
      colors: prev.colors.filter(color => color !== colorToRemove)
    }));
  };

  const addSize = () => {
    if (currentSize && !product.sizes.includes(currentSize)) {
      setProduct(prev => ({
        ...prev,
        sizes: [...prev.sizes, currentSize]
      }));
      setCurrentSize('');
    }
  };

  const removeSize = (sizeToRemove) => {
    setProduct(prev => ({
      ...prev,
      sizes: prev.sizes.filter(size => size !== sizeToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real app, you would upload images to a server
    // and get back URLs to store with your product data
    const imageUrls = []; // This would be populated with actual image URLs
    
    const productData = {
      ...product,
      price: parseFloat(product.price),
      originalPrice: parseFloat(product.originalPrice || product.price),
      images: imageUrls,
      rating: 0, // New products start with no ratings
      reviewCount: 0
    };
    
    // Here you would typically send the data to your backend API
    console.log('Submitting product:', productData);
    
    // Simulate API call
    try {
      // await api.addProduct(productData);
      alert('Product added successfully!');
      navigate('/products'); // Redirect to products page
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-section">
          <h2>Product Information</h2>
          
          <div className="form-group">
            <label>Product Name*</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>
          
          <div className="price-group">
            <div className="form-group">
              <label>Price ($)*</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Original Price ($)</label>
              <input
                type="number"
                name="originalPrice"
                value={product.originalPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Category*</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
              <option value="Accessories">Accessories</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>
          
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="inStock"
                checked={product.inStock}
                onChange={handleChange}
              />
              In Stock
            </label>
            
            <label>
              <input
                type="checkbox"
                name="isNew"
                checked={product.isNew}
                onChange={handleChange}
              />
              Mark as New Arrival
            </label>
          </div>
        </div>
        
        <div className="form-section">
          <h2>Product Variants</h2>
          
          <div className="form-group">
            <label>Colors</label>
            <div className="variant-input">
              <input
                type="text"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                placeholder="Add color (e.g., Red)"
              />
              <button type="button" onClick={addColor} className="add-btn">
                <FaPlus />
              </button>
            </div>
            {product.colors.length > 0 && (
              <div className="variant-tags">
                {product.colors.map((color, index) => (
                  <span key={index} className="variant-tag">
                    {color}
                    <button 
                      type="button" 
                      onClick={() => removeColor(color)}
                      className="remove-btn"
                    >
                      <FaMinus />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Sizes</label>
            <div className="variant-input">
              <input
                type="text"
                value={currentSize}
                onChange={(e) => setCurrentSize(e.target.value)}
                placeholder="Add size (e.g., M)"
              />
              <button type="button" onClick={addSize} className="add-btn">
                <FaPlus />
              </button>
            </div>
            {product.sizes.length > 0 && (
              <div className="variant-tags">
                {product.sizes.map((size, index) => (
                  <span key={index} className="variant-tag">
                    {size}
                    <button 
                      type="button" 
                      onClick={() => removeSize(size)}
                      className="remove-btn"
                    >
                      <FaMinus />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="form-section">
          <h2>Product Images</h2>
          
          <div className="form-group">
            <label>Upload Images*</label>
            <div className="image-upload">
              <label htmlFor="product-images" className="upload-btn">
                <FaUpload /> Choose Files
              </label>
              <input
                id="product-images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required
                style={{ display: 'none' }}
              />
              <span>{images.length} files selected</span>
            </div>
            
            {previewImages.length > 0 && (
              <div className="image-previews">
                {previewImages.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <span>{images[index].name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;