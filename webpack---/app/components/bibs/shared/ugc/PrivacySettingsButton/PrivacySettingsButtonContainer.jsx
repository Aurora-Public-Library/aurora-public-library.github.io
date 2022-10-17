import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModalActions from 'app/actions/ModalActions';
import MessagingActions from 'app/actions/MessagingActions';
import PrivacySettingsButton from './PrivacySettingsButton';

export function PrivacySettingsButtonContainer(props) {
  return <PrivacySettingsButton {...props} />;
}

PrivacySettingsButtonContainer.propTypes = {
  // ownProps
  metadataId: PropTypes.string.isRequired,
  // Redux props
  messagingActions: PropTypes.objectOf(PropTypes.func).isRequired,
  modalActions: PropTypes.objectOf(PropTypes.func).isRequired
};

const mapDispatchToProps = dispatch => ({
  messagingActions: bindActionCreators(MessagingActions, dispatch),
  modalActions: bindActionCreators(ModalActions, dispatch)
});

export default connect(null, mapDispatchToProps)(PrivacySettingsButtonContainer);
