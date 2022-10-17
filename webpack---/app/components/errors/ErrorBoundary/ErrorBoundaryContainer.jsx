import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { childrenShape } from '@bibliocommons/bc-prop-types';
import { selectAppConfig } from 'app/selectors/AppSelector';
import ErrorBoundary from './ErrorBoundary';

import './ErrorBoundary.scss';

export function ErrorBoundaryContainer(props) {
  return <ErrorBoundary {...props} />;
}

ErrorBoundaryContainer.propTypes = {
  appVersion: PropTypes.string,
  children: childrenShape.isRequired
};

const mapStateToProps = state => ({
  appVersion: selectAppConfig(state).get('appVersion')
});

export default connect(mapStateToProps)(ErrorBoundaryContainer);
