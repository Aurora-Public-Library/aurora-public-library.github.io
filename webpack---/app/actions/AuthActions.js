import Immutable from 'immutable';
import { writeSessionStorageItem } from '@bibliocommons/utils-storage';
import AuthApi from 'app/api/AuthApi';
import AuthConstants from 'app/constants/AuthConstants';
import createReduxStore from 'app/helpers/redux/createReduxStore';

/*
 * This function returns a serializable action object (based on the `preLoginAction`),
 * that can be saved in the sessionStorage. For the most part, it replays "asynchronous"
 * actions, since they are functions and cannot be saved in the sessionStorage as is.
 */
async function getPostLoginAction(response, store, apiClient) {
  let preLoginAction = store.getState().getIn(['auth', 'preLoginAction']);
  if (Immutable.Iterable.isIterable(preLoginAction)) {
    preLoginAction = preLoginAction.toJS();
  }

  if (typeof preLoginAction === 'function' || preLoginAction?.apiRequest) {
    try {
      // Use an updated copy of store to replay "asynchronous" actions.
      // A copy of the store allows us to replay actions behind the scenes
      // without causing the page to re-render.
      const updatedStore = createReduxStore(store.getState(), apiClient);
      await updatedStore.dispatch({ type: AuthConstants.AUTH_LOGIN_SUCCESS, payload: response });
      const successAction = await updatedStore.dispatch(preLoginAction);
      return successAction;
    } catch (ex) {
      const failureAction = ex.type ? ex : undefined;
      if (failureAction) return failureAction;
      throw ex;
    }
  }

  return preLoginAction;
}

function loadUser() {
  return {
    types: [
      AuthConstants.AUTH_LOAD_USER_REQUEST,
      AuthConstants.AUTH_LOAD_USER_SUCCESS,
      AuthConstants.AUTH_LOAD_USER_FAILURE
    ],
    apiRequest: (state, client) => AuthApi.loadUser(client)
  };
}

function login(username, password) {
  return {
    messaging: false,
    types: [AuthConstants.AUTH_LOGIN_REQUEST, AuthConstants.AUTH_LOGIN_SUCCESS, AuthConstants.AUTH_LOGIN_ERROR],
    apiRequest: (state, client) => AuthApi.login({ username, password, destination: window.location.href }, client),
    apiSuccess: async (response, store, client) => {
      const postLoginAction = await getPostLoginAction(response, store, client);
      if (postLoginAction) {
        writeSessionStorageItem('postLoginAction', postLoginAction);
      }

      return {
        forceRedirectURL: response.ssoUrl || window.location.href
      };
    }
  };
}

function logout() {
  return {
    type: AuthConstants.AUTH_LOGOUT
  };
}

function closeLoginDialog() {
  return {
    type: AuthConstants.CLOSE_LOGIN_DIALOG
  };
}

export default {
  login,
  logout,
  loadUser,
  closeLoginDialog
};
