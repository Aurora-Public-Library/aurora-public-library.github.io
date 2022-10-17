import Immutable from 'immutable';
import RedirectConstants from '../constants/RedirectConstants';

const initialState = Immutable.Map({
  url: null
});

export default function redirect(state = initialState, action) {
  switch (action.type) {
    case RedirectConstants.REDIRECT: {
      const url = action.payload?.forceRedirectURL || action.forceRedirectURL;
      return state.set('url', url);
    }

    default:
      return state;
  }
}
