import Immutable from 'immutable';
import MessagingConstants from '../../constants/MessagingConstants';
import SearchConstants from '../../constants/SearchConstants';
import WorkflowConstants from '../../constants/WorkflowConstants';

const initialState = Immutable.Map();

export default function MessagingReducer(state = initialState, action) {
  if (action.messaging) {
    return state.merge(action.messaging);
  }

  switch (action.type) {
    case MessagingConstants.CLEAR_MESSAGING: {
      return state.withMutations(mutatedState => {
        action.messagingIds.forEach(id => mutatedState.delete(id));
      });
    }

    // FIXME: This logic should be in SearchActions or SearchTitle component.
    case SearchConstants.SEARCH_SUCCESS: {
      return state.delete('searchTitle');
    }

    // FIXME: This logic should be in WorkflowActions
    case WorkflowConstants.UPDATE_WORKFLOW: {
      return state.delete(action.payload.id);
    }

    default:
      return state;
  }
}
