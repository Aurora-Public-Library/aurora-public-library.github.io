import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { messagingShape } from '@bibliocommons/bc-prop-types';
import MessagingActions from 'app/actions/MessagingActions';
import { selectGlobalMessaging } from 'app/selectors/MessagingSelector';
import GlobalMessaging from './GlobalMessaging';

import './GlobalMessagingContainer.scss';

function GlobalMessagingContainer(props) {
  return <GlobalMessaging {...props} />;
}

GlobalMessagingContainer.propTypes = {
  messaging: messagingShape,
  messagingActions: PropTypes.objectOf(PropTypes.func).isRequired
};

const mapStateToProps = state => ({
  messaging: selectGlobalMessaging(state)
});

const mapDispatchToProps = dispatch => ({
  messagingActions: bindActionCreators(MessagingActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMessagingContainer);
