import Immutable from 'immutable';
import LibraryConstants from '../constants/LibraryConstants';

const initialState = Immutable.Map();

export default function library(state = initialState, action) {
  switch (action.type) {
    case LibraryConstants.LIBRARY_SUCCESS: {
      return state.merge(action.payload.branding);
    }

    default:
      return state;
  }
}
