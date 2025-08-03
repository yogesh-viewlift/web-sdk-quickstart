import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './style.scss';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    window.location.reload(); 
  };

  return (
    <header className="header">
      <div className="header__content">
        <NavLink to="/" className="header__logo">
          <img
            src="https://spinco.staging.asset.viewlift.com/images/brand/2025/06/06/usa_network-1749201936950.png"
            alt="Logo"
          />
        </NavLink>

        <nav className="header__nav">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
              >
                Home
              </NavLink>
            </li>
          </ul>
        </nav>

        {false && (
          <div className="header__logout">
            <button className="header__logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;