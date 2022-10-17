import Immutable from 'immutable';
import LibraryConstants from '../../constants/LibraryConstants';

const initialState = null;

export default function libraryError(state = initialState, action) {
  switch (action.type) {
    case LibraryConstants.LIBRARY_FAILURE: {
      return Immutable.fromJS(action.payload);
    }

    default:
      return state;
  }
}
