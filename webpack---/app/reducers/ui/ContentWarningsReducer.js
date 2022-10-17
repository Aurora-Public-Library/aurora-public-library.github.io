import Immutable from 'immutable';
import ContentWarningConstants, {
  OFFENSIVE_CONTENT_COOKIE_NAME,
  SPOILERS_COOKIE_NAME
} from 'app/constants/ContentWarningConstants';
import AppConstants from 'app/constants/AppConstants';

const initialState = Immutable.fromJS({
  defaults: {
    spoilersVisible: false,
    offensiveContentVisible: false
  }
});

export default function contentWarnings(state = initialState, action) {
  switch (action.type) {
    case ContentWarningConstants.SHOW_CONTENT: {
      return state.merge(
        Immutable.fromJS({ [action.contentId]: { spoilersVisible: true, offensiveContentVisible: true } })
      );
    }

    case ContentWarningConstants.HIDE_CONTENT: {
      return state.merge(
        Immutable.fromJS({ [action.contentId]: { spoilersVisible: false, offensiveContentVisible: false } })
      );
    }

    case ContentWarningConstants.SHOW_OFFENSIVE_CONTENT_SUCCESS: {
      return state.map(settings => settings.set('offensiveContentVisible', true));
    }

    case ContentWarningConstants.HIDE_OFFENSIVE_CONTENT_SUCCESS: {
      return state.map(settings => settings.set('offensiveContentVisible', false));
    }

    case ContentWarningConstants.SHOW_SPOILERS_SUCCESS: {
      return state.map(settings => settings.set('spoilersVisible', true));
    }

    case ContentWarningConstants.HIDE_SPOILERS_SUCCESS: {
      return state.map(settings => settings.set('spoilersVisible', false));
    }

    // Overwrite defaults with values from cookies (if there are any)
    case AppConstants.INITIALIZE: {
      let newState = state;
      const spoilersCookieValue = action.cookies[SPOILERS_COOKIE_NAME];
      const offensiveCookieValue = action.cookies[OFFENSIVE_CONTENT_COOKIE_NAME];
      if (spoilersCookieValue)
        newState = newState.setIn(['defaults', 'spoilersVisible'], spoilersCookieValue === 'true');
      if (offensiveCookieValue)
        newState = newState.setIn(['defaults', 'offensiveContentVisible'], offensiveCookieValue === 'true');
      return newState;
    }

    default:
      return state;
  }
}
