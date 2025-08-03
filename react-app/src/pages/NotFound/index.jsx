import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

const NotFound = () => {
  return (
    <div className="notfound-page">
      <main className="notfound-main">
        <h1 className="notfound-title">404 - Page Not Found</h1>
        <p className="notfound-description">
          Sorry, the page you are looking for does not exist.
        </p>
        <NavLink to="/" className="notfound-home-link">
          Go to Home
        </NavLink>
      </main>
    </div>
  );
};

export default NotFound;