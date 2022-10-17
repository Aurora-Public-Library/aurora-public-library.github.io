import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { readSessionStorageItem, removeSessionStorageItem } from '@bibliocommons/utils-storage';
import { libraryShape } from '@bibliocommons/bc-prop-types';
import AuthActions from 'app/actions/AuthActions';
import { selectAppConfig } from 'app/selectors/AppSelector';
import { selectCurrentLibrary } from 'app/selectors/LibrarySelector';
import LoginModal from './LoginModal';

export function LoginModalContainer(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const postLoginAction = readSessionStorageItem('postLoginAction');
    if (postLoginAction) {
      dispatch(postLoginAction);
      removeSessionStorageItem('postLoginAction');
    }
  }, [dispatch]);

  return <LoginModal {...props} />;
}

LoginModalContainer.propTypes = {
  open: PropTypes.bool,
  isLoading: PropTypes.bool,
  currentLibrary: libraryShape.isRequired,
  localBranch: PropTypes.string,
  loginError: ImmutablePropTypes.map,
  authActions: PropTypes.objectOf(PropTypes.func).isRequired
};

const mapStateToProps = state => ({
  open: state.getIn(['auth', 'loginDialogOpen']),
  isLoading: state.getIn(['auth', 'loading']),
  currentLibrary: selectCurrentLibrary(state),
  localBranch: selectAppConfig(state).get('localBranch'),
  loginError: state.getIn(['auth', 'loginError'])
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(AuthActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModalContainer);
