import React, { Component } from 'react';

class AddLinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      urlPrefix: 'https://',
      url: '',
      error: '',
    };
  }

  componentDidMount() {
    this.refs.url.focus();
  }

  handleDropdown = (e) => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  handleDropdownChange = (e) => {
    const urlPrefix = e.target.getAttribute('value');
    this.setState({ urlPrefix });
  };

  handleOnChange = (e) => {
    this.setState({
      url: e.target.value,
    });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    const { url, urlPrefix } = this.state;
    const link = `${urlPrefix}${url}`;
    // Create New Short Link
    Meteor.call('links.insert', link, (err, res) => {
      if (!err) {
        this.props.onFormSuccess && this.props.onFormSuccess();
      } else {
        this.setState({ error: err.reason });
      }
    });
  };

  render() {
    const { error, isDropdownOpen, urlPrefix } = this.state;
    return (
      <div className="addshortlink-wrapper">
        <div className="addshortlink-header">
          <h1>Create New Short Link</h1>
          {error && (
            <div className="ui negative message">
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="addshortlink-body">
          <form onSubmit={this.handleOnSubmit} className="ui form">
            <div className="field">
              <div className="ui left labeled input">
                <div
                  className={`ui dropdown label ${
                    isDropdownOpen ? 'active visible' : ''
                  }`}
                  onClick={this.handleDropdown}
                >
                  <div className="text">{urlPrefix}</div>
                  <i className="dropdown icon"></i>
                  <div
                    className={`menu transition  ${
                      isDropdownOpen ? 'visible' : ''
                    }`}
                  >
                    <div
                      className="item"
                      onClick={this.handleDropdownChange}
                      value="http://"
                    >
                      http://
                    </div>
                    <div
                      className="item"
                      onClick={this.handleDropdownChange}
                      value="https://"
                    >
                      https://
                    </div>
                  </div>
                </div>
                <input
                  type="text"
                  ref="url"
                  placeholder="website.com"
                  value={this.state.url}
                  onChange={this.handleOnChange}
                />
              </div>
            </div>

            <div className="addshortlink-footer">
              <button className="ui button primary">Add Link</button>
              {this.props.handleModal && (
                <button
                  type="button"
                  className="ui button basic"
                  onClick={this.props.handleModal}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddLinkForm;
