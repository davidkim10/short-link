import React from 'react';
import { Link } from 'react-router';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="jumbotron">
        <div className="jumbotron-logo">
          <img src="img/text-logo.png" alt="Bridged logo" />
        </div>
        <h1 className="jumbotron-title">Create Shorter Links</h1>
        <div className="jumbotron-subtitle">
          A free URL shortening service with tools to track your engagement
        </div>
        <div className="jumbotron-cta">
          <button
            className="button ui primary big"
            style={{ marginBottom: '2rem' }}
          >
            <Link to="/signup">Create a Free Account</Link>
          </button>
          <p>
            <Link to="/login">Already have an account? Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
