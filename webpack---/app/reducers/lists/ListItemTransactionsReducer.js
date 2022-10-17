import Immutable from 'immutable';
import ListsConstants from 'app/constants/ListsConstants';

const initialState = Immutable.Map();

export default function listItemTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ListsConstants.CREATE_LIST_ITEM_REQUEST:
      return state.mergeIn([action.listId], { isAdding: true });
    case ListsConstants.CREATE_LIST_ITEM_FAILURE:
    case ListsConstants.CREATE_LIST_ITEM_SUCCESS:
      return state.delete(action.listId);
    default:
      return state;
  }
}
