import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Modal } from '@bibliocommons/modal';
import { selectOpenModals } from 'app/selectors/ui/ModalSelector';

export function ModalContainer({ modalKey, open, ...props }) {
  return <Modal open={open} key={modalKey} {...props} />;
}

ModalContainer.propTypes = {
  modalKey: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  open: ownProps.open || selectOpenModals(state).has(ownProps.modalKey)
});

export default connect(mapStateToProps)(ModalContainer);
