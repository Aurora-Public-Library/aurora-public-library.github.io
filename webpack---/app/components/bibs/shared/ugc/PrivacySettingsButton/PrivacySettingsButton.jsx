import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { GhostButton } from '@bibliocommons/base-buttons';
import { PRIVACY_SETTINGS_MODAL_KEY } from 'app/constants/ModalConstants';

import './PrivacySettingsButton.scss';

export default function PrivacySettingsButton(props) {
  function openPrivacySettingsModal() {
    props.modalActions.openModal(PRIVACY_SETTINGS_MODAL_KEY, { metadataId: props.metadataId });
    props.messagingActions.clearGlobalMessage();
  }

  return (
    <div className="cp-privacy-settings-button">
      <GhostButton dataKey="privacy-settings" handleClick={openPrivacySettingsModal}>
        <FormattedMessage id="privacy_settings" />
      </GhostButton>
    </div>
  );
}

PrivacySettingsButton.propTypes = {
  metadataId: PropTypes.string.isRequired,
  modalActions: PropTypes.objectOf(PropTypes.func).isRequired,
  messagingActions: PropTypes.objectOf(PropTypes.func).isRequired
};
