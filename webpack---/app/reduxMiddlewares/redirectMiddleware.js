import { queryToSearch } from '@bibliocommons/utils-routing';
import { setCookie, postRedirect } from '@bibliocommons/utils-browser';

export default function redirectMiddleware() {
  return next => action => {
    const url = action.payload?.forceRedirectURL || action.forceRedirectURL;

    if (url && __CLIENT__) {
      const { method, data } = action;

      if (url.startsWith('/user/login')) {
        const PRE_LOGIN_URL_COOKIE = 'pre_login_url';
        setCookie(PRE_LOGIN_URL_COOKIE, window.location.href, { path: '/' });
      }

      if (method?.toUpperCase() === 'POST') {
        postRedirect(url, data);
      } else {
        window.location.href = `${url}${queryToSearch(data)}`;
      }
      return;
    }

    // eslint-disable-next-line consistent-return
    return next(action);
  };
}
