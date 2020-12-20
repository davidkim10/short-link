import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class LinkListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false,
    };
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard
      .on('success', (e) => {
        this.setState({ justCopied: true });
        setTimeout(() => this.setState({ justCopied: false }), 500);
      })
      .on('error', () => {
        console.log('unable to copy.');
      });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  handleArchive = (e, isArchive) => {
    const setLinkVisibility = () => {
      Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
    };

    if (isArchive) {
      const archiveConfirmMsg = 'Are you sure you want to archive this link?';
      const isArchivedConfirmed = confirm(archiveConfirmMsg);
      !!isArchivedConfirmed && setLinkVisibility();
      return;
    }

    setLinkVisibility();
  };

  renderStats() {
    const { lastVisitedAt, visitedCount } = this.props;
    const visitedMessage =
      typeof lastVisitedAt === 'number'
        ? moment(lastVisitedAt).fromNow()
        : null;

    return (
      <ul className="visit-metrics">
        <li>Visits: {visitedCount}</li>
        {visitedMessage && (
          <li>
            <em>Last visit {visitedMessage}</em>
          </li>
        )}
      </ul>
    );
  }

  render() {
    const { url, shortUrl, visible } = this.props;
    return (
      <div className="link-item">
        <div className="link-item-header">
          <p className="title">
            <i className="globe icon"></i> {url}
          </p>
          <button
            className="ui button standard mini"
            onClick={(e) => this.handleArchive(e, !!visible)}
          >
            {visible ? ' ARCHIVE' : 'RESTORE'}
          </button>
        </div>

        <div className="link-item-body">
          <div className="text-wrapper">
            <span className="subTitle">SHORTENED URL</span>
            <p className="title">
              <a href={shortUrl} target="_blank">
                {shortUrl}
              </a>
            </p>
          </div>

          <div className="button-wrapper">
            <button
              className="ui button basic mini primary"
              ref="copy"
              data-clipboard-text={shortUrl}
            >
              {this.state.justCopied ? 'COPIED' : 'COPY'}
            </button>
          </div>
        </div>

        <div className="link-item-footer">{this.renderStats()}</div>
      </div>
    );
  }
}

// Proptype definition - all required and all strings
LinkListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number,
};
