import React, { useState } from "react";
import "../css/Homepage.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="homepage-container">
      {/* TEAM BUTTON */}
      <button className="team-button" onClick={toggleSidebar}>
        ☰ Team
      </button>

      {/* MAIN CONTENT SECTION */}
      <div className="content-wrapper">
        {/* LEFT SIDE */}
        <div className="center-content">
          <h1 className="title">ReWear – Community Clothing Exchange</h1>
          <div className="button-pair">
            <button onClick={() => navigate("/signinpage")}>Sign In</button>
            <button onClick={() => navigate("/signuppage")}>Sign Up</button>
          </div>
          <button
            className="get-started"
            onClick={() => navigate("/mainpage")}
          >
            Get Started
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="image-section">
          <img src="/image/ShoppingHome.png" alt="Clothing Exchange" />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Team Members</h2>
        <ul>
          <li>
            <strong>Het Limbani</strong><br />
            Email: hetlimbani61@gmail.com <br/>
            Phone: 7046259573

          </li>
          <li>
            <strong>Harshkumar Patel</strong><br />
            Email: hetlimbani61@gmail.com <br/>
            Phone: 7046259573
          </li>
          <li>
            <strong>Sahil Dobaria</strong><br />
            Email: hetlimbani61@gmail.com <br/>
            Phone: 7046259573
          </li>
          <li>
            <strong>Rohan Upadhyay</strong><br />
            Email: hetlimbani61@gmail.com <br/>
            Phone: 7046259573
          </li>
        </ul>
      </div>

      {/* SIDEBAR OVERLAY */}
      <div
        className={`overlay ${sidebarOpen ? "show" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default Homepage;
