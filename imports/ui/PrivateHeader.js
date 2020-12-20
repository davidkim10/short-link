import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

const PrivateHeader = (props) => {
  return (
    <div className="header" style={{ display: 'none' }}>
      <div className="header__content">
        <img className="logo" src="/img/logo.png" alt="logo" />
      </div>

      <h1 className="header__title">{props.title}</h1>
      <button
        className="button button--link-text"
        onClick={() => Accounts.logout()}
      >
        Logout
      </button>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

PrivateHeader.defaultProps = {
  title: 'Enter a title for this component',
};

export default PrivateHeader;
