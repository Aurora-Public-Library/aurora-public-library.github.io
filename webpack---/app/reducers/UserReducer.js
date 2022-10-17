import Immutable from 'immutable';
import UserConstants from '../constants/UserConstants';

const initialState = Immutable.Map({
  id: undefined,
  isFetching: false
});

const { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } = UserConstants;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_ERROR:
      return initialState;

    case FETCH_USER_REQUEST: {
      return state.merge({ isFetching: true });
    }

    case FETCH_USER_SUCCESS: {
      return state.mergeDeep({
        ...action.payload.user,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
