import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { childrenShape } from '@bibliocommons/bc-prop-types';
import ErrorService from 'app/services/ErrorService';

export default class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { error };
  }

  state = { error: null, errorId: null };

  componentDidCatch(error) {
    this.setState({ error }, () => {
      ErrorService.notify(error)
        .catch(e => console.error(e)) // eslint-disable-line no-console
        .then(errorId => {
          this.setState({ errorId });
        });
    });
  }

  renderAppVersion() {
    const { appVersion } = this.props;

    if (appVersion) {
      return (
        <span data-test-id="app-version">
          NERF: {appVersion}
          <br />
        </span>
      );
    }

    return '';
  }

  renderErrorId() {
    const { errorId } = this.state;

    if (errorId) {
      return (
        <span data-test-id="error-id">
          Error ID: {errorId}
          <br />
        </span>
      );
    }

    return null;
  }

  render() {
    if (this.state.error) {
      const timestamp = moment().format('YYYY/MM/DD HH:mm');

      return (
        <div className="cp-error-boundary">
          <div className="main-error-content">
            <h1 className="title">We&rsquo;re very sorry!</h1>
            <p className="description">
              Something on our end isn&rsquo;t working properly. <br />
              We&rsquo;re working hard to fix the problem.
            </p>
            <hr />
            <h2>In the meantime, you can&hellip;</h2>
            <p className="description">
              <a data-key="home-link" href="/dashboard">
                Browse the library catalog &raquo;
              </a>
            </p>
          </div>
          <hr />
          <div className="error-ids">
            {this.renderErrorId()}
            {this.renderAppVersion()}
            {timestamp}
          </div>
          <div className="report-problem">
            <h2>To report this problem&hellip;</h2>
            <p>Take a screenshot of this window and share it with your library.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  appVersion: PropTypes.string,
  children: childrenShape.isRequired
};
