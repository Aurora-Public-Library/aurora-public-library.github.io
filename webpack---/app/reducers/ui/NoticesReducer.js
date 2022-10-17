import Immutable from 'immutable';
import { setCookie } from '@bibliocommons/utils-browser';
import AppConstants from '../../constants/AppConstants';
import NoticeConstants, { HIDDEN_NOTICES_COOKIE } from '../../constants/NoticeConstants';

const initialState = Immutable.Map({
  hidden: Immutable.Set()
});

export default function notices(state = initialState, action) {
  switch (action.type) {
    case AppConstants.INITIALIZE: {
      if (action.cookies && action.cookies[HIDDEN_NOTICES_COOKIE]) {
        return state.set('hidden', Immutable.Set(action.cookies[HIDDEN_NOTICES_COOKIE].split(':')));
      }
      return state;
    }

    case NoticeConstants.DISMISS_NOTICE: {
      const newHidden = Immutable.Set(state.get('hidden')).add(action.noticeId);
      setCookie(HIDDEN_NOTICES_COOKIE, newHidden.join(':'), { path: '/' });
      return state.set('hidden', newHidden);
    }

    default:
      return state;
  }
}
