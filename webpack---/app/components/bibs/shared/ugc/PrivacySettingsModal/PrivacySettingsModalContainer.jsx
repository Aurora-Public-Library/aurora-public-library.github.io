import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { shelfItemShape } from '@bibliocommons/bc-prop-types';
import ShelfActions from 'app/actions/ShelfActions';
import ModalActions from 'app/actions/ModalActions';
import { PRIVACY_SETTINGS_MODAL_KEY } from 'app/constants/ModalConstants';
import { selectOpenModals } from 'app/selectors/ui/ModalSelector';
import { selectShelvesForCurrentUser, selectShelfTransactions } from 'app/selectors/ShelfSelector';
import PrivacySettingsModal from './PrivacySettingsModal';

export function PrivacySettingsModalContainer(props) {
  return props.metadataId ? <PrivacySettingsModal {...props} /> : null;
}

PrivacySettingsModalContainer.propTypes = {
  shelfItem: shelfItemShape,
  metadataId: PropTypes.string,
  shelfTransactions: ImmutablePropTypes.map.isRequired,
  shelfActions: PropTypes.objectOf(PropTypes.func).isRequired,
  modalActions: PropTypes.objectOf(PropTypes.func).isRequired
};

const mapStateToProps = state => {
  const metadataId = selectOpenModals(state).getIn([PRIVACY_SETTINGS_MODAL_KEY, 'metadataId']);
  const shelfItem = selectShelvesForCurrentUser(state).get(metadataId);
  return {
    shelfItem,
    metadataId,
    shelfTransactions: selectShelfTransactions(state)
  };
};

const mapDispatchToProps = dispatch => ({
  shelfActions: bindActionCreators(ShelfActions, dispatch),
  modalActions: bindActionCreators(ModalActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivacySettingsModalContainer);
