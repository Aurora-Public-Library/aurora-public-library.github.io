import RedirectConstants from '../constants/RedirectConstants';

function redirect(url, { authRequired = false, accountRequired = false, method = 'GET', data = {} } = {}) {
  return {
    method,
    data,
    forceRedirectURL: url,
    type: RedirectConstants.REDIRECT,
    middlewareData: {
      authRequired,
      accountRequired
    }
  };
}

export default {
  redirect
};
