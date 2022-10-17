import Immutable from 'immutable';
import ListsConstants from 'app/constants/ListsConstants';

const {
  GET_CURRENT_USER_LISTS_REQUEST,
  GET_CURRENT_USER_LISTS_SUCCESS,
  GET_CURRENT_USER_LISTS_FAILURE
} = ListsConstants;

const initialState = Immutable.Map();
export default function CurrentUserListsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER_LISTS_REQUEST: {
      return state.setIn([action.category, 'isFetching'], true);
    }

    case GET_CURRENT_USER_LISTS_FAILURE: {
      return state.setIn([action.category, 'isFetching'], false);
    }

    case GET_CURRENT_USER_LISTS_SUCCESS: {
      return state.merge({
        [action.category]: {
          ...action.payload.lists,
          isFetching: false
        }
      });
    }

    default:
      return state;
  }
}
