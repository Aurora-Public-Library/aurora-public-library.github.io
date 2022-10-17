import Immutable from 'immutable';
import SimilarTitlesConstants from '../../constants/SimilarTitlesConstants';

const {
  ADD_SIMILAR_TITLES_REQUEST,
  ADD_SIMILAR_TITLES_SUCCESS,
  ADD_SIMILAR_TITLES_FAILURE,
  REMOVE_SIMILAR_TITLES_REQUEST,
  REMOVE_SIMILAR_TITLES_SUCCESS,
  REMOVE_SIMILAR_TITLES_FAILURE
} = SimilarTitlesConstants;

const initialState = Immutable.Map();

export default function SimilarTitlesTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SIMILAR_TITLES_REQUEST: {
      return state.mergeIn([action.metadataId, action.similarMetadataId], {
        isAdding: true
      });
    }

    case REMOVE_SIMILAR_TITLES_REQUEST: {
      return state.mergeIn([action.metadataId, action.similarMetadataId], {
        isRemoving: true
      });
    }

    case ADD_SIMILAR_TITLES_SUCCESS:
    case ADD_SIMILAR_TITLES_FAILURE:
    case REMOVE_SIMILAR_TITLES_SUCCESS:
    case REMOVE_SIMILAR_TITLES_FAILURE: {
      return state.delete(action.metadataId);
    }

    default:
      return state;
  }
}
