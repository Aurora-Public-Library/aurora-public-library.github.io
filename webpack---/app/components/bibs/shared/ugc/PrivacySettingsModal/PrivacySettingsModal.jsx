import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';
import { ModalHeader, ModalContent, ModalFooter } from '@bibliocommons/modal';
import { PRIVACY_SETTINGS_MODAL_KEY } from 'app/constants/ModalConstants';
import ToggleSwitch from '@bibliocommons/toggle-switch';
import { shelfItemShape } from '@bibliocommons/bc-prop-types';
import { Link } from '@bibliocommons/base-links';
import ModalContainer from 'app/components/shared/Modal/ModalContainer';
import UniversalBibBriefContainer from 'app/components/bibs/shared/UniversalBibBrief';
import { GlobalMessaging } from 'app/components/GlobalMessaging';
import { PrivacySettingsButtonContainer } from '../PrivacySettingsButton';

import './PrivacySettingsModal.scss';

GlobalMessaging.registerActionButtonType('PrivacySettingsButton', PrivacySettingsButtonContainer);

export function PrivacySettingsModal(props) {
  function handleClose() {
    props.modalActions.closeModal(PRIVACY_SETTINGS_MODAL_KEY);
  }

  function togglePrivate() {
    const { shelfItem, metadataId } = props;
    const isPrivate = shelfItem.get('privateItem');

    props.shelfActions.updateShelfItems({
      privateItem: !isPrivate,
      shelfName: shelfItem.get('shelf'),
      newShelfName: shelfItem.get('shelf'),
      shelfItemIds: [shelfItem.get('id')],
      metadataIds: [metadataId]
    });
  }

  const isUpdatingPrivacy = props.shelfTransactions.getIn([props.metadataId, 'isUpdatingPrivacy'], false);

  return (
    <div className="cp-privacy-settings-modal">
      <ModalContainer
        modalKey={PRIVACY_SETTINGS_MODAL_KEY}
        handleClose={handleClose}
        className="cp-privacy-settings-modal"
      >
        <ModalHeader title={<FormattedMessage tagName="div" id="shelf_item_privacy" />} />
        <ModalContent>
          <UniversalBibBriefContainer metadataId={props.metadataId} />
          <ToggleSwitch
            id="mark-as-private"
            handleClick={togglePrivate}
            active={!!props.shelfItem.get('privateItem')}
            activeText={<FormattedMessage id="mark_as_private" />}
            inactiveText={<FormattedMessage id="mark_as_private" />}
          />
          <FormattedMessage tagName="div" id="shelf_item_privacy_note" />
          <Link
            className="privacy-learn-more-link"
            dataKey="privacy-learn-more-link"
            href="https://help.bibliocommons.com/045faq/040faq-my-shelves#privacy"
          >
            <FormattedMessage id="learn_more_privacy" />
          </Link>
        </ModalContent>
        <ModalFooter
          primaryActionButtonText={<FormattedMessage id="done" />}
          handlePrimaryAction={handleClose}
          isLoading={isUpdatingPrivacy}
        />
      </ModalContainer>
    </div>
  );
}

PrivacySettingsModal.propTypes = {
  shelfItem: shelfItemShape.isRequired,
  metadataId: PropTypes.string.isRequired,
  shelfTransactions: ImmutablePropTypes.map.isRequired,
  shelfActions: PropTypes.objectOf(PropTypes.func).isRequired,
  modalActions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default PrivacySettingsModal;
