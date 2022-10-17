import Immutable from 'immutable';
import LikesConstants from 'app/constants/LikesConstants';

const { GET_LIKES_REQUEST, GET_LIKES_SUCCESS, GET_LIKES_FAILURE } = LikesConstants;

const initialState = Immutable.Map({
  isFetching: false
});

export default function LikesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIKES_REQUEST: {
      return state.set('isFetching', true);
    }
    case GET_LIKES_FAILURE: {
      return state.set('isFetching', false);
    }

    case GET_LIKES_SUCCESS: {
      return state.merge({ ...action.payload.ugc.likes, isFetching: false });
    }

    default:
      return state;
  }
}
