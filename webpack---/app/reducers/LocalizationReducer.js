import Immutable from 'immutable';
import LibraryConstants from '../constants/LibraryConstants';

const initialState = Immutable.Map({
  messages: {},
  availableLanguages: []
});

export default function localization(state = initialState, action) {
  switch (action.type) {
    case LibraryConstants.LIBRARY_SUCCESS: {
      return state.merge(action.payload.localizations);
    }
    default:
      return state;
  }
}
