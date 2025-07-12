import React, { useState } from "react";
import "../css/Homepage.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="homepage-container">
      <header className="header">
        <h1 className="title">ReWear – Community Clothing Exchange</h1>
        <div className="button-group">
          <button onClick={() => navigate("/signinpage")}>Sign In</button>
          <button onClick={() => navigate("/signuppage")}>Sign Up</button>
          <button onClick={() => navigate("/mainpage")}>Get Started</button>
          <button onClick={toggleSidebar}>☰ Team</button>
        </div>
      </header>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Team Members</h2>
        <ul>
          <li>
            <strong>Het Limbani</strong><br />
            het@example.com
          </li>
          <li>
            <strong>Riya Sharma</strong><br />
            riya@example.com
          </li>
          <li>
            <strong>Arjun Patel</strong><br />
            arjun@example.com
          </li>
          <li>
            <strong>Sana Khan</strong><br />
            sana@example.com
          </li>
        </ul>
      </div>

      <div className={`overlay ${sidebarOpen ? "show" : ""}`} onClick={toggleSidebar}></div>
    </div>
  );
};

export default Homepage;
