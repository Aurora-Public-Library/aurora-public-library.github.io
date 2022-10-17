import Immutable from 'immutable';
import AuthConstants from 'app/constants/AuthConstants';
import AppConstants from 'app/constants/AppConstants';

const initialState = Immutable.Map({
  sessionId: null,
  authToken: null,
  currentUserId: null,
  loginError: null,
  loginDialogOpen: false,
  preLoginAction: null,
  loading: false
});

function sendStatusUpdate(status) {
  // Notify the header
  if (__CLIENT__ && window.BCHeaderPublic) {
    window.BCHeaderPublic('sessionChanged');
  }

  // When in iframe mode, post a message to the parent with the current status
  if (__CLIENT__ && typeof window.parentIFrame !== 'undefined') {
    const postMessagePayload = {
      userLoggedIn: status,
      name: window.name
    };

    window.parentIFrame.sendMessage(postMessagePayload, '*');
  }
}

export default function auth(state = initialState, action) {
  const actionError = action.payload?.error;

  // Automatically open the login dialog, when an action fails because the user's session expired.
  if (action.sessionExpired) {
    sendStatusUpdate(false);
    return state.merge({
      loginError: actionError,
      sessionId: null,
      authToken: null,
      currentUserId: null,
      loginDialogOpen: true,
      preLoginAction: action.payload.preLoginAction
    });
  }

  switch (action.type) {
    case AppConstants.INITIALIZE: {
      return state.merge(action.auth);
    }

    case AuthConstants.AUTH_LOAD_USER_FAILURE: {
      return initialState;
    }

    case AuthConstants.AUTH_LOGIN_SUCCESS:
    case AuthConstants.AUTH_LOAD_USER_SUCCESS: {
      return state.merge(action.payload.auth);
    }

    case AuthConstants.AUTH_LOGIN_REQUEST: {
      return state.merge({
        loading: true
      });
    }

    case AuthConstants.AUTH_LOGIN_ERROR: {
      sendStatusUpdate(false);
      return state.merge({
        sessionId: null,
        authToken: null,
        currentUserId: null,
        loginError: actionError,
        loginDialogOpen: true,
        loading: false
      });
    }

    case AuthConstants.AUTH_LOGOUT: {
      sendStatusUpdate(false);
      return initialState;
    }

    case AuthConstants.OPEN_LOGIN_DIALOG: {
      return state.merge({
        sessionId: null,
        authToken: null,
        currentUserId: null,
        loginDialogOpen: true,
        loginError: actionError,
        preLoginAction: action.payload.preLoginAction
      });
    }

    case AuthConstants.CLOSE_LOGIN_DIALOG: {
      return state.merge({
        loginError: null,
        loginDialogOpen: false,
        preLoginAction: null
      });
    }

    default:
      return state;
  }
}
