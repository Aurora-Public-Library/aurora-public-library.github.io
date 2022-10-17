import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import moment from 'moment';

import { bindAll } from '@bibliocommons/utils-react';
import { libraryShape } from '@bibliocommons/bc-prop-types';
import TextField from '@bibliocommons/text-field';
import { Link } from '@bibliocommons/base-links';
import { ErrorAlert } from '@bibliocommons/alerts';
import { TransactionalSolidButton } from '@bibliocommons/base-buttons';
import { ModalHeader, ModalContent, ModalFooter } from '@bibliocommons/modal';
import { getCookie, setCookie } from '@bibliocommons/utils-browser';
import { setFocusWithinElement } from '@bibliocommons/utils-accessibility';
import Checkbox from '@bibliocommons/base-checkbox';
import { REMEMBER_ME_COOKIE } from 'app/constants/AuthConstants';

import './LoginForm.scss';

export default class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);

    bindAll(this);

    this.state = {
      username: '',
      password: '',
      rememberMe: false
    };

    if (!props.localBranch) {
      const rememberMeCookie = getCookie(REMEMBER_ME_COOKIE) || '';
      this.state.rememberMe = !!rememberMeCookie;
      this.state.username = rememberMeCookie;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.loginErrorRef && prevProps.isLoading && !this.props.isLoading) {
      setFocusWithinElement(this.loginErrorRef);
    }
  }

  handleUsernameChange(username) {
    this.setState({ username });
  }

  handlePasswordChange(password) {
    this.setState({ password });
  }

  handleRememberMeChange(rememberMe) {
    this.setState({ rememberMe });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, rememberMe } = this.state;

    const expires = moment()
      [rememberMe ? 'add' : 'subtract'](10, 'years')
      .toDate();
    setCookie(REMEMBER_ME_COOKIE, username, { expires, path: '/' });

    this.props.authActions.login(username, password);
  }

  getPasswordType() {
    return this.props.currentLibrary.get('numericPasswordRequired') ? 'pin' : 'password';
  }

  renderLoginError() {
    const { loginError } = this.props;

    if (loginError) {
      const fieldErrors = loginError.get('fieldErrors') || Immutable.Map();
      const classification =
        fieldErrors.get('username') || fieldErrors.get('password')
          ? 'InvalidCredentials'
          : loginError.get('classification');

      return (
        <div className="error-wrapper">
          <ErrorAlert className="login-error-alert" ref={el => (this.loginErrorRef = el)}>
            <FormattedMessage id={`errors.${classification}`} defaultMessage={loginError.get('message')} />
          </ErrorAlert>
        </div>
      );
    }

    return null;
  }

  renderGetCardLink() {
    const getCardLink = this.props.currentLibrary.get('getCardLink');
    if (getCardLink) {
      return (
        <div className="get-card-link">
          <Link href={getCardLink} dataKey="get-card-link">
            <FormattedMessage id="form_label_get_a_card" />
          </Link>
        </div>
      );
    }

    return null;
  }

  renderRememberMeCheckbox() {
    if (!this.props.localBranch) {
      return (
        <Checkbox
          id="login-remember-me"
          dataKey="remember-me"
          className="remember-me-checkbox"
          label={<FormattedMessage id="form_label_remember_credentials_device" />}
          checked={this.state.rememberMe}
          handleChange={this.handleRememberMeChange}
        />
      );
    }

    return null;
  }

  renderForgotPasswordLink() {
    if (this.props.currentLibrary.get('allowUserPinChange')) {
      return (
        <Link href="/user/forgot" className="forgot-password-link" dataKey="forgot-password-link">
          <FormattedMessage id={`form_label_forgot_${this.getPasswordType()}`} />
        </Link>
      );
    }

    return null;
  }

  renderLoginButton() {
    return (
      <TransactionalSolidButton
        block
        size="large"
        dataKey="login-button"
        isLoading={this.props.isLoading}
        handleClick={this.handleSubmit}
      >
        <FormattedMessage id="button_login" />
      </TransactionalSolidButton>
    );
  }

  renderUserNameField() {
    return (
      <TextField
        size="large"
        name="login-username"
        className="username-field"
        id="login-username-field"
        value={this.state.username}
        onChange={this.handleUsernameChange}
        label={<FormattedMessage id="form_label_username_barcode" />}
      />
    );
  }

  renderPasswordField() {
    return (
      <TextField
        size="large"
        type="password"
        name="login-password"
        className="password-field"
        id="login-password-field"
        value={this.state.password}
        onChange={this.handlePasswordChange}
        label={<FormattedMessage id={`form_label_${this.getPasswordType()}`} />}
        info={this.renderForgotPasswordLink()}
      />
    );
  }

  render() {
    return (
      <form
        className="cp-login-modal-form"
        onSubmit={this.handleSubmit}
        action="/user/login"
        autoComplete="off"
        autoCorrect="off"
      >
        <ModalHeader size="large" title={<FormattedMessage id="section_title_login" />} />
        <ModalContent>
          {this.renderLoginError()}
          {this.renderUserNameField()}
          {this.renderPasswordField()}
          {this.renderRememberMeCheckbox()}
        </ModalContent>
        <ModalFooter
          stacked
          renderSecondaryAction={this.renderGetCardLink}
          renderPrimaryAction={this.renderLoginButton}
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  isLoading: PropTypes.bool,
  currentLibrary: libraryShape.isRequired,
  localBranch: PropTypes.string,
  loginError: ImmutablePropTypes.map,
  authActions: PropTypes.objectOf(PropTypes.func).isRequired
};
