import Immutable from 'immutable';
import ContentAdvisoriesConstants from '../../constants/ContentAdvisoriesConstants';

const {
  ADD_CONTENT_ADVISORIES_REQUEST,
  ADD_CONTENT_ADVISORIES_SUCCESS,
  ADD_CONTENT_ADVISORIES_FAILURE,
  UPDATE_CONTENT_ADVISORIES_REQUEST,
  UPDATE_CONTENT_ADVISORIES_SUCCESS,
  UPDATE_CONTENT_ADVISORIES_FAILURE,
  REMOVE_CONTENT_ADVISORIES_REQUEST,
  REMOVE_CONTENT_ADVISORIES_SUCCESS,
  REMOVE_CONTENT_ADVISORIES_FAILURE
} = ContentAdvisoriesConstants;

const initialState = Immutable.Map();

export default function ContentAdvisoriesTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTENT_ADVISORIES_REQUEST: {
      return state.withMutations(newState => {
        action.contentAdvisoryIds.forEach(id => newState.mergeIn([id], { isAdding: true }));
      });
    }

    case UPDATE_CONTENT_ADVISORIES_REQUEST: {
      return state.withMutations(newState => {
        action.contentAdvisoryIds.forEach(id =>
          newState.mergeIn([id], {
            isUpdating: true
          })
        );
      });
    }

    case REMOVE_CONTENT_ADVISORIES_REQUEST: {
      return state.withMutations(newState => {
        action.contentAdvisoryIds.forEach(id =>
          newState.mergeIn([id], {
            isRemoving: true
          })
        );
      });
    }

    case ADD_CONTENT_ADVISORIES_SUCCESS:
    case ADD_CONTENT_ADVISORIES_FAILURE:
    case UPDATE_CONTENT_ADVISORIES_SUCCESS:
    case UPDATE_CONTENT_ADVISORIES_FAILURE:
    case REMOVE_CONTENT_ADVISORIES_SUCCESS:
    case REMOVE_CONTENT_ADVISORIES_FAILURE: {
      return state.withMutations(newState => {
        action.contentAdvisoryIds.forEach(id => newState.delete(id));
      });
    }

    default:
      return state;
  }
}
