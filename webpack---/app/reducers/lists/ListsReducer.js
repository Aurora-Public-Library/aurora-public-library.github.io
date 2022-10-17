import Immutable from 'immutable';
import ListsConstants from 'app/constants/ListsConstants';

const { GET_LISTS_REQUEST, GET_LISTS_SUCCESS, GET_LISTS_FAILURE } = ListsConstants;

const initialState = Immutable.fromJS({
  items: [],
  pagination: {},
  isFetching: false
});

export default function ListsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LISTS_REQUEST: {
      return state.set('isFetching', true);
    }
    case GET_LISTS_FAILURE: {
      return state.set('isFetching', false);
    }

    case GET_LISTS_SUCCESS: {
      return state.merge({ ...action.payload.lists, isFetching: false });
    }

    default:
      return state;
  }
}
