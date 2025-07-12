import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/userdashbord.css';

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('listings');
  const [showPointsModal, setShowPointsModal] = useState(false);

  const listings = [
    {
      id: 1,
      title: "Denim Jacket",
      image: "https://example.com/denim-jacket.jpg",
      points: 50,
      status: "available",
      views: 124,
      requests: 3
    },
    {
      id: 2,
      title: "Black Dress",
      image: "https://example.com/black-dress.jpg",
      points: 40,
      status: "pending",
      views: 89,
      requests: 1
    }
  ];

  const purchases = [
    {
      id: 3,
      title: "White Sneakers",
      image: "https://example.com/sneakers.jpg",
      points: 60,
      status: "completed",
      date: "2023-05-15"
    },
    {
      id: 4,
      title: "Winter Coat",
      image: "https://example.com/winter-coat.jpg",
      points: 80,
      status: "in-transit",
      date: "2023-06-02"
    }
  ];

  const swapRequests = [
    {
      id: 5,
      title: "Striped Shirt",
      image: "https://example.com/striped-shirt.jpg",
      requester: "user123",
      status: "pending",
      date: "2023-06-10"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'listings':
        return (
          <div className="items-grid">
            {listings.map(item => (
              <div key={item.id} className="item-card">
                <img src={item.image} alt={item.title} />
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>{item.points} points</p>
                  <div className="item-stats">
                    <span>👁 {item.views}</span>
                    <span>✉ {item.requests}</span>
                  </div>
                  <div className={`status-badge ${item.status}`}>
                    {item.status}
                  </div>
                  <Link to={`/item/${item.id}`} className="view-btn">View</Link>
                </div>
              </div>
            ))}
            <Link to="/add" className="add-item-card">
              <div className="add-item-content">
                <span>+</span>
                <p>List New Item</p>
              </div>
            </Link>
          </div>
        );
      case 'purchases':
        return (
          <div className="items-list">
            {purchases.map(item => (
              <div key={item.id} className="purchase-item">
                <img src={item.image} alt={item.title} />
                <div className="purchase-info">
                  <h4>{item.title}</h4>
                  <p>Redeemed for {item.points} points</p>
                  <p>Date: {item.date}</p>
                  <div className={`status-badge ${item.status}`}>
                    {item.status.replace('-', ' ')}
                  </div>
                </div>
                <div className="purchase-actions">
                  {item.status === 'in-transit' && (
                    <button className="track-btn">Track</button>
                  )}
                  <button className="details-btn">Details</button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'requests':
        return (
          <div className="requests-list">
            {swapRequests.map(request => (
              <div key={request.id} className="request-item">
                <img src={request.image} alt={request.title} />
                <div className="request-info">
                  <h4>{request.title}</h4>
                  <p>Request from: {request.requester}</p>
                  <p>Date: {request.date}</p>
                  <div className={`status-badge ${request.status}`}>
                    {request.status}
                  </div>
                </div>
                <div className="request-actions">
                  {request.status === 'pending' && (
                    <>
                      <button className="accept-btn">Accept</button>
                      <button className="decline-btn">Decline</button>
                    </>
                  )}
                  <button className="message-btn">Message</button>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-profile">
          <img src={user?.avatar || "https://example.com/default-avatar.jpg"} alt="Profile" />
          <div className="user-info">
            <h2>{user?.username || "User"}</h2>
            <p>{user?.location || "Location not set"}</p>
          </div>
        </div>
        <div className="points-balance" onClick={() => setShowPointsModal(true)}>
          <span>Points Balance</span>
          <h3>{user?.points || 0}</h3>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'listings' ? 'active' : ''}
          onClick={() => setActiveTab('listings')}
        >
          My Listings
        </button>
        <button 
          className={activeTab === 'purchases' ? 'active' : ''}
          onClick={() => setActiveTab('purchases')}
        >
          My Purchases
        </button>
        <button 
          className={activeTab === 'requests' ? 'active' : ''}
          onClick={() => setActiveTab('requests')}
        >
          Swap Requests
        </button>
      </div>

      <div className="dashboard-content">
        {renderContent()}
      </div>

      {showPointsModal && (
        <div className="points-modal">
          <div className="modal-content">
            <h3>Your Points</h3>
            <p>Current balance: {user?.points || 0} points</p>
            <p>Earn more points by listing items and completing swaps!</p>
            <div className="points-breakdown">
              <div className="points-earned">
                <h4>Earned</h4>
                <p>+150 points (3 listings)</p>
                <p>+50 points (1 swap completed)</p>
              </div>
              <div className="points-spent">
                <h4>Redeemed</h4>
                <p>-60 points (1 item redeemed)</p>
              </div>
            </div>
            <button 
              className="close-btn"
              onClick={() => setShowPointsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
