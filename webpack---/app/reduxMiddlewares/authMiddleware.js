import AuthConstants from 'app/constants/AuthConstants';
import { selectCurrentAccount } from 'app/selectors/AuthSelector';
import { selectAppConfig } from 'app/selectors/AppSelector';
import RedirectActions from 'app/actions/RedirectActions';
import composeFailureMessaging from 'app/helpers/messaging/composeFailureMessaging';
import composeGlobalFailureMessaging from 'app/helpers/messaging/composeGlobalFailureMessaging';

const AUTH_ERROR_CLASSIFICATIONS = ['invalid_token', 'RailsSessionInvalidationException'];

export default function authMiddleware(apiClient) {
  return store => next => action => {
    const { middlewareData } = action;
    const auth = store.getState().get('auth');
    const actionError = action.payload?.error;

    // Keep the apiClient up to date with the latest credentials.
    apiClient.sessionId = auth.get('sessionId');
    apiClient.authToken = auth.get('authToken');

    // Let downstream middlewares know when a post-login action is in progress
    if (auth.get('currentUserId') && auth.get('loginDialogOpen')) {
      action.middlewareData = { ...middlewareData, postLogin: true };
    }

    if (actionError) {
      const appConfig = selectAppConfig(store.getState());
      const appRequiresAuth = appConfig.get('authRequired');
      const appRequiresAccount = appConfig.get('accountRequired');

      // Let the reducers know the session expired
      action.sessionExpired = AUTH_ERROR_CLASSIFICATIONS.includes(actionError.classification);

      // Redirect to the login page when the session expires and if the app
      // requires authentication or a library account. (eg. borrowing pages)
      if (__CLIENT__ && action.sessionExpired && (appRequiresAuth || appRequiresAccount)) {
        const destination = `${window.location.pathname}${window.location.search}`;
        return store.dispatch(RedirectActions.redirect(`/user/login?destination=${encodeURIComponent(destination)}`));
      }
    }

    // Check if the current action requires authentication,
    // and then dispatch an OPEN_LOGIN_DIALOG action if unauthenticated.
    if (__CLIENT__ && (middlewareData?.authRequired || middlewareData?.accountRequired) && !auth.get('currentUserId')) {
      return next({
        type: AuthConstants.OPEN_LOGIN_DIALOG,
        payload: { preLoginAction: action }
      });
    }

    // Check if the current action requires a library account, and then
    // dispatch a REQUIRES_LIBRARY_ACCOUNT action if there is no account.
    if (__CLIENT__ && middlewareData?.accountRequired && !selectCurrentAccount(store.getState())) {
      const err = { classification: 'requiresLibraryAccount' };
      const payload = action.payload || {};
      const messagingId = action.messagingId || payload.id || action.id; // TODO: only support action.messagingId

      return next({
        type: AuthConstants.REQUIRES_LIBRARY_ACCOUNT,
        id: payload.id || action.id,
        messaging: messagingId ? composeFailureMessaging(messagingId, err) : composeGlobalFailureMessaging(err)
      });
    }

    return next(action);
  };
}
