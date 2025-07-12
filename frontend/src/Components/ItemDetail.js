import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaExchangeAlt, FaCoins, FaUser, FaStar, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import '../css/ItemDetail.css';

// Mock data array
const mockItems = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    description: "A lightly worn vintage denim jacket in excellent condition. Perfect for layering and adding a retro touch to your outfits. Made from 100% cotton with authentic distressing and fading that gives it character.",
    images: [
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600"
    ],
    category: "Clothing",
    type: "Jacket",
    size: "M",
    condition: "Very Good",
    conditionRating: 4,
    tags: ["Vintage", "Denim", "Casual", "Unisex", "90s"],
    uploader: {
      name: "EcoFashionista",
      joinDate: "2022",
      trustScore: 4.8,
      swapsCompleted: 50,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    availability: "Available",
    pointsValue: 250,
    createdAt: "2023-05-15",
    brand: "Levi's",
    material: "100% Cotton",
    color: "Blue",
    shippingInfo: "Free shipping within US"
  },
  {
    id: "2",
    title: "Leather Crossbody Bag",
    description: "Genuine leather crossbody bag in black. Minimal wear, plenty of pockets for organization. Features an adjustable strap and secure zipper closure.",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600",
      "https://images.unsplash.com/photo-1566150902887-9679ecc155ba?w=600"
    ],
    category: "Accessories",
    type: "Bag",
    size: "One Size",
    condition: "Excellent",
    conditionRating: 5,
    tags: ["Leather", "Handbag", "Accessory", "Black"],
    uploader: {
      name: "StyleRecycler",
      joinDate: "2021",
      trustScore: 4.9,
      swapsCompleted: 75,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    availability: "Available",
    pointsValue: 350,
    createdAt: "2023-06-20",
    brand: "Fossil",
    material: "Genuine Leather",
    color: "Black",
    shippingInfo: "Free shipping worldwide"
  }
];

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [selectedSwapItem, setSelectedSwapItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Mock user items for swap
  const userItems = [
    {
      id: "u1",
      title: "Floral Summer Dress",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=150",
      size: "S",
      points: 200
    },
    {
      id: "u2",
      title: "White Sneakers",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=150",
      size: "8",
      points: 300
    }
  ];

  useEffect(() => {
    const fetchItem = () => {
      try {
        setTimeout(() => {
          const foundItem = mockItems.find(item => item.id === id);
          if (foundItem) {
            setItem(foundItem);
          } else {
            setError("Item not found");
          }
          setLoading(false);
        }, 800);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you would update this in your backend
  };

  const handleSwapRequest = () => {
    setShowSwapModal(true);
  };

  const handlePointsRedeem = () => {
    setShowPointsModal(true);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleSwapSubmit = () => {
    // In a real app, you would send the swap request to your backend
    alert(`Swap request sent for ${item.title} with ${selectedSwapItem.title}`);
    setShowSwapModal(false);
    setSelectedSwapItem(null);
  };

  const handlePointsSubmit = () => {
    // In a real app, you would process the points redemption
    alert(`Successfully redeemed ${item.pointsValue * quantity} points for ${quantity} ${item.title}(s)`);
    setShowPointsModal(false);
    setQuantity(1);
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!item) return <div className="not-found">Item not found</div>;

  return (
    <div className="item-detail-container">
      <button className="back-button" onClick={handleBackClick}>
        <FaArrowLeft /> Back to Browse
      </button>

      <div className="item-content">
        <div className="item-gallery">
          <Carousel showThumbs={true} infiniteLoop={true} emulateTouch={true}>
            {item.images.map((img, index) => (
              <div key={index} className="carousel-slide">
                <img src={img} alt={`${item.title} - view ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="item-info">
          <div className="item-header">
            <h1>{item.title}</h1>
            <button 
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <FaHeart /> {isFavorite ? 'Saved' : 'Save'}
            </button>
          </div>

          <div className="item-meta">
            <span className="brand">{item.brand}</span>
            <span className="upload-date">Listed: {new Date(item.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="item-price">
            <span className="points-value">{item.pointsValue} <FaCoins /></span>
            <span className="shipping-info">{item.shippingInfo}</span>
          </div>

          <div className="item-description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          <div className="item-specs">
            <div className="specs-grid">
              <div className="spec">
                <span className="spec-label">Category:</span>
                <span className="spec-value">{item.category} → {item.type}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Size:</span>
                <span className="spec-value">{item.size}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Color:</span>
                <span className="spec-value">{item.color}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Material:</span>
                <span className="spec-value">{item.material}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Condition:</span>
                <span className="spec-value">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className={i < item.conditionRating ? 'filled' : 'empty'} />
                  ))}
                  ({item.condition})
                </span>
              </div>
            </div>

            <div className="tags-container">
              {item.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          </div>

          <div className="uploader-info">
            <div className="uploader-avatar">
              <img src={item.uploader.avatar} alt={item.uploader.name} />
            </div>
            <div className="uploader-details">
              <h4>Uploaded by <FaUser /> {item.uploader.name}</h4>
              <p>Member since {item.uploader.joinDate}</p>
              <p>Trust Score: {item.uploader.trustScore}/5 ({item.uploader.swapsCompleted}+ swaps)</p>
            </div>
          </div>

          <div className="availability-badge">
            {item.availability === 'Available' ? (
              <span className="available">🟢 Available for Swap or Points</span>
            ) : (
              <span className="pending">🟡 Pending Swap</span>
            )}
          </div>

          <div className="action-buttons">
            <button 
              className="swap-button" 
              onClick={handleSwapRequest}
              disabled={item.availability !== 'Available'}
            >
              <FaExchangeAlt /> Request Swap
            </button>
            <button 
              className="points-button"
              onClick={handlePointsRedeem}
              disabled={item.availability !== 'Available'}
            >
              <FaCoins /> Redeem for {item.pointsValue} points
            </button>
            <button className="buy-button">
              <FaShoppingCart /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Swap Request Modal */}
      {showSwapModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Request Swap</h3>
            <p>Select an item from your wardrobe to propose for this swap:</p>
            
            <div className="swap-options">
              {userItems.map(userItem => (
                <div key={userItem.id} className="swap-item-option">
                  <input 
                    type="radio" 
                    id={`swap-${userItem.id}`} 
                    name="swapItem" 
                    checked={selectedSwapItem?.id === userItem.id}
                    onChange={() => setSelectedSwapItem(userItem)}
                  />
                  <label htmlFor={`swap-${userItem.id}`}>
                    <img src={userItem.image} alt={userItem.title} />
                    <div className="swap-item-details">
                      <span>{userItem.title}</span>
                      <span>Size: {userItem.size}</span>
                      <span>{userItem.points} points</span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
            
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => {
                setShowSwapModal(false);
                setSelectedSwapItem(null);
              }}>
                Cancel
              </button>
              <button 
                className="confirm-button" 
                onClick={handleSwapSubmit}
                disabled={!selectedSwapItem}
              >
                Send Swap Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Points Redeem Modal */}
      {showPointsModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Redeem with Points</h3>
            <p>This item costs <strong>{item.pointsValue} points</strong> each.</p>
            <p>Your current balance: <strong>1,200 points</strong>.</p>
            
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                max="10" 
                value={quantity}
                onChange={handleQuantityChange}
              />
              <span>Total: {item.pointsValue * quantity} points</span>
            </div>
            
            <div className="confirmation-message">
              <p>Are you sure you want to redeem {quantity} {item.title}(s) for {item.pointsValue * quantity} points?</p>
            </div>
            
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => {
                setShowPointsModal(false);
                setQuantity(1);
              }}>
                Cancel
              </button>
              <button 
                className="confirm-button" 
                onClick={handlePointsSubmit}
                disabled={item.pointsValue * quantity > 1200}
              >
                Confirm Redemption ({item.pointsValue * quantity} points)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;