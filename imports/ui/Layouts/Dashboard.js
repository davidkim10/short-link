import React from 'react';
import { Accounts } from 'meteor/accounts-base';
const Dashboard = ({ user, handleModal, children }) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <img className="logo" src="/img/logo-horizontal.jpg" alt="logo" />

        <div className="menu-buttons">
          <div className="ui compact menu">
            <div className="ui simple dropdown item">
              <span className="simple-label" style={{ fontSize: '12px' }}>
                <i className="icon user"></i> {user.firstName} {user.lastName}
                <i className="dropdown icon" style={{ marginRight: 0 }}></i>
              </span>
              <div className="menu">
                <div className="item" onClick={handleModal}>
                  Create New Link
                </div>
                <div className="item" onClick={() => Accounts.logout()}>
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="dashboard-main">{children}</main>
      <footer className="dashboard-footer">Copyright © 2020</footer>
    </div>
  );
};

export default Dashboard;
