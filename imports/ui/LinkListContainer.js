import React from 'react';

const LinkListContainer = ({ children }) => {
  return (
    <div className="link-list-container" style={{ marginTop: '2rem' }}>
      {children}
    </div>
  );
};

export default LinkListContainer;
