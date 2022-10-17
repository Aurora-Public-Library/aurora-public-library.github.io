import Immutable from 'immutable';
import CommentsConstants from 'app/constants/CommentsConstants';

const { GET_COMMENT_REQUEST, GET_COMMENT_SUCCESS, GET_COMMENT_FAILURE } = CommentsConstants;

const initialState = Immutable.Map();

export default function CommentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT_REQUEST:
    case GET_COMMENT_FAILURE: {
      return state;
    }

    case GET_COMMENT_SUCCESS: {
      return state.merge(action.payload.ugc.comment);
    }

    default:
      return state;
  }
}
