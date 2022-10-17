import Immutable from 'immutable';
import TagsConstants from '../../constants/TagsConstants';

const {
  ADD_TAG_REQUEST,
  ADD_TAG_SUCCESS,
  ADD_TAG_FAILURE,
  REMOVE_TAG_REQUEST,
  REMOVE_TAG_SUCCESS,
  REMOVE_TAG_FAILURE
} = TagsConstants;

const initialState = Immutable.Map();

export default function TagsTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TAG_REQUEST: {
      return state.mergeIn([action.metadataId], { isAdding: true });
    }

    case REMOVE_TAG_REQUEST: {
      return state.mergeIn([action.metadataId, action.tagId], {
        isRemoving: true
      });
    }

    case ADD_TAG_SUCCESS:
    case ADD_TAG_FAILURE:
    case REMOVE_TAG_SUCCESS:
    case REMOVE_TAG_FAILURE: {
      return state.delete(action.metadataId);
    }

    default:
      return state;
  }
}
