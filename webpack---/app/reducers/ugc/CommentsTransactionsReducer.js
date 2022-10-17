import Immutable from 'immutable';
import CommentsConstants from '../../constants/CommentsConstants';

const {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE
} = CommentsConstants;

const initialState = Immutable.Map();

export default function CommentsTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT_REQUEST: {
      return state.mergeIn([action.metadataId], { isAdding: true });
    }

    case UPDATE_COMMENT_REQUEST: {
      return state.mergeIn([action.metadataId, action.commentId], {
        isUpdating: true
      });
    }

    case REMOVE_COMMENT_REQUEST: {
      return state.mergeIn([action.metadataId, action.commentId], {
        isRemoving: true
      });
    }

    case ADD_COMMENT_SUCCESS:
    case ADD_COMMENT_FAILURE:
    case UPDATE_COMMENT_SUCCESS:
    case UPDATE_COMMENT_FAILURE:
    case REMOVE_COMMENT_SUCCESS:
    case REMOVE_COMMENT_FAILURE: {
      return state.delete(action.metadataId);
    }

    default:
      return state;
  }
}
