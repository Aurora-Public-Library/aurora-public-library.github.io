import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { bindAll } from '@bibliocommons/utils-react';
import { libraryShape } from '@bibliocommons/bc-prop-types';
import ModalContainer from 'app/components/shared/Modal/ModalContainer';
import LoginForm from './LoginForm';

const LOGIN_MODAL_KEY = 'login-modal';

export default class LoginModal extends React.PureComponent {
  constructor(props) {
    super(props);
    bindAll(this, true);
  }

  handleClose() {
    this.props.authActions.closeLoginDialog();
  }

  render() {
    return (
      <ModalContainer
        className="cp-login-modal"
        size="small"
        open={this.props.open}
        modalKey={LOGIN_MODAL_KEY}
        handleClose={this.handleClose}
      >
        <LoginForm {...this.props} />
      </ModalContainer>
    );
  }
}

LoginModal.propTypes = {
  open: PropTypes.bool,
  isLoading: PropTypes.bool,
  currentLibrary: libraryShape.isRequired,
  localBranch: PropTypes.string,
  loginError: ImmutablePropTypes.map,
  authActions: PropTypes.objectOf(PropTypes.func).isRequired
};
