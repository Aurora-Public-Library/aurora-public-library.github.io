import Immutable from 'immutable';
import CommentsConstants from 'app/constants/CommentsConstants';

const { GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE } = CommentsConstants;

const initialState = Immutable.Map({
  isFetching: false
});

export default function CommentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS_REQUEST: {
      return state.set('isFetching', true);
    }
    case GET_COMMENTS_FAILURE: {
      return state.set('isFetching', false);
    }

    case GET_COMMENTS_SUCCESS: {
      return state.merge({ ...action.payload.ugc.comments, isFetching: false });
    }

    default:
      return state;
  }
}
