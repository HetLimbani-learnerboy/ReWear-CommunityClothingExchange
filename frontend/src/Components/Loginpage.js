import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/Signinpage.css'

const Loginpage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signin-body">
            <div className="signin-container">
                <h2>Sign In</h2>
                <form >
                    <div className="form-group email-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="👤 Enter your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="🔐 Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <span className="eye-icon" onClick={togglePassword}>
                                <img
                                    src={showPassword ? '/image/eye_open.png' : '/image/eye-close.svg'}
                                    alt="Toggle password visibility"
                                    className="eye-icon-img"
                                />
                            </span>
                        </div>
                    </div>

                    <div className="forgot-password">
                        <Link to="/forgotpassword">Forgot Password?</Link>
                    </div>
                    <button className="signin-btn" type="submit">Sign In</button>
                </form>

                <p>
                    <Link className="back-btn" to="/">← Back to Home</Link>
                </p>
            </div>
        </div>
    );
};

export default Loginpage;