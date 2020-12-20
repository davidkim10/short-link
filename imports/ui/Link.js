import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import AddLinkForm from './AddLinkForm';
import Dashboard from './Layouts/Dashboard';
import LinkListContainer from './LinkListContainer';
import LinksList from './LinksList';
import LinksListFilters from './LinksListFilters';
import Modal from './Modal';
class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
      },
      isModalOpen: false,
    };
  }

  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      this.setState({
        user: {
          firstName: Meteor.users?.findOne()?.profile?.firstName,
          lastName: Meteor.users?.findOne()?.profile?.lastName,
          email: Meteor.users?.findOne()?.emails[0].address,
        },
      });
    });
  }

  componentWillUnmount() {
    this.tracker.stop();
  }

  handleModal = (e) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    return (
      <Dashboard user={this.state.user} handleModal={this.handleModal}>
        <div className="page-content">
          {/* Create New Link */}
          <button
            className="ui button fluid primary large"
            onClick={this.handleModal}
          >
            Create New Short Link
          </button>

          {/* View All Short Links */}
          <LinkListContainer>
            <LinksListFilters />
            <LinksList handleModal={this.handleModal} />
          </LinkListContainer>

          {/* Add New Link Modal */}
          <Modal
            handleDismiss={this.handleModal}
            isOpen={this.state.isModalOpen}
          >
            <AddLinkForm
              onFormSuccess={this.handleModal}
              handleModal={this.handleModal}
            />
          </Modal>
        </div>
      </Dashboard>
    );
  }
}

export default Link;
