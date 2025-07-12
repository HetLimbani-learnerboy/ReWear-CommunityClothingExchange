import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Product data:', {
      ...product,
      images: previewImages // In real app, these would be URLs from your server
    });
    
    alert('Product added successfully!');
    navigate('/products');
  };

  return (
    <div className="add-product-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      
      <h1>Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="product-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h2>Basic Information</h2>
          
          <div className="form-group">
            <label htmlFor="name">Product Name*</label>
            <input
              id="name"
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter product description"
            />
          </div>
          
          <div className="price-row">
            <div className="form-group">
              <label htmlFor="price">Price ($)*</label>
              <input
                id="price"
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                placeholder="0.00"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="originalPrice">Original Price ($)</label>
              <input
                id="originalPrice"
                type="number"
                name="originalPrice"
                value={product.originalPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
              <option value="Accessories">Accessories</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="inStock"
                checked={product.inStock}
                onChange={handleChange}
              />
              <span>In Stock</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isNew"
                checked={product.isNew}
                onChange={handleChange}
              />
              <span>New Arrival</span>
            </label>
          </div>
        </div>
        
        {/* Variants Section */}
        <div className="form-section">
          <h2>Variants</h2>
          
          <div className="form-group">
            <label>Colors</label>
            <div className="variant-input-group">
              <input
                type="text"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                placeholder="Add color (e.g., Red)"
              />
              <button type="button" onClick={addColor} className="add-variant-btn">
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
                      className="remove-variant-btn"
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
            <div className="variant-input-group">
              <input
                type="text"
                value={currentSize}
                onChange={(e) => setCurrentSize(e.target.value)}
                placeholder="Add size (e.g., M)"
              />
              <button type="button" onClick={addSize} className="add-variant-btn">
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
                      className="remove-variant-btn"
                    >
                      <FaMinus />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Images Section */}
        <div className="form-section">
          <h2>Product Images</h2>
          
          <div className="form-group">
            <label>Upload Images (Max 5)*</label>
            <div className="image-upload-container">
              <label htmlFor="product-images" className="upload-button">
                <FaUpload /> Choose Images
                <input
                  id="product-images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  max="5"
                />
              </label>
              <span className="file-info">
                {images.length > 0 ? `${images.length} files selected` : 'No files selected'}
              </span>
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
        
        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => navigate('/products')}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;