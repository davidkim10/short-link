import React from 'react';
import PropTypes from 'prop-types';

const AuthLayout = ({ children, errorMessage, subTitle, title }) => {
  return (
    <div className="auth-layout">
      <div className="container">
        <div className="logo">
          <img src="/img/text-logo.jpg" alt="logo" />
        </div>
        {title && <h1 className="auth-title">{title}</h1>}
        {subTitle && <p className="auth-subTitle">{subTitle}</p>}
        {errorMessage && (
          <div className="auth-error-wrapper ui negative message">
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="auth-form-container">{children}</div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  errorMessage: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default AuthLayout;
